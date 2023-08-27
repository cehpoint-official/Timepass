import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import iceServerConfig from "../iceServersConfig";
import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Gifts from "./components/gifts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  mediaDevices,
  RTCPeerConnection,
  RTCSessionDescription,
} from "react-native-webrtc";
import SimplePeer from "simple-peer";
import io from "socket.io-client";
import { firebase } from "@react-native-firebase/firestore";
import { useAuthContext } from "../providers/AuthProvider";
import { useRoute } from "@react-navigation/native";
import Sound from "react-native-sound";

const screenHeight = Dimensions.get("window").height;
// const baseUrl = "ws://192.168.255.53:8080";
const baseUrl = "ws://192.168.1.14:8080";
//const baseUrl = "ws://172.16.2.38:8080";

const StageParticipant = ({ participant }) => {
  const { name, peer, socketId, userId } = participant;
  const { user } = useAuthContext();
  const ref = useRef();
  const soundRef = useRef();

  useEffect(() => {
    if (user.auth.uid === userId) return;
    console.log("PARTICIPANT", participant, peer);
    if (peer === undefined) return;peer
    peer.on("stream", (stream) => {
      console.log("stream", stream);
      ref.current.srcObject = stream;
      soundRef.current = new Sound(ref.current, null, (err) => {
        if (err) {
          console.log("Error loading sound");
        } else {
          soundRef.current.play((success) => {
            if (success) {
              console.log("Successfully finished playing");
            } else {
              console.log("Playback failed");
            }
          });
        }
      });
    });
    return () => {
      if (this.sound) {
        this.sound.stop(() => {
          console.log("Sound stopped");
        });
      }
    };
  }, [peer]);
  return (
    <View ref={ref} style={styles.box1}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 60, height: 60, opacity: 0.5 }}
          source={require("../assets/images/avatar2.png")}
        />
      </View>
      <View style={{ marginTop: -70 }}>
        <Icon name="microphone-slash" size={70} color="grey" />
      </View>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
        {name}
      </Text>
      <View style={styles.deletemic}>
        <Icon name="microphone" size={20} color="rgba(255,255,255,.8)" />
        <MaterialCommunityIcons name="delete" size={20} color="red" />
        <MaterialCommunityIcons
          name="karate"
          size={20}
          color="rgba(255,255,255,.8)"
        />
      </View>
    </View>
  );
};

const BottomButton = ({ onPress, isHost }) => {
  const buttonType = isHost ? "Add user" : "Join waitlist";
  return (
    <View
      style={{
        marginTop: "auto",
        height: 40,
        marginBottom: 10,
        marginLeft: 20,
        backgroundColor: "#2e63e8",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        borderRadius: 10,
      }}
    >
      <TouchableOpacity>
        <Text onPress={onPress} style={{ color: "white", fontSize: 20 }}>
          {buttonType}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const WaitlistModal = ({ visible, onClose, roomId, onAddToStage }) => {
  const [waitlist, setWaitlist] = useState([]);
  useEffect(() => {
    let unsub = firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("waitlist")
      .onSnapshot((snap) => {
        let newWaitlist = [];
        snap.docs.forEach((doc) =>
          newWaitlist.push({ userId: doc.id, ...doc.data() })
        );
        setWaitlist(newWaitlist);
      });
    return () => unsub();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            elevation: 5,
            height: screenHeight / 2, // Set the height to half of the screen
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          >
            <Text style={{ fontSize: 24, color: "gray" }}>X</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 22,
              marginBottom: 10,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Add your friends
          </Text>
          {waitlist.map((item) => (
            <View
              key={item.userId}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, color: "black" }}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  onAddToStage(item);
                }}
                style={{ marginLeft: "auto" }}
              >
                <Text style={{ fontSize: 16, color: "blue" }}>+ADD</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const VideoCall = () => {
  const route = useRoute();
  const { roomId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [waitlistModalVisible, setWaitlistModalVisible] = useState(false);

  // for storing peer connections
  const [memberPeers, setMemberPeers] = useState([]);
  const [participants, setParticipants] = useState([]);

  // refs
  const socketRef = useRef();
  const streamRef = useRef();
  const peerRef = useRef();
  const { user } = useAuthContext();

  const [roomData, setRoomData] = useState({});

  

  const onBottomButtonPressed = async () => {
    console.log("pressed");
    const isHost = roomData.host === user.auth.uid;
    if (isHost) {
      console.log("is host");
      setWaitlistModalVisible(true);
    } else {
      socketRef.current.emit("JOIN_WAITLIST", {
        roomId: roomId,
        userId: user.auth.uid,
        userData: user.profile,
      });
    }
  };

  const onAddToStage = async (user) => {
    socketRef.current.emit("ADD_TO_STAGE", {
      roomId: roomId,
      userId: user.userId,
      socketId: user.socketId,
    });
  };

  useEffect(() => {
    console.log('\x1b[36m'+'#%s\x1b[0m', participants)
  }, [participants]);

  useEffect(() => {
    socketRef.current = io.connect(baseUrl);
    firebase
    .firestore()
    .collection("rooms")
    .doc(roomId)
    .get()
    .then((doc) => {
      setRoomData(doc.data());
    });
    mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then(async (stream) => {
        streamRef.current = stream;
      });
    // on joining the room
    socketRef.current.emit("JOIN_ROOM", {
      roomId: roomId,
      userId: user.auth.uid,
      userData: user.profile,
    });

    // on receiving the peer acknowledgement
    // from another peer
    socketRef.current.on("R_SEND_SIG", async ({ signal, senderSocketId }) => {
      console.log("RECEIVED SEND SIGNAL FROM " + senderSocketId + "◀️◀️◀️◀️");
      // join the peer request from the participant
      const peer = await addPeerConnectionWithParticipant({
        incomingSignal: signal,
        senderSocketId: senderSocketId,
      });

      let newParticipants = [];

      // update peer instance for the participant
      participants.forEach((participant) => {
        if (participant.socketId === senderSocketId) {
          participant = {...participant, peer: peer};
        }
        newParticipants.push(participant);
      });
      console.log("OLD PARTICIPANTS", participants);
      console.log("NEW PARTICIPANTS", newParticipants);
      setParticipants(newParticipants);
      console.log('\x1b[31m'+'#%s\x1b[0m', newParticipants)

    });

    socketRef.current.on("R_RTRN_SIG", ({ receiverSocketId, signal }) => {
      console.log(
        "RECEIVED RETURNED SIGNAL FROM " + receiverSocketId + "◀️◀️◀️◀️"
      );
      // update peer instance for the member
      let newMemberPeers = [];
      memberPeers.forEach((member) => {
        if (member.socketId === receiverSocketId) {
          const answerSignal = new RTCSessionDescription(signal);
          member.peer.setRemoteDescription(answerSignal);
        }
        newMemberPeers.push(member);
      });
      setMemberPeers(newMemberPeers);
      let newParticipants = [];
      participants.forEach((participant) => {
        if (participant.socketId === receiverSocketId) {
          const answerSignal = new RTCSessionDescription(signal);
          participant.peer.setRemoteDescription(answerSignal);
        }
        newParticipants.push(participant);
      });
      console.log(`\x1b[${color}m${str}\x1b[0m`, 32, newParticipants)
      setParticipants(newParticipants);
    });

    socketRef.current.on("R_ICE_CANDIDATE", ({ senderSocketId, candidate }) => {
      console.log("RECEIVED ICE CANDIDATE FROM " + senderSocketId + "◀️◀️◀️◀️");
      // update peer instance for the member
      let newMemberPeers = [];
      memberPeers.forEach((member) => {
        if (member.socketId === senderSocketId) {
          member = {
            ...member,
            peer: member.peer.addIceCandidate(candidate)
          };
        }
        newMemberPeers.push(member);
      });
      setMemberPeers(newMemberPeers);
      let newParticipants = [];
      participants.forEach((participant) => {
        if (participant.socketId === senderSocketId) {
          participant = {
            ...participant,
            peer: participant.peer.addIceCandidate(candidate)
          };
        }
        newParticipants.push(participant);
      });
      console.log('\x1b[35m'+'#%s\x1b[0m', newParticipants)
      setParticipants(newParticipants);
    });
    return () => {
      participants.forEach((participant) => {
        participant.peer.destroy();
      });
      socketRef.current.disconnect();
      streamRef.current.getAudioTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  const createPeerConnectionWithMember = async ({ memberSocketId }) => {
    console.log("CREATED OFFER FOR " + memberSocketId + " ▶️▶️▶️▶️");
    let peerConnection = new RTCPeerConnection(iceServerConfig);
    streamRef.current.getTracks().forEach((track) => {
      peerConnection.addTrack(track, streamRef.current);
    });
    const offerSignal = await peerConnection.createOffer({
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: false,
        VoiceActivityDetection: true,
      },
    });
    console.log('OFFER SIGNAL ' + offerSignal + ' ✉️✉️✉️✉️');

    peerConnection.addEventListener("ICE_CANDIDATE", (event) => {
      console.log("ICE CANDIDATE ", event.candidate + " ❄️❄️❄️❄️");
      if (event.candidate) {
        socketRef.current.emit("ICE_CANDIDATE ", {
          receiverSocketId: memberSocketId,
          candidate: event.candidate,
        });
      }
    });

    await peerConnection.setLocalDescription(offerSignal);
    console.log("LOCAL DESCRIPTION SET ✅✅✅✅");

    console.log("SENDING SEIGNAL TO " + memberSocketId + "▶️▶️▶️▶️");
    socketRef.current.emit("SEND_SIG", {
      receiverSocketId: memberSocketId,
      signal: offerSignal,
    });
    return peerConnection;
  };

  const addPeerConnectionWithParticipant = async ({
    incomingSignal,
    senderSocketId,
  }) => {
    console.log("OFFER --------> ", incomingSignal);
    const peerConnection = new RTCPeerConnection(iceServerConfig);
    streamRef.current.getTracks().forEach((track) => {
      peerConnection.addTrack(track, streamRef.current);
    });
    const offerSignal = new RTCSessionDescription(incomingSignal);
    await peerConnection.setRemoteDescription(offerSignal);

    const answerSignal = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answerSignal);

    peerConnection.addEventListener("icecandidate", (event) => {
      console.log("ICE CANDIDATE ", event.candidate);
      if (event.candidate) {
        socketRef.current.emit("ICE_CANDIDATE", {
          receiverSocketId: senderSocketId,
          candidate: event.candidate,
        });
      }
    });

    console.log("SENDING RETURNED SIGNAL TO " + senderSocketId + " ▶️▶️▶️▶️");
    socketRef.current.emit("RTRN_SIG", {
      signal: answerSignal,
      senderSocketId: senderSocketId,
    });

    return peerConnection;
  };

  useEffect(() => {
    // subscribe to changes in participant list
    let unsub = firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("onstage")
      .onSnapshot(async (snap) => {
        let newParticipants = [];
        let newMemberPeers = [];

        // add all participants to the list
        // except the current user
        snap.docs.forEach((participant) => {
          newParticipants.push({
            userId: participant.id,
            ...participant.data(),
          });
        });

        // add all members to the list if current user is a participant
        // or, remove all members from the list if current user is not a participant
        if (
          newParticipants.find(
            (participant) => participant.userId === user.auth.uid
          )
        ) {
          console.log("In new participant");
          // fetch members list
          firebase
            .firestore()
            .collection("rooms")
            .doc(roomId)
            .get()
            .then((doc) => {
              const members = doc.data().members;

              console.log("PPPPPPPPPPPPPPPPPPPPPPPPP",newMemberPeers);

              // send peer connection request to each member and create peer
              // instance for each member except the current user
              Object.keys(members).forEach(async (userId) => {
                if (userId === user.auth.uid) return;
                const peer = await createPeerConnectionWithMember({
                  memberSocketId: members[userId],
                });
                newMemberPeers.push({
                  socketId: members[userId],
                  peer: peer,
                });
              });
            });
          setMemberPeers(newMemberPeers);
        } else {
          console.log("Not in participant");

          // // mute the audio if not in stage
          // await streamRef.current.getAudioTracks().forEach((track) => {
          //   track.enabled = false;
          // });

          // remove all member peers
          setMemberPeers([]);
        }
        console.log(newParticipants);
        setParticipants(newParticipants);
      });
    return () => unsub();
  }, []);

  const data = [{ name: "Mislah", join: "true" }];

  return (
    <View style={styles.container}>
      <Text
        style={{ color: "white", fontSize: 18, fontWeight: "bold", margin: 10 }}
      >
        Friends Making Rooms
      </Text>
      <View style={{ flexDirection: "row", margin: 10, alignItems: "center" }}>
        <Icon name={"circle"} size={15} color="red" />
        <Text
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 16,
            marginHorizontal: 5,
          }}
        >
          Live
        </Text>
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Image
            style={{ width: 35, height: 35, marginRight: 20 }}
            source={require("../assets/images/gift.png")}
          />
        </TouchableOpacity>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../assets/images/refer.png")}
        />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            marginHorizontal: 5,
          }}
        >
          200.00k
        </Text>
      </View>
      <View
        style={{
          width: "98%",
          height: 200,
          backgroundColor: " rgba(255, 255, 255, 0.2)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 80, height: 80 }}
            source={require("../assets/images/avatar.png")}
          />
        </View>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          {roomData.hostName}
        </Text>
        <Icon name={"heart-o"} size={25} color="pink" />
      </View>

      <View style={{ flexDirection: "row" }}>
        {participants.find((participant) => participant.type === "female") && (
          <StageParticipant
            participant={participants.find(
              (participant) => participant.type === "female"
            )}
          />
        )}
        {participants.find((participant) => participant.type === "male") && (
          <StageParticipant
            participant={participants.find(
              (participant) => participant.type === "male"
            )}
          />
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{ flex: 1 }}>
          {data.map((item) => (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 60,
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../assets/images/avatar.png")}
                />
              </View>
              <Text style={{ color: "gold", marginBottom: 10, marginLeft: 5 }}>
                {item.name}
              </Text>
              <Text style={{ color: "white" }}>Created the room</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View
            style={{
              width: 150,
              height: 20,
              backgroundColor: "pink",
              marginLeft: 20,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              rohit sent the gift
            </Text>
          </View>
          <BottomButton
            onPress={onBottomButtonPressed}
            isHost={roomData.host === user.auth.uid}
          ></BottomButton>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              style={{
                width: 30,
                height: 30,
                marginLeft: "auto",
                marginRight: 30,
                marginBottom: 5,
              }}
              source={require("../assets/images/heart.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={{ width: 50, height: 50, marginRight: 20 }}
              source={require("../assets/images/gift.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <WaitlistModal
        visible={waitlistModalVisible}
        onClose={() => {
          setWaitlistModalVisible(false);
        }}
        roomId={roomId}
        onAddToStage={onAddToStage}
      ></WaitlistModal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "black",
            marginTop: "auto",
          }}
        >
          <View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{ fontSize: 30, color: "white", marginLeft: "auto" }}
              >
                x
              </Text>
            </TouchableOpacity>
          </View>
          <Gifts />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
  },
  box1: {
    width: "48.5%",
    height: 200,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 4,
    marginRight: 4,
  },
  deletemic: {
    width: 150,
    height: 25,
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 10,
  },
});

export default VideoCall;
