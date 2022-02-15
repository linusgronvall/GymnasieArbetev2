import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../Home/HomeScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import PostScreen from '../../auth/screens/PostScreen';
import BrowseScreen from '../browse/BrowseScreen';
import MessageScreen from '../messages/MessageScreen';
import { COLORS } from '../../assets/colors';
import PostScreen2 from '../posts/PostScreen2';
import PostScreen3 from '../posts/PostScreen3';
import TopNavigator from '../Profile/components/TopNavigator';
import HomeTopNav from '../Home/components/HomeTopNav';
import HomeScreenv2 from '../Home/components/HomeScreenv2';
import ProfileStack from '../Profile/ProfileStack';
import ProfileDrawer from '../Profile/ProfileDrawer';

const Tab = createBottomTabNavigator();

const HomeTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Browse') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={30}
              color={COLORS.secondary}
              style={styles.tabIcons}
            />
          );
        },
        //   tabBarShowLabel: false,
        //   tabBarActiveTintColor: 'white',
        //   tabBarInactiveTintColor: 'gray',

        tabBarStyle: {},
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name='Home' component={HomeScreenv2} />
      <Tab.Screen name='Browse' component={BrowseScreen} />
      <Tab.Screen
        name='Post'
        component={PostScreen}
        options={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName = focused ? 'add-circle' : 'add-circle-outline';

            return (
              <Ionicons
                name={iconName}
                size={45}
                color={COLORS.secondary}
                style={styles.postIcon}
              />
            );
          },
        })}
      />

      <Tab.Screen name='Messages' component={MessageScreen} />
      <Tab.Screen name='Profile' component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({
  tabIcons: {
    position: 'absolute',
    top: 15,
  },
  postIcon: {
    position: 'absolute',
  },
});
