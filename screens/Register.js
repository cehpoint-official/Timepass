import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const goto = () => {
    navigation.navigate("OtpAuthentication")
  }
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    // Implement your logic for handling language change here
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#c84c8b', '#845dd1']}
        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            flex: 1,
            width: '92%',
            height: '90%',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 30,
          }}
        >
          <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', textAlign:'center' }}>Welcome to {'\n'}Timepass</Text>
          <Text style={{ fontSize: 18, color: 'white', marginBottom: 80 }}>
            Add Your Personal Information
          </Text>
          <Text style={styles.label}>Nick name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            underlineColorAndroid="transparent"
          />
          <Text style={styles.label}>Phone number:</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Enter your mobile number"
            placeholderTextColor="rgba(255, 255, 255, 0.8)"
            underlineColorAndroid="transparent"
          />
          <Text style={styles.label}>Select Language:</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={handleLanguageChange}
            style={[styles.input, { borderRadius: 20 }]}
            itemStyle={{ borderRadius: 20 }}
          >
            <Picker.Item label="Select language" value="" />
            <Picker.Item label="Select language" value="" />
            <Picker.Item label="English" value="en" />
            <Picker.Item label="French" value="fr" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="German" value="de" />
            <Picker.Item label="Italian" value="it" />
            <Picker.Item label="Portuguese" value="pt" />
            <Picker.Item label="Russian" value="ru" />
            <Picker.Item label="Chinese" value="zh" />
            <Picker.Item label="Japanese" value="ja" />
            <Picker.Item label="Korean" value="ko" />
            <Picker.Item label="Arabic" value="ar" />
            <Picker.Item label="Hindi" value="hi" />
            <Picker.Item label="Bengali" value="bn" />
            <Picker.Item label="Turkish" value="tr" />
            <Picker.Item label="Dutch" value="nl" />
            {/* Add more language options as needed */}
          </Picker>

          <View style={styles.doneButton}>
            <TouchableOpacity onPress={goto}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    marginRight: 'auto',
    marginLeft: 20,
  },
  doneButton: {
    height: 50,
    width: '60%',
    backgroundColor: '#2e63e8',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  languageContainer: {
    width: '90%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: 'white',
  },
  inputAndroid: {
    fontSize: 16,
    color: 'white',
  },
});

export default Register;
