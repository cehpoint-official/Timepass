import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {

      navigation.navigate('Terms');
    }, 3000);

    return () => {

      clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient

        colors={['rgba(245,111,122,1)', 'rgba(113,125,253,1)']}
        style={styles.gradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Image source={require("../assets/images/image.png")} />
        {/* Content of your screen or splash screen */}
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
    justifyContent: "center",
    alignItems: "center"
  },

});
export default Splash;
