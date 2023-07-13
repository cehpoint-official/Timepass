import { View, Text,TouchableOpacity,Image,StyleSheet,Dimensions } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Box = () => {
  return (
    <TouchableOpacity style={styles.box}>
    <View style={{ height: 80, width: 80, backgroundColor: "white", borderRadius: 45, justifyContent: "center", alignItems: "center", marginTop: 5, marginLeft: 10 }}>
    <Image style={{ height: 65, width: 55, marginBottom: 10 }} source={require("../../assets/images/avatar.png")} />
    </View>
    <View style={{ padding: 20, flexDirection: "column", justifyContent: "space-between" }}>
        <Text style={styles.text}>Ravi</Text>
        <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm
        </Text></View>
    <View style={styles.box2}>
        <Icon name={"phone"} size={20} color="green" />
        <Icon name={"attach-money"} size={20} color="gold" />
    </View>
</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    box2: {

        width: 60,
        marginTop: 10,
        height: 35,
        borderRadius: 17,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {

        fontsize: 19,
        color: "white",
        fontWeight: "bold"
    },
    text2: {
        color: "white",
        fontSize: 11,
        opacity: .8
    },
    box: {
        width: "100%",
        height: 94,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',

        borderRadius: 7,
        flexDirection: "row",

        marginTop: 20
    },
    flex: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"


    }

})


export default Box