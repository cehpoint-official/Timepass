import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native"

const OTPAuthentication = () => {
  const navigation = useNavigation();
  const gotohome = () => {
    navigation.navigate("Login")
  }
  const [otpDigits, setOTPDigits] = useState(['', '', '', '', '']);
  const otpInputRef = [];

  const handleOTPInputChange = (index, value) => {
    const newOTPDigits = [...otpDigits];
    newOTPDigits[index] = value;
    setOTPDigits(newOTPDigits);

    // Focus next input
    if (value && index < otpDigits.length - 1) {
      otpInputRef[index + 1].focus();
    }
  };

  const handleOTPInputKeyPress = (index, key) => {
    if (key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRef[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#c84c8b", "#845dd1"]} style={styles.gradient}>
        <Text style={styles.title}>OTP Authentication</Text>
        <Text style={styles.subtitle}>We sent a code to</Text>
        <Text style={styles.phoneNumber}>********62</Text>
        <Text style={styles.subtitle}>Please enter the OTP which has been sent to your phone</Text>
        <View style={styles.otpContainer}>
          {otpDigits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpInputRef[index] = ref)}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOTPInputChange(index, value)}
              onKeyPress={({ nativeEvent }) =>
                handleOTPInputKeyPress(index, nativeEvent.key)
              }
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
        <View style={{ marginLeft: "auto", marginRight: 45 }}>
          <TouchableOpacity>
            <Text style={{ fontSize: 16, color: 'white' }}>Resend</Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={gotohome} style={styles.doneButton}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Create My Account</Text>
          </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
  },
  otpContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: 55,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#B26AB4',
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  doneButton: {
    height: 55,
    width: '70%',
    backgroundColor: '#2e63e8',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default OTPAuthentication;
