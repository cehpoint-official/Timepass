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
import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Gifts from "./components/gifts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RTCView, mediaDevices } from "react-native-webrtc";
import { SimplePeer } from "simple-peer";
import io from "socket.io-client";
import { firebase } from "@react-native-firebase/firestore";
import { useAuthContext } from "../providers/AuthProvider";
import { useRoute } from "@react-navigation/native";
import Sound from 'react-native-sound';

const screenHeight = Dimensions.get('window').height;
const baseUrl = "ws://192.168.1.14:8080";
//const baseUrl = "ws://172.16.2.38:8080";

const StageParticipant = ({ participant }) => {
  const { name, peer, socketId, userId } = participant;
  const {user} = useAuthContext();
  const ref = useRef();
  const soundRef = useRef();

  useEffect(() => {
    if (user.auth.uid === userId) return;
    console.log('PARTICIPANT',participant);
    peer.on("stream", (stream) => {
      console.log("stream", stream);
      ref.current.srcObject = stream;
      soundRef.current = new Sound(
        ref.current, null, err => {
          if (err) {
            console.log('Error loading sound');
          } else {
            soundRef.current.play(success => {
              if (success) {
                console.log('Successfully finished playing');
              } else {
                console.log('Playback failed');
              }
            });
          }
        }
      );
    });
    return () => {
      if (this.sound) {
        this.sound.stop(() => {
          console.log('Sound stopped');
        });
      }
    }
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


const WaitlistModal = ({visible, onClose, roomId, onAddToStage}) => {
  const [waitlist, setWaitlist] = useState([]);
  useEffect(() => {
    let unsub = firebase.firestore().collection('rooms').doc(roomId).collection('waitlist').onSnapshot((snap) => {
      let newWaitlist = [];
      snap.docs.forEach((doc) =>
      newWaitlist.push({userId: doc.id, ...doc.data()})
      );
      setWaitlist(newWaitlist);
    });
    return () => unsub();
  }, []);

  return  (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            elevation: 5,
            height: screenHeight / 2, // Set the height to half of the screen
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          >
            <Text style={{ fontSize: 24, color: 'gray' }}>X</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 22, marginBottom: 10, color: 'black', fontWeight: 'bold' }}>Add your friends</Text>
          {waitlist.map((item) => (
            <View key={item.userId} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 18, color: 'black' }}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  onAddToStage(item.userId)
                }}
                style={{ marginLeft: 'auto' }}>
                <Text style={{ fontSize: 16, color: 'blue' }}>+ADD</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </Modal>

  );
}

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
  const { user } = useAuthContext();
  
  const isHost = user.profile.role === "influencer"; //FIXME: check if room.host == user.id instead
  const buttonType = isHost ? "Add user" : "Join waitlist";

  const onBottomButtonPressed = async () => {
      console.log('pressed');
      if(isHost){
        setWaitlistModalVisible(true);
      }
      else {
        socketRef.current.emit('JOIN_WAITLIST', {
            roomId: roomId,
            userId: user.auth.uid,
            userData: user.profile
        })
    }
  };

  const onAddToStage = async (userId) => {
    socketRef.current.emit("ADD_TO_STAGE", {
      roomId: roomId,
      userId: userId,
      socketId: socketRef.current.id,
    })
  }


  useEffect(() => {
    socketRef.current = io.connect(baseUrl);
    mediaDevices.getUserMedia({
      audio: true,
      video: false
    }).then((stream) => {
      stream.current = stream;
    });
    // on joining the room
    socketRef.current.emit("JOIN_ROOM", {
      roomId: roomId,
      userId: user.auth.uid,
      userData: user.profile
    });
  
    // on receiving the peer acknowledgement
    // from another peer
    socketRef.current.on(
      "R_SEND_SIG",
      ({ incomingSignal, senderSocketId, stream }) => {
        // join the peer request from the participant
        const peer = addPeerConnectionWithParticipant({
          incomingSignal: incomingSignal,
          senderSocketId: senderSocketId,
          stream: stream,
        });
        let newParticipants = [];

        // update peer instance for the participant
        participants.forEach((participant) => {
          if (participant.socketId === senderSocketId) {
            participant.peer = peer;
          }
          newParticipants.push(participant);
        });
        setParticipants(newParticipants);
      }
    );

    socketRef.current.on("R_RTRN_SIG", ({ receiverSocketId, signal }) => {
      // update peer instance for the member
      let newMemberPeers = [];
      memberPeers.forEach((member) => {
        if (member.socketId === receiverSocketId) {
          member.peer.signal(signal);
        }
        newMemberPeers.push(member);
      });
      setMemberPeers(newMemberPeers);
    });
    return () => socketRef.current.disconnect();
  }, []);

  const createPeerConnectionWithMember = ({
    memberSocketId,
    socketId,
    stream,
  }) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("SEND_SIG", {
        memberSocketId,
        socketId,
        signal,
      });
    });

    return peer;
  };

  const addPeerConnectionWithParticipant = ({
    incomingSignal,
    senderSocketId,
    stream,
  }) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("RTRN_SIG", {
        signal: signal,
        senderSocketId: senderSocketId,
      });
    });

    peer.signal(incomingSignal);
    return peer;
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
          newParticipants.includes(
            (participant) => participant.userId === user.auth.uid
          )
        ) {
          // fetch members list
          await firebase
            .firestore()
            .collection("rooms")
            .doc(roomId)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const members = doc.data().members;

                // send peer connection request to each member and create peer
                // instance for each member except the current user
                members.forEach((userId, socketId) => {
                  if (userId === user.auth.uid) return;
                  const peer = createPeerConnectionWithMember({
                    memberSocketId: socketId,
                    socketId: socketRef.current.id,
                    stream: streamRef.current,
                  });
                  newMemberPeers.push({
                    socketId: socketId,
                    peer: peer,
                  });
                });
              }
            });
          setMemberPeers(newMemberPeers);
        } else {
          // remove all member peers
          setMemberPeers([]);
        }
        setParticipants(newParticipants);
      });
    return () => unsub();
  }, []);

  const data = [
    { name: "sandhu waliya", join: "true" },
    { name: "sandhu waliya", join: "true" },
    { name: "sandhu waliya", join: "true" },
    { name: "sandhu waliya", join: "true" },
    { name: "sandhu waliya", join: "true" },
    { name: "sandhu waliya", join: "true" },
    { name: "sandhu waliya", join: "true" },
    { name: "sandhu waliya", join: "true" },
    { name: "sandhu waliya", join: "true" },
    { name: "sandhu waliya", join: "true" },
  ];

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
          john{" "}
        </Text>
        <Icon name={"heart-o"} size={25} color="pink" />
      </View>

      <View style={{ flexDirection: "row" }}>
        {participants.find(participant => participant.type === 'female') && <StageParticipant
          participant={participants.find(participant => participant.type === 'female')}
        />}
        {participants.find(participant => participant.type === 'male') && <StageParticipant
          participant={participants.find(participant => participant.type === 'male')}
        />}
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
              <Text style={{ color: "white" }}>Joined the waitlist</Text>
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
              <Text onPress={onBottomButtonPressed}  style={{ color: "white", fontSize: 20 }}>
                {buttonType}
              </Text>
            </TouchableOpacity>
          </View>
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
        onClose={() => {setWaitlistModalVisible(false)}}
        roomId={roomId}
        onAddToStage={onAddToStage}
      >
      </WaitlistModal>
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
