import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import styles from '../Appcss'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

const Expertprofile = () => {
  const navigation = useNavigation()
  const handleGoBack = () => {
    navigation.goBack()
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white", }}>
      <View style={[{ backgroundColor: "#ff679d", flexDirection: "row", height: 50, alignItems: "center", paddingLeft: 10 }]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon2 name={"arrow-back-ios"} size={20} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, color: "white" }}>Expert Profile</Text></View>
      <View style={[{ width: "100%", height: "100%", backgroundColor: "white", alignItems: "center" }]}>
        <View style={[styles.container, { backgroundColor: "rgba(0,0,0,0.1)", width: "97%", height: 200, borderRadius: 20 }]}>
          <View style={{ width: 60, height: 60, borderRadius: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>

            <Image style={{ width: 40, height: 40 }} source={require("../assets/images/avatar.png")} />

          </View>
          <Text style={[styles.text1, styles.textBlack]}>Vijay</Text>
          <Text style={[styles.text2, styles.textBlack, { textAlign: "center" }]}>i am software developer and i have a more than 1 year expierince on real work projects</Text>
        </View>
        <Text style={{ color: "black", fontSize: 21, fontWeight: "bold", marginRight: "auto", marginLeft: 20 }}>About Me</Text>

        <Text style={[styles.text2, styles.textBlack, { textAlign: "justify", margin: 20 }]}>“I have just over a year of experience as a junior software engineer with First Technology. In my short time there, I've already contributed to over a dozen projects and assisted with managing one project for one of the firm's long-time clients.

          “Prior to this role, I completed a two-year internship with Mobile First, where I honed my mobile app development skills. Ideally, I would like to continue to specialize in mobile software engineering, an area where I know your firm excels.” </Text>
        <Text style={[styles.text1, styles.textBlack, { marginRight: "auto", marginLeft: 20 }]}>Language</Text>
        <View style={[styles.flexRow, { padding: 10, marginRight: "auto" }]}>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#b264be", margin: 10 }]}><Text style={[styles.text2, styles.textBold, { textAlign: "center" }]} >ENGLISH</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#b264be", margin: 10 }]}><Text style={[styles.text2, styles.textBold, { textAlign: "center" }]} >BANGALI</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#b264be", margin: 10 }]}><Text style={[styles.text2, styles.textBold, { textAlign: "center" }]} >HINDI</Text></TouchableOpacity>
        </View>
        <View style={[styles.flexRow, { padding: 10, marginRight: "auto" }]}>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#2e63e8", margin: 10, width: 120 }]}><View style={[styles.flexRow, { justifyContent: "center" }]}>
            <Icon name="phone" size={20} color={"white"} /><Text style={[styles.text2, styles.textBold, { textAlign: "center", marginLeft: 5 }]} >Call</Text></View>
            <Text style={[styles.text2, styles.textBold, { textAlign: "center" }]} >10/min</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#2e63e8", margin: 10, width: 120 }]}><View style={[styles.flexRow, { justifyContent: "center", marginLeft: 5 }]}>
            <Icon3 name="message1" size={20} color={"white"} /><Text style={[styles.text2, styles.textBold, { textAlign: "center" }]} >CHAT</Text></View><Text style={[styles.text2, styles.textBold, { textAlign: "center" }]}>10 for 20 msg</Text></TouchableOpacity>
        </View>
      </View>
      <Text>Profile</Text>
    </View>
  )
}

export default Expertprofile