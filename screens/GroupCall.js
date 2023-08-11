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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import backgroundimage from '../assets/images/backgorund.jpg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {useNavigation} from '@react-navigation/native';

const GroupCall = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const data = {};

  const goto = () => {
    navigation.navigate('Profile');
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../assets/images/backgroundcristmas.png')}
      resizeMode="cover">
      <View style={{alignItems: 'center', flex: 1}}>
        <View style={styles.flex}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={goto}
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

            <TouchableOpacity style={{marginLeft: 'auto', marginRight: 10}} />
          </View>
          <TouchableOpacity
            style={{marginLeft: 'auto', marginRight: 5, marginTop: 21}}>
            <Icon name="search" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'white',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 30,
                marginBottom: 10,
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
              color: 'white',
              opacity: 0.5,
              fontSize: 17,
              color: 'white',
            }}>
            {' '}
            Private Call Exports
          </Text>
          <View style={{marginRight: 30}}>
            <Icon name={'filter-list'} size={20} color="yellow" />
          </View>
        </View>

        <ScrollView>
          <TouchableOpacity style={styles.box}>
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
                source={require('../assets/images/avatar.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Ravi</Text>
              <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm</Text>
            </View>
            <View style={styles.box2}>
              <Icon name={'phone'} size={20} color="green" />
              <Icon name={'attach-money'} size={20} color="gold" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
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
                source={require('../assets/images/avatar.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Ravi</Text>
              <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm</Text>
            </View>
            <View style={styles.box2}>
              <Icon name={'phone'} size={20} color="green" />
              <Icon name={'attach-money'} size={20} color="gold" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
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
                source={require('../assets/images/avatar.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Ravi</Text>
              <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm</Text>
            </View>
            <View style={styles.box2}>
              <Icon name={'phone'} size={20} color="green" />
              <Icon name={'attach-money'} size={20} color="gold" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
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
                source={require('../assets/images/avatar.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Ravi</Text>
              <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm</Text>
            </View>
            <View style={styles.box2}>
              <Icon name={'phone'} size={20} color="green" />
              <Icon name={'attach-money'} size={20} color="gold" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
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
                source={require('../assets/images/avatar.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Ravi</Text>
              <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm</Text>
            </View>
            <View style={styles.box2}>
              <Icon name={'phone'} size={20} color="green" />
              <Icon name={'attach-money'} size={20} color="gold" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
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
                source={require('../assets/images/avatar.png')}
              />
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Ravi</Text>
              <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm</Text>
            </View>
            <View style={styles.box2}>
              <Icon name={'phone'} size={20} color="green" />
              <Icon name={'attach-money'} size={20} color="gold" />
            </View>
          </TouchableOpacity>
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
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}>
          <View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{fontSize: 30, color: 'white', marginLeft: 'auto'}}>
                x
              </Text>
            </TouchableOpacity>
            <View>
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
                    source={require('../assets/images/avatar.png')}
                  />
                </View>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.text}>Ravi</Text>
                  <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('VideoCall')}
                  style={styles.box2}>
                  <Icon name={'phone'} size={20} color="green" />
                  <Icon name={'attach-money'} size={20} color="gold" />
                </TouchableOpacity>
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
                    source={require('../assets/images/avatar.png')}
                  />
                </View>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.text}>Ravi</Text>
                  <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('VideoCall')}
                  style={styles.box2}>
                  <Icon name={'phone'} size={20} color="green" />
                  <Icon name={'attach-money'} size={20} color="gold" />
                </TouchableOpacity>
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
                    source={require('../assets/images/avatar.png')}
                  />
                </View>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.text}>Ravi</Text>
                  <Text style={styles.text2}>Tuesday, 4 July 2023 6:07 pm</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('VideoCall')}
                  style={styles.box2}>
                  <Icon name={'phone'} size={20} color="green" />
                  <Icon name={'attach-money'} size={20} color="gold" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
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

    borderRadius: 7,
    flexDirection: 'row',

    marginTop: 20,
  },
  flex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GroupCall;
