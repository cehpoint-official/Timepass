import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = () => {
  const signInWithGoogle = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const navigation = useNavigation();
  const goto = () => {
    navigation.navigate('Tabs');
  };

  return (
    <>
      <ImageBackground
        source={require('../assets/images/loginbackground.png')}
        style={styles.container}>
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              signInWithGoogle()
                .then(() => {
                  console.log('💀💀💀💀💀💀🔥🔥🔥 Signed in with Google!');
                })
                .catch(error => {
                  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    console.log('User Cancelled the Login Flow');
                  } else if (error.code === statusCodes.IN_PROGRESS) {
                    console.log('Signing In');
                  } else if (
                    error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                  ) {
                    console.log('Play Services Not Available or Outdated');
                  } else {
                    console.log('Some Other Error Happened');
                  }
                });
            }}>
            <Icon2
              name="google"
              color={'black'}
              size={20}
              style={{marginRight: 10}}
            />
            <Text style={styles.buttonText1}>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.facebookButton]}
            onPress={goto}>
            <Icon2
              name="facebook"
              color={'white'}
              size={25}
              style={{marginRight: 10}}
            />
            <Text style={[styles.buttonText]}>Login with Facebook</Text>
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
          <Text style={[styles.orText]}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
        <TouchableOpacity onPress={goto} style={styles.iconContainer}>
          <Icon name="mobile-phone" size={35} color="white" />
          <Text style={[styles.orText]}>Login with phone</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>You are agreeing to our </Text>
          <Text style={{color: 'blue'}}>Terms & Privacy Policy</Text>
        </View>
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    width: 180,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    width: '80%',
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  facebookButtonText: {
    fontSize: 14,
  },

  saly: {
    marginTop: 30,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    paddingTop: 350,
    backgroundColor: '#927cc8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Login;
