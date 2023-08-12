import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      console.log("idToken");
      const { idToken } = await GoogleSignin.signIn();
     
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
      await firebase.auth().signInWithCredential(googleCredential);
      console.log('💀💀💀💀💀💀🔥🔥🔥 Signed in with Google!');
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();
  const gotoTabs = () => {
    navigation.navigate('Tabs');
  };

  return (
    <ImageBackground
      source={require('../assets/images/loginbackground.png')}
      style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.button}
          onPress={signInWithGoogle}>
          <Icon2
            name="google"
            color="black"
            size={20}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.facebookButton]}
          onPress={gotoTabs}>
          <Icon2
            name="facebook"
            color="white"
            size={25}
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonText, styles.facebookButtonText]}>
            Login with Facebook
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>
      <TouchableOpacity onPress={gotoTabs} style={styles.iconContainer}>
        <Icon name="mobile-phone" size={35} color="white" />
        <Text style={styles.orText}>Login with phone</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white' }}>You are agreeing to our </Text>
        <Text style={{ color: 'blue' }}>Terms & Privacy Policy</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 350,
    backgroundColor: '#927cc8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  facebookButtonText: {
    color: 'white',
  },
  dividerLine: {
    width: 100,
    height: 1,
    backgroundColor: 'white',
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 180,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Login;
