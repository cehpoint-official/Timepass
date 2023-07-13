import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const Coins = () => {
  const navigattion = useNavigation();
  const boxesData = [
    { id: 1, coins: 200, price: 20, image: require('../assets/images/coin1.png') },
    { id: 2, coins: 200, price: 20, image: require('../assets/images/coin1.png') },
    { id: 3, coins: 200, price: 20, image: require('../assets/images/coin1.png') },
    { id: 3, coins: 200, price: 20, image: require('../assets/images/coin1.png') },
    { id: 3, coins: 200, price: 20, image: require('../assets/images/coin2.png') },
    { id: 3, coins: 200, price: 20, image: require('../assets/images/coin2.png') },
    { id: 3, coins: 200, price: 20, image: require('../assets/images/coin2.png') },
    { id: 3, coins: 200, price: 20, image: require('../assets/images/coin2.png') },
    { id: 3, coins: 200, price: 20, image: require('../assets/images/coin2.png') },
    { id: 3, coins: 200, price: 20, image: require('../assets/images/coin2.png') },
    // Add more data objects here for the remaining boxes
  ];
  const goto=()=>{
 navigattion.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goto}  style={styles.upperBox}>
        <Icon2 name={"arrow-back-ios"} size={20} color="white" />
        <Text style={styles.upperText}>Buy Coin</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          {boxesData.map((box) => (
            <LinearGradient colors={["#ad82e7","#ed96d1"]} style={styles.box} key={box.id}
             start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}>
              <Image source={box.image} style={styles.image} />
              <Text style={styles.text}>{box.coins} coins</Text>
              <Text style={[styles.text, { marginRight: 10 }]}>{box.price} rupees</Text>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>
      <View style={styles.emptyBox}>
        <Image style={{ width: 20, height: 20, marginTop: 5 }} source={require('../assets/images/coin1.png')} />
        <Text style={[styles.text, { fontSize: 20 }]}>
          10
        </Text></View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upperBox: {
    backgroundColor: '#1bd6ff',
    marginRight:"auto",
    marginLeft:10,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    height: 30,
    margin: 20,
    borderRadius: 10,
    width: 100
  },
  upperText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {

    width: '98%',
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: '#ad82e7',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 10

  },
  emptyBox: {
    position: 'absolute',
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    top: 10,
    right: 10,
    width: 55,
    borderRadius: 5,
    marginTop: 10,
    height: 30,
    backgroundColor: 'blue',
  },
});

export default Coins;
