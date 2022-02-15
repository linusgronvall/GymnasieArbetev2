import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Home/HomeScreen';
import EditScreen from './EditScreen';
import ProfileDrawer from './ProfileDrawer';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeTabs'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Profile' component={ProfileDrawer} />
      <Stack.Screen name='EditProfile' component={EditScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({});
