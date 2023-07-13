import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OptionBox = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const options = [
    { id: 1, text: 'Random Text 1' },
    { id: 2, text: 'Random Text 2' },
    { id: 3, text: 'Random Text 3' },
    { id: 4, text: 'Random Text 4' },
    { id: 5, text: 'Random Text 5' },
    { id: 6, text: 'Random Text 6' },
    { id: 7, text: 'Random Text 7' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.option, selectedOptions.includes(option.id) && styles.selectedOption]}
          onPress={() => handleOptionSelect(option.id)}
        >
          {selectedOptions.includes(option.id) && (
            <MaterialCommunityIcons name="check-circle" size={24} color="green" style={styles.icon} />
          )}
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#e6f2ff',
    borderColor: '#3399ff',
  },
  icon: {
    marginRight: 5,
  },
  optionText: {
    fontSize: 16,
  },
  box:{
    height:20,
    width:20
  }
});

export default OptionBox;
