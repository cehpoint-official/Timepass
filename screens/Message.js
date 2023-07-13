import { View, Text,Image,ScrollView,StyleSheet,TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import  * as ImagePicker from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Message = () => {
  const navigation = useNavigation()
  
  const goto=()=>{
    navigation.navigate("Chat");
  }
  const gotoprofile=()=>{
    navigation.navigate("Profile")
  }
    const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9'];
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      };

      const messages = [
        {
          id: 1,
          avatar: require("../assets/images/avatar.png"),
          name: "Ravi",
          timestamp: "Tuesday, 4 July 2023 6:07 pm",
          hasRead: true
        },
        {
            id: 1,
            avatar: require("../assets/images/avatar.png"),
            name: "Ravi",
            timestamp: "Tuesday, 4 July 2023 6:07 pm",
            hasRead: true
          },
          {
            id: 1,
            avatar: require("../assets/images/avatar.png"),
            name: "Ravi",
            timestamp: "Tuesday, 4 July 2023 6:07 pm",
            hasRead: true
          },

          {
            id: 1,
            avatar: require("../assets/images/avatar.png"),
            name: "Ravi",
            timestamp: "Tuesday, 4 July 2023 6:07 pm",
            hasRead: true
          },
          {
            id: 1,
            avatar: require("../assets/images/avatar.png"),
            name: "Ravi",
            timestamp: "Tuesday, 4 July 2023 6:07 pm",
            hasRead: true
          },
          {
            id: 1,
            avatar: require("../assets/images/avatar.png"),
            name: "Ravi",
            timestamp: "Tuesday, 4 July 2023 6:07 pm",
            hasRead: true
          },
        // Add more message objects as needed
      ];
      const CircleIcon2 = ({ avatar, name, hasRead,timestamp,backgroundColor }) => {
        return (
          <TouchableOpacity onPress={goto} style={styles.box}>
            <View style={{ height: 70, width: 70, backgroundColor:backgroundColor, borderRadius: 45, justifyContent: "center", alignItems: "center", marginTop: 5, marginLeft: 10 }}>
              <Image style={{ height: 43, width: 40, marginBottom: 10 }} source={avatar} />
            </View>
            <View style={{ padding: 20, flexDirection: "column", justifyContent: "space-between" }}>
              <Text style={styles.text}>{name}</Text>
              <Text style={styles.text2}>{timestamp}</Text>
            </View>
            <View style={styles.box2}>
              <Icon name="check" size={20} color={hasRead ? "green" : "red"} />
            </View>
          </TouchableOpacity>
        );
      };
    const CircleIcon = ({ name ,backgroundColor }) => {
        return (
          <TouchableOpacity style={styles.iconContainer}>
           
           <View style={{ height: 70, width: 70, backgroundColor: backgroundColor, borderRadius: 45, justifyContent: "center", alignItems: "center", marginTop: 5, marginLeft: 10 }}>
           <Image style={{ height: 55, width: 55,  }} source={require("../assets/images/avatar2.png")} />
                </View>
            <Text style={styles.name}>{name}</Text>
          </TouchableOpacity>
        );
      };
    const iconNames = ['Icon1', 'Icon2', 'Icon3', 'Icon4', 'Icon5'];
  return (
    <View style={{alignItems:"center",flex:1,backgroundColor:"rgba(255,255,255,.1)"}}>
   <View style={{justifyContent:"space-between",flexDirection:"row",width:"100%"}}>
   <TouchableOpacity onPress={gotoprofile} style={{width:70,height:70,borderRadius:35,backgroundColor:"white",justifyContent:"center",alignItems:"center",margin:10}}>
     
     <Image style={{width:45,height:45}} source={require("../assets/images/avatar.png")}/>

     </TouchableOpacity>
     <View style={{marginTop:20}}><Icon name="search" size={45} color="#2ec3ed"/></View></View>
   <ScrollView horizontal contentContainerStyle={styles.container}>
      {iconNames.map((name, index) => (
        <CircleIcon key={index} name={name}  backgroundColor={getRandomColor()} />
      ))}
    </ScrollView>
   
   
      {/* Other components */}
      <ScrollView>
        {messages.map((message) => (
          <CircleIcon2
            key={message.id}
            avatar={message.avatar}
            name={message.name}
            timestamp={message.timestamp}
            hasRead={message.hasRead}
            backgroundColor={getRandomColor()}
          />
        ))}
      </ScrollView>
    
    </View>
  )
}

const styles = StyleSheet.create({
    box2: {

        width: 25,
        borderWidth:1,
        borderColor:"green",
        marginTop: 10,
        height: 25,
        borderRadius: 17,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginTop:30,
        marginLeft:30
    },
    text: {

        fontsize: 19,
        color: "black",
        fontWeight: "bold"
    },
    text2: {
        color: "black",
        fontSize: 11,
        opacity: .8
    },
    box: {
        width: windowWidth - 20,
        height: 85,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',

        borderRadius: 7,
        flexDirection: "row",

        marginTop: 20
    },
    flex: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"


    },
    container: {
        alignItems: 'center',
        paddingVertical: 20,
      },
      iconContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
      },
      circle: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: 'blue',
      },
      name: {
        marginTop: 10,
      },
    

})

export default Message