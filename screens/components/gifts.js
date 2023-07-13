import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import React from 'react';

const Gifts = () => {
  const numColumns = 5;
  const numRows = 3;
  const totalItems = numColumns * numRows;
  
  const renderGift = (index) => {
    return (
      <TouchableOpacity style={styles.itemContainer} key={index}>
        <Image
          style={styles.giftImage}
          source={require("../../assets/images/heart.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const renderGiftGrid = () => {
    const giftComponents = [];
    for (let i = 0; i < totalItems; i++) {
      giftComponents.push(renderGift(i));
    }
    return giftComponents;
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>{renderGiftGrid()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    width: '20%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftImage: {
    width: '80%',
    height: '80%',
  },
});

export default Gifts;
