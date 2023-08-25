import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Modal,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import {RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStream, mediaDevices} from 'react-native-webrtc';
import { firebase } from "@react-native-firebase/firestore";

const PermenantRoomId = "1234";

function AppButton({ title, onPress, style, disabled = false }) {
  return (
    <View style={style}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

const VideoCall = () => {

  const [peerConnection, setPeerConnection] = useState(new RTCPeerConnection(configuration));
  const [localStream, setLocalStream] = useState(new MediaStream());
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [roomId, setRoomId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [roomIdInput, setRoomIdInput] = useState('');
  const [db, setDb] = useState();
  const [onCall, setOnCall] = useState(false);

  useEffect(() => {
    // setPeerConnection(new RTCPeerConnection(configuration));
    // setLocalStream(new MediaStream());
    // setRemoteStream(new MediaStream());
    setDb(firebase.firestore());
  }, []);

  const openUserMedia = async () => {
    let isFront = true;
    const sourceInfos = await mediaDevices.enumerateDevices();
    console.log('Source infos: ', sourceInfos);

    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
        videoSourceId = sourceInfo.deviceId;
      }
    }

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 500,
          minHeight: 300,
          minFrameRate: 30
        },
        facingMode: (isFront ? "user" : "environment"),
        optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
      }
    })

    console.log('Stream: ', JSON.stringify(stream));
    await setLocalStream(stream);
    console.log('Local stream: ', JSON.stringify(localStream));
    return stream;
  };

  const createRoom = async () => {
    const stream = await openUserMedia();
    console.log('Stream2: ', JSON.stringify(stream));
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    setOnCall(true);

    const roomRef = await db.collection('roomsa').doc(PermenantRoomId);

    registerPeerConnectionListeners();

    console.log('Create PeerConnection with configuration: ', configuration);

    console.log('Adding local stream to PC', JSON.stringify(stream));
    setLocalStream(stream);
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream))

    // Code for collecting ICE candidates below
    const callerCandidatesCollection = roomRef.collection('callerCandidates');
    peerConnection.onicecandidate = event => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
    };
    // Code for collecting ICE candidates above

    // Code for creating a room below
    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(offer);
    console.log('Created offer:', JSON.stringify(offer));

    const roomWithOffer = {
      'offer': {
        type: offer.type,
        sdp: offer.sdp,
      },
    };
    await roomRef.set(roomWithOffer);
    setRoomId(roomRef.id);
    console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);
    // Code for creating a room above

    peerConnection.ontrack = event => {
      console.log("############################################")
      console.log("ON TRACK!!!");
      console.log("Got remote stream: ", event.streams[0]);
      setRemoteStream(event.streams[0]);
    };

    // Listening for remote session description below
    roomRef.onSnapshot(async snapshot => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });
    // Listening for remote session description above

    // Listen for remote ICE candidates below
    roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above
  };

  const joinRoom = async () => {
    setRoomIdInput(PermenantRoomId);
    console.log('Join room clicked');
    setModalVisible(true);
    await openUserMedia();
  };

  const joinRoomById = async () => {
    console.log('Join room: ', roomIdInput);
    await setRoomId(roomIdInput);
    setModalVisible(false);
    setOnCall(true);

    console.log(roomIdInput)
    const roomRef = await db.collection('roomsa').doc(`${roomIdInput}`);
    const roomSnapshot = await roomRef.get();
    console.log('Got room: ', roomSnapshot.exists);

    if (roomSnapshot.exists) {
      console.log('Create PeerConnection with configuration: ', configuration);
      registerPeerConnectionListeners();
      console.log('Adding local stream to PC', JSON.stringify(localStream));
      localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream))

      // Code for collecting ICE candidates below
      const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
      peerConnection.onicecandidate = event => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        calleeCandidatesCollection.add(event.candidate.toJSON());
      };
      // Code for collecting ICE candidates above

      peerConnection.ontrack = event => {
        console.log("############################################")
        console.log("ON TRACK!!!");
        console.log("Got remote stream: ", event.streams[0]);
        setRemoteStream(event.streams[0]);
      }

      // Code for creating SDP answer below
      const offer = roomSnapshot.data().offer;
      console.log('Got offer:', offer);
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      console.log('Created answer:', JSON.stringify(answer));
      await peerConnection.setLocalDescription(answer);

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      };
      await roomRef.update(roomWithAnswer);
      // Code for creating SDP answer above

      // Listening for remote ICE candidates below
      roomRef.collection('callerCandidates').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === 'added') {
            let data = change.doc.data();
            console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
            await peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // Listening for remote ICE candidates above

    }
  };

  const hangUp = async () => {
    console.log('Hang up');
    setOnCall(false);

    const tracks = localStream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });

    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }

    if (peerConnection) {
      peerConnection.close();
    }

    // Delete room on hangup
    if (roomId) {
      const roomRef = db.collection('roomsa').doc(roomId);
      const calleeCandidates = await roomRef.collection('calleeCandidates').get();
      calleeCandidates.forEach(async candidate => {
        await candidate.ref.delete();
      });
      const callerCandidates = await roomRef.collection('callerCandidates').get();
      callerCandidates.forEach(async candidate => {
        await candidate.ref.delete();
      });
      await roomRef.delete();
    }

    setRoomId(null);
    setLocalStream(new MediaStream());
    setRemoteStream(new MediaStream());
    setPeerConnection(new RTCPeerConnection(configuration));
    console.log('Local stream: ', localStream.toURL());
    console.log('Remote stream: ', remoteStream.toURL());
  };

  const registerPeerConnectionListeners = () => {
    peerConnection.onicegatheringstatechange = () => {
      console.log(
        `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
    };

    peerConnection.onconnectionstatechange = () => {
      console.log(`Connection state change: ${peerConnection.connectionState}`);
    };

    peerConnection.onsignalingstatechange = () => {
      console.log(`Signaling state change: ${peerConnection.signalingState}`);
    };

    peerConnection.oniceconnectionstatechange = () => {
      console.log(
        `ICE connection state change: ${peerConnection.iceConnectionState}`);
    };
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonsContainer} >
          <AppButton title="Create Room" onPress={createRoom} disabled={onCall} />
          <AppButton title="Join Room" onPress={joinRoom} disabled={onCall} />
          <AppButton title="Hang up" onPress={hangUp} disabled={!onCall} />
        </View>
        <View style={styles.textContainer}>
          <Text>Room ID: {roomId}</Text>
        </View>
        <View style={styles.videoContainer}>
          <RTCView
            streamURL={localStream && localStream.toURL()}
            objectFit='cover'
            mirror={true}
            style={styles.localVideo}
            zOrder={2}
          />
          <RTCView
            streamURL={remoteStream && remoteStream.toURL()}
            objectFit='cover'
            mirror={true}
            style={styles.remoteVideo}
          />
        </View>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalView}>
            <AppButton color='white' title='Join Room' onPress={() => joinRoomById(PermenantRoomId)} />
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  localVideo: {
    height: 150,
    width: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 2,
  },
  remoteVideo: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    position: 'absolute',
  },
  videoContainer: {
    flexDirection: 'row',
    flex: 8,
  },
  modalView: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default VideoCall;  