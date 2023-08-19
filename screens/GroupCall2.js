import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React ,{useEffect, useRef, useState}from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import backgroundimage from '../assets/images/backgorund.jpg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';

const GroupCall2 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const data = {};
  const goto = () => {
    navigation.navigate('VideoCall');
  };
  const goto1 = () => {
    navigation.navigate('Profile');
  };

  return (
    <ImageBackground
      source={require('../assets/images/backgroundcristmas.png')}
      style={{width: '100%', height: '100%'}}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
        }}>
        <View style={[styles.flex, {justifyContent: 'space-between'}]}>
          <TouchableOpacity
            onPress={goto1}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <Image
              style={{width: 45, height: 45}}
              source={require('../assets/images/avatar.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
           style={{marginLeft:"auto",marginRight:5,marginTop:15}}>
           <Icon name="search" size={40} color="white"/>
           </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>setModalVisible(true)}
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'white',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
              marginTop: 15,
            }}>
            <Text
              style={{
                fontSize: 30,
                marginTop: -5,
                fontWeight: 'bold',
                color: 'blue',
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.flex, {marginTop: 30}]}>
          <Text
            style={{
              color: 'yellow',
              fontSize: 22,
              color: 'yellow',
              fontWeight: 'bold',
              marginLeft: '20%',
            }}>
            {' '}
            Make New Friends
          </Text>
          <View style={{marginRight: 30}}></View>
        </View>

        <ScrollView>
          <View style={styles.box}>
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: 'white',
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Image
                style={{height: 70, width: 70, marginBottom: 10}}
                source={require('../assets/images/avatar2.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Mahi Reddy</Text>
              <View style={styles.flex}>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
              </View>
            </View>
            <View style={styles.box3}>
              <TouchableOpacity onPress={goto}>
                <Text style={styles.text}>Join Room</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box}>
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: 'white',
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Image
                style={{height: 65, width: 55, marginBottom: 10}}
                source={require('../assets/images/avatar2.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Mahi Reddy</Text>
              <View style={styles.flex}>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
              </View>
            </View>
            <View style={styles.box3}>
              <TouchableOpacity onPress={goto}>
                <Text style={styles.text}>Join Room</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box}>
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: 'white',
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Image
                style={{height: 65, width: 55, marginBottom: 10}}
                source={require('../assets/images/avatar2.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Mahi Reddy</Text>
              <View style={styles.flex}>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
              </View>
            </View>
            <View style={styles.box3}>
              <TouchableOpacity onPress={goto}>
                <Text style={styles.text}>Join Room</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box}>
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: 'white',
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Image
                style={{height: 65, width: 55, marginBottom: 10}}
                source={require('../assets/images/avatar2.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Mahi Reddy</Text>
              <View style={styles.flex}>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
              </View>
            </View>
            <View style={styles.box3}>
              <TouchableOpacity onPress={goto}>
                <Text style={styles.text}>Join Room</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box}>
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: 'white',
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Image
                style={{height: 65, width: 55, marginBottom: 10}}
                source={require('../assets/images/avatar2.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Mahi Reddy</Text>
              <View style={styles.flex}>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
              </View>
            </View>
            <View style={styles.box3}>
              <TouchableOpacity onPress={goto}>
                <Text style={styles.text}>Join Room</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box}>
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: 'white',
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Image
                style={{height: 65, width: 55, marginBottom: 10}}
                source={require('../assets/images/avatar2.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Mahi Reddy</Text>
              <View style={styles.flex}>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
              </View>
            </View>
            <View style={styles.box3}>
              <TouchableOpacity onPress={goto}>
                <Text style={styles.text}>Join Room</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box}>
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: 'white',
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginLeft: 10,
              }}>
              <Image
                style={{height: 65, width: 55, marginBottom: 10}}
                source={require('../assets/images/avatar2.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Mahi Reddy</Text>
              <View style={styles.flex}>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={styles.circle}></ImageBackground>
              </View>
            </View>
            <View style={styles.box3}>
              <TouchableOpacity onPress={goto}>
                <Text style={styles.text}>Join Room</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{width:"100%",height:"100%",backgroundColor:"rgba(255,255,255,0.3)"}}>

          <View style={{height:200,
          width:"90%",
          marginLeft:20,
          borderRadius:20,
          marginTop:250,
          backgroundColor:"white",
          justifyContent:"center",
          alignItems:"center"
          }}>
          <TouchableOpacity style={{marginRight:10,marginLeft:"auto"}} onPress={()=>setModalVisible(false)}><Text style={{fontSize:20}}>X</Text></TouchableOpacity>
            <Text style={{color:"#ff679d",fontSize:20}}>Friends Making Expert</Text>
            <View style={{flexDirection:"row",marginTop:20}}>
            <View style={{flexDirection:"row",marginRight:20,justifyContent:"center"}}>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={[styles.circle,{height:30,width:30,borderRadius:15}]}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={[styles.circle,{height:30,width:30,borderRadius:15}]}></ImageBackground>
                <ImageBackground
                  source={require('../assets/images/hritik.jpg')}
                  style={[styles.circle,{height:30,width:30,borderRadius:15}]}></ImageBackground>
              </View>
              <Text>220 Experts Online</Text>
            </View>
            <View style={[styles.box3,{marginRight:"auto"}]}>
              <TouchableOpacity onPress={()=>setModalVisible(false)}>
                <Text style={styles.text}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </Modal>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: -5,

    overflow: 'hidden',
  },
  box2: {
    width: 60,
    marginTop: 10,
    height: 35,
    borderRadius: 17,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontsize: 19,
    color: 'white',
    fontWeight: 'bold',
  },
  text2: {
    color: 'white',
    fontSize: 11,
    opacity: 0.8,
  },
  box: {
    width: windowWidth - 20,
    height: 94,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',

    borderRadius: 15,
    flexDirection: 'row',

    marginTop: 20,
  },
  flex: {
    width: '100%',
    flexDirection: 'row',
  },
  box3: {
    width: 100,
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    marginLeft: 'auto',
    marginRight: 10,
    opacity: 0.7,
    marginTop: 30,
    justifyContent: 'center',
  },
});

export default GroupCall2;
