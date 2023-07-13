import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const Home = () => {
  const navigation = useNavigation();
  const goto = () => {
    navigation.navigate("Profile");
  }
  const gotocoin = () => {
    navigation.navigate("Coins")
  }
  const CircleIcon = ({ name }) => {
    return (

          <View style={styles.square}>
            <TouchableOpacity style={{ height: 90, width: 90, backgroundColor: "white", borderRadius: 45, justifyContent: "center", alignItems: "center", marginTop: 5 }}>
              <Image style={{ height: 70, width: 55, marginBottom: 10 }} source={require("../assets/images/avatar2.png")} />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>Puja</Text>
            <View style={styles.box4}>
              <Text style={{ fontSize: 15, color: "black", marginRight: 7, marginLeft: 5 }}>Call</Text>
              <Icon name={"phone"} size={20} color="green" />

            </View>
          </View>
    );
  };
  const iconNames = ['Icon1', 'Icon2', 'Icon3', 'Icon4', 'Icon5'];
  return (
    <View style={{ flex: 1, }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={goto} style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center", margin: 10 }}>

            <Image style={{ width: 45, height: 45 }} source={require("../assets/images/avatar.png")} />

          </TouchableOpacity>
          <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Hello User</Text>
          <TouchableOpacity onPress={gotocoin} style={{ marginLeft: "auto", marginRight: 10 }}><Image style={{ width: 125, height: 27, }} source={require("../assets/images/framecup.png")} /></TouchableOpacity>
        </View>
        </View>
        <Image style={styles.saly} source={require("../assets/images/image2.png")} />
        <View>
        <ScrollView horizontal style={styles.container3}>
          {iconNames.map((name, index) => (
            <CircleIcon key={index} name={name} />
            ))}
        </ScrollView>
        </View>
        <View>

        <LinearGradient
          colors={['#8218c8', '#0538ff']}
          style={styles.gradient}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Image style={styles.photo2} source={require("../assets/images/image4.png")} />
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold", marginTop: 30, marginRight: 5 }}>Private CAlling Rooms</Text>
        </LinearGradient>
        <LinearGradient
          colors={['#bf41f6', '#3f5dfd']}
          style={styles.gradient}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Image style={styles.photo2} source={require("../assets/images/image6.png")} />
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold", marginTop: 30, marginRight: 5 }}>Make New Friends </Text>
        </LinearGradient>
        </View>


    </View>
  )
}
const styles = StyleSheet.create({
  box4: {

    width: 80,
    marginTop: 10,
    height: 25,
    borderRadius: 17,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  photo2: {
    height: 95,
    width: 100,
    marginTop: 5,
    marginLeft: 10

  },
  saly: {
    width: "90%",
    marginLeft: "5%",
    borderRadius: 10,
    marginTop: 10, height: 160
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: "auto",
    marginLeft: 20

  },
  container: {

    backgroundColor: "#FF679d",
    height: 90,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: '100%',

  },
  photo: {
    width: "90%", borderRadius: 5, marginTop: 5
  },
  gradient: {
    height: 100,
    marginBottom: 10,
    width: "90%",
    marginLeft: "5%",
    borderRadius: 10,
    paddingRight:20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:10
  },
  container3: {
    paddingVertical: 2,
    margin: 2,
    marginTop:10
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 25,
  },
  square: {
    width: 130,
    height: 170,
    borderRadius: 5,
    backgroundColor: '#2e63e8',
    justifyContent: "center",
    alignItems: "center",
    borderRadius:15,
    marginHorizontal:5
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'blue',
  },
  name: {
    marginTop: 10,
  },

})

export default Home