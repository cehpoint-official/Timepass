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
  MediaStream,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
} from "react-native-webrtc";
import io from "socket.io-client";
import { useAuthContext } from "../providers/AuthProvider";
import { useRoute } from "@react-navigation/native";
import Sound from "react-native-sound";

import { ToastAndroid } from "react-native";
const toast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25, // x offset
    50 // y offset
  );
};

// const baseUrl = "ws://192.168.1.14:8080";
const baseUrl = "https://timepass.cehpoint.co.in/";

const StageParticipant = ({ participant }) => {
  const { user } = useAuthContext();
  const ref = useRef();
  const soundRef = useRef();
  const streamRef = useRef(new MediaStream());

  useEffect(() => {
    if (participant === undefined || participant === null) return;
    if (user.auth.uid === participant.userId) return;
    console.log("PARTICIPANT", participant);
    if (participant.peer === undefined) return;
    console.log("PARTICIPANT", participant.peer);

    // participant.peer.on("stream", (event) => {
    //   console.log("track", event.track);
    //   streamRef.current.addTrack(event.track, streamRef.current);
    // });
    return () => {
      if (soundRef.current) {
        soundRef.current.stop(() => {
          console.log("Sound stopped");
        });
      }
    };
  }, [participant]);
  return (
    <View ref={ref} style={styles.box1}>
      <RTCView streamURL={streamRef.current.toURL()}></RTCView>
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
        name
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

const WaitlistModal = ({ visible, onClose, waitlist, onAddToStage }) => {
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
            height: Dimensions.get("window").height / 2,
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
          {Object.keys(waitlist).map((item) => (
            <View
              key={item}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, color: "black" }}>
                {waitlist[item].name}
              </Text>
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
  const room = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [waitlistModalVisible, setWaitlistModalVisible] = useState(false);

  // // for storing peer connections
  // const [memberPeers, setMemberPeers] = useState([]);
  // const [participants, setParticipants] = useState([]);

  const updateMembers = ({ socketId, peer, type }) => {
    if (members.find((member) => member.socketId === socketId)) {
      setMembers((prev) => {
        return prev.map((member) => {
          if (member.socketId === socketId) {
            return { ...member, peer: peer };
          }
          return member;
        });
      });
    } else {
      setMembers((prev) => [
        ...prev,
        { socketId: socketId, peer: peer, type: type },
      ]);
    }
  };

  // // refs
  const socketRef = useRef();
  const isFirstTime = useRef(false);
  const streamRef = useRef(new MediaStream());
  // const peerRef = useRef();
  const [members, setMembers] = useState([]);
  const { user } = useAuthContext();
  const [waitlist, setWaitlist] = useState({});
  // const [roomData, setRoomData] = useState({});

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
    console.log("OFFER SIGNAL " + offerSignal + " ✉️✉️✉️✉️");

    peerConnection.addEventListener("icecandidate", (event) => {
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

  const onBottomButtonPressed = async () => {
    console.log("Bottom button pressed");
    const isHost = room.host === user.auth.uid;
    const userData = {
      userId: user.auth.uid,
      ...user.profile,
    };
    if (isHost) {
      setWaitlistModalVisible(true);
    } else {
      socketRef.current.emit("JOIN_WAITLIST", {
        roomId: room.roomId,
        userData: userData,
      });
    }
  };

  // NOTE: Only for host
  const onAddToStage = async (user) => {
    socketRef.current.emit("ADD_TO_STAGE", {
      roomId: room.roomId,
      userId: user,
    });
  };

  useEffect(() => {
    socketRef.current = io.connect(baseUrl);
    socketRef.current.onAny((event, ...args) => {
      toast("RECV: " + event + " 🟠");
    });
    socketRef.current.onAnyOutgoing((event, ...args) => {
      toast("SEND: " + event + " 🟢");
    });

    const userData = {
      userId: user.auth.uid,
      name: user.profile.name,
    };

    mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      streamRef.current = stream;
      joinRoom(room.roomId, userData);

      socketRef.current.on("PROMOTED", (members) => {
        setOnstage(true);
        // TODO: SEND OFFER TO ALL MEMBERS EXCEPT ONSTAGE
        // TODO: ADD AUDIOSTREAM TO THOSE MEMBERS ONSTAGE
      });

      socketRef.current.on("NEW_MEMBER", (userData) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>> ", userData);
        // if (onstage) {
        // TODO: SEND OFFER TO NEW USER IF YOU ARE ONSTAGE MEMBER
        let peerConnection = createPeerConnectionWithMember({
          memberSocketId: userData.socketId,
        });
        updateMembers({
          socketId: userData.socketId,
          peer: peerConnection,
        });

        // setMembers((prev) => [...prev, newMember]);
        // }
      });

      socketRef.current.on("NEW_ONSTAGE_MEMBER", (userData) => {
        // TODO: SHOW THE NEW MEMBER ON SCREEN
      });

      // NOTE: Only for host
      socketRef.current.on("WAITLIST_UPDATED", (waitlist) => {
        setWaitlist(waitlist);
      });

      // on receiving the peer acknowledgement
      // from another peer
      socketRef.current.on("R_SEND_SIG", async ({ signal, senderSocketId }) => {
        console.log("RECEIVED SEND SIGNAL FROM " + senderSocketId + "◀️◀️◀️◀️");
        // join the peer request from the participant
        const peerConnection = await addPeerConnectionWithParticipant({
          incomingSignal: signal,
          senderSocketId: senderSocketId,
        });
        console.log("\x1b[31m" + "#%s\x1b[0m Before: ", members);
        updateMembers({
          socketId: senderSocketId,
          peer: peerConnection,
        });
        // if not empty
        // if (newMembers !== []) setMembers(newMembers);
        console.log("\x1b[31m" + "#%s\x1b[0mAfter: ", members);
      });

      socketRef.current.on("R_RTRN_SIG", ({ receiverSocketId, signal }) => {
        console.log(
          "RECEIVED RETURNED SIGNAL FROM " + receiverSocketId + "◀️◀️◀️◀️"
        );

        updateMembers((prev) => ({
          socketId: receiverSocketId,
          peer: prev
            .find((member) => member.socketId === receiverSocketId)
            .peer.setRemoteDescription(signal),
        }));
      });

      socketRef.current.on(
        "R_ICE_CANDIDATE",
        ({ senderSocketId, candidate }) => {
          console.log(
            "RECEIVED ICE CANDIDATE FROM " + senderSocketId + "◀️◀️◀️◀️"
          );
          // update peer instance for the member
          updateMembers({
            socketId: senderSocketId,
            peer: members
              .find((member) => member.socketId === senderSocketId)
              .peer.addIceCandidate(candidate),
          });
          // setMembers(newembers);
        }
      );
    });

    return () => {
      socketRef.current.emit("LEAVE_ROOM", {
        roomId: room.roomId,
        userId: user.auth.uid,
      });
      socketRef.current.disconnect();
      console.log("DISCONNECTED");
    };
  }, []);

  const joinRoom = (roomId, userData) => {
    socketRef.current.emit("JOIN_ROOM", { roomId, userData });

    socketRef.current.on("MEMBERS", async (allMembers) => {
      console.log("&&&&>>>>>>>>>>>>>>>>>>>>>", allMembers);
      isFirstTime.current = true;
      allMembers.forEach((member) => {
        updateMembers({
          socketId: member.socketId,
          type: member.type,
          peer: null,
        });
      });
      console.log("####>>>>>>>>>>>>>>>>>>>>>", members);
    });
  };

  useEffect(() => {
    if (isFirstTime.current) {
      console.log("^$$$$$$$$$$$$", members);
      socketRef.current.emit("RECIEVED_MEMBERS");
      isFirstTime.current = false;
    }
  }, [members]);

  const data = [{ name: room.hostName, join: "true" }];

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
      {/* . */}
      {!room.host && (
        <StageParticipant
          key={1}
          participant={members.find(
            (participant) => participant.type === "influencer"
          )}
        />
      )}
      <View style={{ flexDirection: "row" }}>
        {(console.log(">>>>>>>>>", members) || 1) &&
          members.find((participant) => participant.type === "female") && (
            <StageParticipant
              participant={members.find(
                (participant) => participant.type === "female"
              )}
            />
          )}
        {members.find((participant) => participant.type === "male") && (
          <StageParticipant
            participant={members.find(
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
              <Text style={{ color: "white" }}> created the room.</Text>
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
            isHost={room.host === user.auth.uid}
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
        waitlist={waitlist}
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

export default VideoCall;
