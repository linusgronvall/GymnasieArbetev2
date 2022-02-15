import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';
import OtherUserProfile from '../Profile/otherUsers/OtherUserProfile';
import TextPost from '../posts/TextPost';
import UserListCard from '../browse/components/UserListCard';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeTabs'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='HomeTabs' component={HomeTabs} />
        {/* <Stack.Screen name='NoShow' component={TextPost} /> */}
        {/* <Stack.Screen name='NoShow2' component={UserListCard} /> */}
        <Stack.Screen name='OtherUserProfile' component={OtherUserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
