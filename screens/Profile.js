import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import styles from '../Appcss'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
  const navigation = useNavigation();

  // Handle back button press
  const handleGoBack = () => {
    navigation.goBack();
  };
  const expertprofile = () => {
    navigation.navigate("ExpertProfile");
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ backgroundColor: "#ff679d", flexDirection: "row", height: 50, alignItems: "center", paddingLeft: 10 }]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon2 name={"arrow-back-ios"} size={20} color="white" />
        </TouchableOpacity>
        <Text style={style1.title}>Profile</Text></View>
      <View style={[{ backgroundColor: "rgba(0,0,0,0.1)", width: "97%", height: 150, borderRadius: 20, margin: 5, flexDirection: "row" }]}>
        <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center", margin: 20 }}>

          <Image style={{ width: 45, height: 45 }} source={require("../assets/images/avatar.png")} />

        </View>
        <View style={{ marginTop: 30 }}><Text style={[styles.text1, styles.textBlack, { marginBottom: 6 }]}>Hello User!</Text>
          <View style={[{ flexDirection: "row" }]}><Icon name="phone" color="green" size={17} />
            <Text style={{ color: "green", fontSize: 15, fontWeight: "bold", marginBottom: 6 }}>Successfull calls 10</Text></View>
          <View style={[{ flexDirection: "row" }]}><Icon4 name="alert-circle-outline" color="#2e63e8" size={17} />
            <Text style={{ color: "#2e63e8", fontSize: 15, fontWeight: "bold" }}>Talktime 30 min</Text></View>
        </View>
      </View>
      <LinearGradient colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']} style={{ margin: 5, borderRadius: 10 }} start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }} >
        <TouchableOpacity onPress={expertprofile} style={{ height: 50, width: '98%', margin: 5, borderRadius: 5, flexDirection: "row" }}>
          <View style={{ marginLeft: 10, marginTop: 15, marginRight: 10 }}><Icon name="gift" size={25} color="gold" /></View>
          <Text style={style1.box}>Expert Profile</Text>
          <View style={{ marginLeft: "auto", marginTop: 15, marginRight: 10 }}><Icon2 name="arrow-forward-ios" size={20} color="white" /></View>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']} style={{ margin: 5, borderRadius: 10 }} start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }} >
        <TouchableOpacity style={{ height: 50, width: '98%', margin: 5, borderRadius: 5, flexDirection: "row" }}>
          <View style={{ marginLeft: 10, marginTop: 15, marginRight: 10 }}><Icon name="trophy" size={25} color="gold" /></View>
          <Text style={style1.box}>refer to your Friends</Text>
          <View style={{ marginLeft: "auto", marginTop: 15, marginRight: 10 }}><Icon2 name="arrow-forward-ios" size={20} color="white" /></View>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']} style={{ margin: 5, borderRadius: 10 }} start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }} >
        <TouchableOpacity onPress={() => navigation.navigate("Setting")} style={{ height: 50, width: '98%', margin: 5, borderRadius: 5, flexDirection: "row" }}>
          <View style={{ marginLeft: 10, marginTop: 15, marginRight: 10 }}><Icon name="cog" size={20} color="gold" /></View>
          <Text style={style1.box}>Settings</Text>
          <View style={{ marginLeft: "auto", marginTop: 15, marginRight: 10 }}><Icon2 name="arrow-forward-ios" size={25} color="white" /></View>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']} style={{ margin: 5, borderRadius: 10 }} start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }} >
        <TouchableOpacity onPress={()=>navigation.navigate("Coins")} style={{ height: 50, width: '98%', margin: 5, borderRadius: 5, flexDirection: "row" }}>
          <View style={{ marginLeft: 10, marginTop: 15, marginRight: 10 }}><Icon4 name="hand-coin" size={25} color="gold" /></View>
          <Text style={style1.box}>Coins</Text>
          <View style={{ marginLeft: "auto", marginTop: 15, marginRight: 10 }}><Icon2 name="arrow-forward-ios" size={20} color="white" /></View>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']} style={{ margin: 5, borderRadius: 10 }} start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }} >
        <TouchableOpacity style={{ height: 50, width: '98%', margin: 5, borderRadius: 5, flexDirection: "row" }}>
          <View style={{ marginLeft: 10, marginTop: 15, marginRight: 10 }}><Icon name="gift" size={25} color="gold" /></View>
          <Text style={style1.box}>Gift</Text>
          <View style={{ marginLeft: "auto", marginTop: 15, marginRight: 10 }}><Icon2 name="arrow-forward-ios" size={20} color="white" /></View>
        </TouchableOpacity>
      </LinearGradient>






    </View>
  )
}
const style1 = StyleSheet.create({
  box: {
    color: "white", marginLeft: 15, marginTop: 15, fontSize: 15.5, fontWeight: "bold"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})
export default Profile