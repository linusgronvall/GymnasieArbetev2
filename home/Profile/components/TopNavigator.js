import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostFeed from './PostFeed';
import LikedPosts from './LikedPosts';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from '../../../assets/colors';

const Tab = createMaterialTopTabNavigator();

const TopNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Posts'
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {},
        tabBarIndicatorStyle: { backgroundColor: COLORS.secondary },
      }}
    >
      <Tab.Screen name='Posts' component={PostFeed} />
      <Tab.Screen name='Liked Posts' component={LikedPosts} />
    </Tab.Navigator >
  );
};

export default TopNavigator;

const styles = StyleSheet.create({});
