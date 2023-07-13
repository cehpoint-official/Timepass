import React, { useState } from 'react';
import { View, Text } from 'react-native';
import * as RNPickerSelect from 'react-native-picker-select';

// Styles for the picker
const pickerStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
};

const LanguagePicker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    // Implement your logic for handling language change here
  };

  return (
    <View>
      <Text>Selected Language: {selectedLanguage}</Text>
      <RNPickerSelect
        onValueChange={handleLanguageChange}
        items={[
          { label: 'English', value: 'en' },
          { label: 'French', value: 'fr' },
          { label: 'Spanish', value: 'es' },
          // Add more language options as needed
        ]}
        style={pickerStyles}
      />
    </View>
  );
};

export default LanguagePicker;
