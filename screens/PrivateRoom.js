import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const PrivateRoom = () => {
  const [seconds, setSeconds] = useState(5);
  const [modal, setmodal] = useState(false);
  const [micstatus, setmicstatus] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (seconds === 0) {
      navigation.navigate("Tabs");
    }
    let interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <ImageBackground
      source={require("../assets/images/privateroombackground.png")}
      style={{
        flex: 1,
        backgroundColor: "black",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 20,
      }}
    >
      <Text
        style={[
          styles.text,
          { fontSize: 18, marginHorizontal: 20, marginVertical: 20 },
        ]}
      >
        Private Room
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
          marginVertical: 20,
          marginTop: -150,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ height: 65, width: 65 }}
            source={require("../assets/images/puja.png")}
          />
          <Text
            style={[
              styles.text,
              { fontSize: 15, marginHorizontal: 20, marginVertical: 20 },
            ]}
          >
            Puja
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="timer-outline"
            size={30}
            color="rgba(255,255,255,.5)"
          />
          <Text
            style={[
              styles.text,
              { fontSize: 15, marginHorizontal: 5, marginVertical: 5 },
            ]}
          >
            {seconds}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ height: 65, width: 65 }}
            source={require("../assets/images/pratik.png")}
          />
          <Text
            style={[
              styles.text,
              { fontSize: 15, marginHorizontal: 20, marginVertical: 20 },
            ]}
          >
            Pratuk
          </Text>
        </View>
      </View>
      <View>
        <View
          style={[
            styles.container,
            {
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 5,
            },
          ]}
        >
          <Image
            style={{ height: 35, width: 35 }}
            source={require("../assets/images/puja.png")}
          />
          <Text
            style={[
              styles.text,
              {
                fontSize: 15,
                marginHorizontal: 10,
                backgroundColor: "#3d192b",
                width: "60%",
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 15,
              },
            ]}
          >
            Puja
          </Text>
        </View>
        <View
          style={[
            styles.container,
            {
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 5,
            },
          ]}
        >
          <Image
            style={{ height: 35, width: 35 }}
            source={require("../assets/images/puja.png")}
          />
          <Text
            style={[
              styles.text,
              {
                fontSize: 15,
                marginHorizontal: 10,
                backgroundColor: "#36437a",
                width: "60%",
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 15,
              },
            ]}
          >
            Puja
          </Text>
        </View>
      </View>
      <View style={[styles.container]}>
        <TouchableOpacity>
          <Icon3 name="sound" size={30} color="rgba(255,255,255,.8)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setmicstatus(!micstatus)}>
          <MaterialCommunityIcons
            name={micstatus ? "microphone" : "microphone-off"}
            size={30}
            color="rgba(255,255,255,.8)"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon3 name="message1" size={25} color="rgba(255,255,255,.8)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setmodal(true)}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/images/phone.png")}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setmodal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setmodal(false)}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.5)" }}></View>
        </TouchableWithoutFeedback>
        <View
          style={{
            height: 180,
            backgroundColor: "rgba(0,0,0,.5)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 60,
              backgroundColor: "#1bdff6",
              width: "80%",
              borderRadius: 20,
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/images/statusgreen.png")}
            />
            <Text style={[styles.text, { fontSize: 15, color: "black" }]}>
              Stay Online
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 60,
              backgroundColor: "#ce7398",
              width: "80%",
              borderRadius: 20,
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/images/statusred.png")}
            />
            <Text style={[styles.text, { fontSize: 15, color: "black" }]}>
              Stay Offline
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableWithoutFeedback onPress={() => setmodal(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 50,
                backgroundColor: "white",
                width: "80%",
                borderRadius: 20,
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[styles.text, { fontSize: 15, color: "black" }]}>
                You are unable make call
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginVertical: 20,
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default PrivateRoom;
