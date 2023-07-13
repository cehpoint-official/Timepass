import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import React from 'react'
import Splash from './screens/splash'
import Terms from './screens/Terms'
import Login from './screens/Login'
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import GroupCall from './screens/GroupCall'
import GroupCall2 from './screens/GroupCall2'
import Message from './screens/Message'
import ChatScreen from './screens/chatscreen'
import Coins from './screens/coins'
import VideoCall from './screens/VideoCall'
import SelectLanguage from "./screens/SelectLanguage"
import Expertprofile from './screens/Expertprofile'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import { useNavigation } from '@react-navigation/native';
import LanguagePicker from './screens/SelectLanguage'
import Register from './screens/Register'
import OtpAuthentication from './screens/OtpAuthentication'
import DeleteAcoount from './screens/DeleteAccount'
import DeleteAccount from './screens/DeleteAccount'
import CreatePage from './screens/CreatePage'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CustomTabBarIcon = ({ name, focused }) => (
  <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    <Icon2 name={name} size={24} color="white" />
  </View>
);
const CustomTabBarIcon2 = ({ name, focused }) => (
  <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    <Icon3 name={name} size={24} color="white" />
  </View>
);

const App = () => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="OtpAuthentication" component={OtpAuthentication} options={{ headerShown: false }} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="CreatePage" component={CreatePage} options={{ headerShown: false }} />
          <Stack.Screen name="Terms" component={Terms} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Coins" component={Coins} options={{ headerShown: false }} />
          <Stack.Screen name="VideoCall" component={VideoCall} options={{ headerShown: false }} />
          <Stack.Screen name="ExpertProfile" component={Expertprofile} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Language" component={LanguagePicker} options={{ headerShown: false }} />
          <Stack.Screen name="Setting" component={Settings} options={{ headerShown: false }} />
          <Stack.Screen name="Tabs" component={() => <TabNavigator />} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      headerBackground: "#ff679d", tabBarActiveBackgroundColor: "#ff679d", tabBarAccessibilityLabel: "#ff679d", tabBarStyle: {
        backgroundColor: "#ff679d",


      }
    }} >
      <Tab.Screen
        name="Home"
        component={Home}

        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon name={"home"} focused={focused} />
          ),
          tabBarLabel: "",
          headerShown: false,

        }}
      />
      <Tab.Screen
        name="Trainer"
        component={GroupCall}

        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon name={"check"} focused={focused} />
          ),
          tabBarLabel: "",
          headerShown: false,

        }}
      />
      <Tab.Screen
        name="Chats"
        component={Message}

        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon2 name={"message1"} focused={focused} />
          ),
          tabBarLabel: "",
          headerShown: false,

        }}
      />

      <Tab.Screen
        name="Settings"
        component={GroupCall2}

        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon name={"card-giftcard"} focused={focused} />
          ),
          tabBarLabel: "",
          headerShown: false,

        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    borderTopColor: 'transparent',
    backgroundColor: 'white',
  },
  tabIcon: {
    backgroundColor: 'transparent',
    borderRadius: 25,

    margin: 5,
  },
  tabIconFocused: {
    backgroundColor: 'black',
    width: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default App