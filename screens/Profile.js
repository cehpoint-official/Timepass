import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import styles from '../Appcss';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const Profile = () => {
  const navigation = useNavigation();

  // Handle back button press
  const handleGoBack = () => {
    navigation.goBack();
  };
  const expertprofile = () => {
    navigation.navigate('ExpertProfile');
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={[
          {
            backgroundColor: '#ff679d',
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            paddingLeft: 10,
          },
        ]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon2 name={'arrow-back-ios'} size={20} color="white" />
        </TouchableOpacity>
        <Text style={style1.title}>Profile</Text>
      </View>
      <View
        style={[
          {
            backgroundColor: 'rgba(0,0,0,0.1)',
            width: '97%',
            height: 150,
            borderRadius: 20,
            margin: 5,
            flexDirection: 'row',
          },
        ]}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
          }}>
          <Image
            style={{width: 45, height: 45}}
            source={require('../assets/images/avatar.png')}
          />
        </View>
        <View style={{marginTop: 30}}>
          <Text style={[styles.text1, styles.textBlack, {marginBottom: 6}]}>
            Hello User!
          </Text>
          <View style={[{flexDirection: 'row'}]}>
            <Icon name="phone" color="green" size={17} />
            <Text
              style={{
                color: 'green',
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 6,
              }}>
              Successfull calls 10
            </Text>
          </View>
          <View style={[{flexDirection: 'row'}]}>
            <Icon4 name="alert-circle-outline" color="#2e63e8" size={17} />
            <Text style={{color: '#2e63e8', fontSize: 15, fontWeight: 'bold'}}>
              Talktime 30 min
            </Text>
          </View>
          <TouchableOpacity style={style1.mypagebutton}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              My Page
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <LinearGradient
        colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']}
        style={{margin: 5, borderRadius: 10}}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity style={style1.lineargradient}>
          <View style={style1.icons}>
            <Image
              source={require('../assets/images/refer.png')}
              style={{height: 35, width: 35}}
            />
          </View>

          <Text style={style1.box}>Refer and Earn Coins</Text>
          <View style={{marginLeft: 'auto', marginRight: 10}}>
            <Icon2 name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']}
        style={{margin: 5, borderRadius: 10}}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity style={style1.lineargradient}>
          <View style={style1.icons}>
            <Icon name="group" size={25} color="#5abdf5" />
          </View>

          <Text style={style1.box}>Friends Making Room</Text>
          <View style={{marginLeft: 'auto', marginTop: 15, marginRight: 10}}>
            <Icon2 name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']}
        style={{margin: 5, borderRadius: 10}}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity style={style1.lineargradient}>
          <View style={style1.icons}>
            <Image source={require('../assets/images/privatecallIcon.png')} />
          </View>

          <Text style={style1.box}>Private Call</Text>
          <View style={{marginLeft: 'auto', marginTop: 15, marginRight: 10}}>
            <Icon2 name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']}
        style={{margin: 5, borderRadius: 10}}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity style={style1.lineargradient}>
          <View style={style1.icons}>
            <Image source={require('../assets/images/trophy.png')} />
          </View>

          <Text style={style1.box}>Get Awards</Text>
          <View style={{marginLeft: 'auto', marginTop: 15, marginRight: 10}}>
            <Icon2 name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']}
        style={{margin: 5, borderRadius: 10}}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Coins')}
          style={style1.lineargradient}>
          <View style={style1.icons}>
            <Icon4 name="hand-coin" size={25} color="gold" />
          </View>

          <Text style={style1.box}>Buy Coins</Text>
          <View style={{marginLeft: 'auto', marginTop: 15, marginRight: 10}}>
            <Icon2 name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']}
        style={{margin: 5, borderRadius: 10}}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity style={style1.lineargradient}>
          <View style={style1.icons}>
            <Image source={require('../assets/images/influcensor.png')} />
          </View>

          <Text style={style1.box}>Become Influencer</Text>
          <View style={{marginLeft: 'auto', marginTop: 15, marginRight: 10}}>
            <Icon2 name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']}
        style={{margin: 5, borderRadius: 10}}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={style1.lineargradient}>
          <View style={style1.icons}>
            <Icon name="cog" size={25} color="white" />
          </View>

          <Text style={style1.box}>Settings</Text>
          <Icon2
            name="arrow-forward-ios"
            size={20}
            color="white"
            style={{marginLeft: 'auto'}}
          />
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={['#ff679d', '#ff679d', 'rgba(255,255,255,0.1)']}
        style={{margin: 5, borderRadius: 10}}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity style={style1.lineargradient}>
          <View style={style1.icons}>
            <Iconicons name="card" size={25} color="#55e798" />
          </View>

          <Text style={style1.box}>Reedem Code</Text>
          <View style={{marginLeft: 'auto', marginTop: 15, marginRight: 10}}>
            <Icon2 name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
const style1 = StyleSheet.create({
  lineargradient: {
    height: 45,
    width: '98%',
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  box: {
    color: 'white',
    fontSize: 15.5,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  mypagebutton: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f63e5',
    borderRadius: 15,
    marginTop: 5,
  },
  icons: {
    height: 35,
    width: 35,
    marginRight: 15,
    marginTop: 8,
  },
});
export default Profile;
