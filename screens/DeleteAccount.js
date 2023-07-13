import { View, Text, StyleSheet,TouchableOpacity, Button } from 'react-native'
import React,{useState} from 'react'
import OptionBox from './Options';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const DeleteAccount = () => {
    const [value,setValue]=useState();
    

  return (
    <View style={[styles.constainer]}>
<View style={{marginTop:40}}>  
    <Text style={{color:"#2e63e8",fontSize:22,fontWeight:"bold"}}>Permanentaly Delete Account</Text>
      <Text style={{color:"black",fontSize:18,textAlign:"justify",paddingTop:40}}>You won't be able to retrieve the chats and messages you've shared. Please tell us the reason before final good bye.</Text></View>

      <View style={styles.flex}><TouchableOpacity onPress={()=>setValue('notgetreply')} style={[styles.box,{}]}><Text>{ value==="notgetreply"&&<MaterialCommunityIcons name="check" size={20} color="green" />}</Text></TouchableOpacity><Text>Not Getting Replies</Text></View>
      <View style={styles.flex}><TouchableOpacity onPress={()=>setValue('notlike')} style={[styles.box,{}]}><Text>{ value==="notlike"&&<MaterialCommunityIcons name="check" size={20} color="green" />}</Text></TouchableOpacity><Text>Do Not Like timePass App</Text></View>
      <View style={styles.flex}><TouchableOpacity onPress={()=>setValue('wantafreshstart')} style={[styles.box,{}]}><Text>{ value==="wantafreshstart"&&<MaterialCommunityIcons name="check" size={20} color="green" />}</Text></TouchableOpacity><Text>Want a fresh start</Text></View>
      <View style={styles.flex}><TouchableOpacity onPress={()=>setValue('takingbreak')} style={[styles.box,{}]}><Text>{ value==="takingbreak"&&<MaterialCommunityIcons name="check" size={20} color="green" />}</Text></TouchableOpacity><Text>Taking break, will come back</Text></View>
      <View style={styles.flex}><TouchableOpacity onPress={()=>setValue('spendingtoomuchtime')} style={[styles.box,{}]}><Text>{ value==="spendingtoomuchtime"&&<MaterialCommunityIcons name="check" size={20} color="green" />}</Text></TouchableOpacity><Text>spending too much time on FRND app</Text></View>
      <View style={styles.flex}><TouchableOpacity onPress={()=>setValue('others')} style={[styles.box,{}]}><Text>{ value==="others"&&<MaterialCommunityIcons name="check" size={20} color="green" />}</Text></TouchableOpacity><Text>others</Text></View>
      
    </View>
  )
}
const styles= StyleSheet.create({
    constainer:{
        padding:20,
        flex:1,
        
        alignItems:"center"
    },
    box:{
        height:20,
        width:20,
        borderRadius:3,
        marginRight:20,
        borderWidth:1,
        borderColor:"black"
    },
    flex:{
        marginTop:30,
        flexDirection:"row",

        marginRight:"auto",
        marginLeft:30,
       

    }
})

export default DeleteAccount