import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect, useReducer, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { set } from 'mongoose';
import Gifts from './components/gifts';

const VideoCall = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
  ]

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", margin: 10 }}>Frineds Making Rooms</Text>
      <View style={{ flexDirection: "row", margin: 10, alignItems: "center" }}>
        <Icon name={"circle"} size={15} color="red" />
        <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>Live</Text>
      </View>

      <View style={{ width: "98%", height: 200, backgroundColor: " rgba(255, 255, 255, 0.2)", justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>

          <Image style={{ width: 80, height: 80 }} source={require("../assets/images/avatar.png")} />
        </View>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>john </Text>
        <Icon name={"heart-o"} size={25} color="pink" />

      </View>
      <View style={{ flexDirection: 'row' }} >
        <View style={styles.box1} >
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>

            <Image style={{ width: 60, height: 60 }} source={require("../assets/images/avatar2.png")} />
          </View>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>puja</Text>
        </View>
        <View style={styles.box1} >
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>

            <Image style={{ width: 60, height: 60, opacity: .5 }} source={require("../assets/images/avatar2.png")} />

          </View>
          <View style={{ marginTop: -70 }}><Icon name="microphone-slash" size={70} color="grey" /></View>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>priya</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        <View style={{ flex: 1 }}>
          {data.map((item) => (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ width: 30, height: 30, borderRadius: 60, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>

                <Image style={{ width: 20, height: 20 }} source={require("../assets/images/avatar.png")} />
              </View><Text style={{ color: "gold", marginBottom: 10, marginLeft: 5 }}>{item.name}</Text><Text style={{ color: "white" }}>Joined the waitlist</Text></View>
          ))}
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View><View style={{ width: 150, height: 20, backgroundColor: "pink", marginLeft: 20, marginTop: 20, justifyContent: "center", alignItems: "center", borderRadius: 5 }}><Text style={{ color: "white", fontWeight: "bold" }}>rohit sent the gift</Text></View><View style={{ marginTop: "auto", height: 40, marginBottom: 10, marginLeft: 20, backgroundColor: "#2e63e8", padding: 5, justifyContent: "center", alignItems: "center", width: 150, borderRadius: 10 }}>
          <TouchableOpacity><Text style={{ color: "white", fontSize: 20 }}>join waitlist</Text></TouchableOpacity></View></View>
        <View ><TouchableOpacity><Image style={{ width: 30, height: 30, marginLeft: "auto", marginRight: 30, marginBottom: 5 }} source={require("../assets/images/heart.png")} /></TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}><Image style={{ width: 50, height: 50, marginRight: 20, }} source={require("../assets/images/gift.png")} /></TouchableOpacity></View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{ width: "100%", height: 200, backgroundColor: "black", marginTop: "auto" }}>
          <View><TouchableOpacity onPress={() => setModalVisible(false)}><Text style={{ fontSize: 30, color: "white", marginLeft: "auto" }}>x</Text></TouchableOpacity></View><Gifts /></View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white"
  },
  box1: {

    width: "48.5%", height: 200, backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: "center",
    alignItems: "center",

    marginTop: 4,
    marginRight: 4
  }
})


export default VideoCall