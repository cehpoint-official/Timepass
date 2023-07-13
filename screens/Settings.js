import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  // Handle back button press
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ backgroundColor: "#ff679d", flexDirection: "row", height: 50, alignItems: "center", paddingLeft: 10 }]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon2 name={"arrow-back-ios"} size={20} color="white" />
        </TouchableOpacity>
        <Text style={style1.title}>Settings</Text></View>
      <LinearGradient colors={['#f8b1ca', '#2ec3ed']} style={{ height: 50, width: '98%', margin: 5, borderRadius: 5, flexDirection: "row" }} start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }} >
        <Text style={style1.box}>Permanentaly Delete Account</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('DeleteAccount')} style={{ marginLeft: "auto", marginTop: 15, marginRight: 10 }}><Icon2 name="arrow-forward-ios" size={20} color="white" /></TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#f8b1ca', '#2ec3ed']}
        style={{
          height: 50,
          width: '98%',
          margin: 5,
          borderRadius: 5,
          flexDirection: "row"
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }} >
        <Text style={style1.box}>Settings</Text>
        <View style={{ marginLeft: "auto", marginTop: 15, marginRight: 10 }}><Icon2 name="arrow-forward-ios" size={20} color="white" /></View>
      </LinearGradient>
    </View>
  )
}
Settings.navigationOptions = {
  headerStyle: {
    backgroundColor: 'pink',
  },
  headerTintColor: 'white',
};

const style1 = StyleSheet.create({
  box: {
    color: "white", marginLeft: 15, marginTop: 15, fontSize: 15.5, fontWeight: "bold"
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default Settings