import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const ChatScreen = () => {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const iconcolor = "white"
  const iconsize = 20
  const handleSend = () => {
    // Implement your logic for sending the message
    // Here, you can use the inputText state for the message content
    console.log('Sending message:', inputText);
    setInputText('');
  };

  const back = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperTopView}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginTop: 14, marginLeft: 10 }}><TouchableOpacity onPress={back}><Icon2 name={"arrow-back-ios"} size={30} color="white" /></TouchableOpacity></View>
          <View style={{ width: 60, height: 60, borderRadius: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>

            <Image style={{ width: 40, height: 40 }} source={require("../assets/images/avatar.png")} />

          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.circleIconContainer} onPress={() => console.log('Phone call')}>
            <Icon name="phone" size={iconsize} color={iconcolor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleIconContainer} onPress={() => console.log('Video call')}>
            <Icon name="video-camera" size={18} color={iconcolor} />
          </TouchableOpacity></View>
      </View>
      <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: "center", height: 200 }}>
        <View style={{ width: 160, height: 160, borderRadius: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>

          <Image style={{ width: 100, height: 100 }} source={require("../assets/images/avatar.png")} />


        </View>
        <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Steve Craig</Text>
        <Text style={{ fontSize: 13, color: "black", fontWeight: "bold" }}>you are friends on facebook</Text></View>
      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => console.log('Photo')}>
          <Icon name="photo" size={iconsize} color={iconcolor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => console.log('File')}>
          <Icon name="file" size={iconsize} color={iconcolor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => console.log('Camera')}>
          <Icon name="camera" size={iconsize} color={iconcolor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => console.log('Microphone')}>
          <Icon name="microphone" size={iconsize} color={iconcolor} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" size={iconsize} color={iconcolor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  upperTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff679d',
    paddingVertical: 10,
    height: 65
  },
  circleIconContainer: {
    width: 33,
    height: 33,
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  bottomView: {
    marginTop: "auto",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff679d',
    padding: 10,
  },
  bottomIconContainer: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
