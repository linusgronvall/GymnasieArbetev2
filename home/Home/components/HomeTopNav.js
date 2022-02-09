import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LikedPosts from '../../Profile/components/LikedPosts';
import { NavigationContainer } from '@react-navigation/native';
import HomeFeedTest from './HomeFeedTest';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../assets/colors';
import FollowingFeed from './FollowingFeed';

const Tab = createMaterialTopTabNavigator();

const HomeTopNav = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName='Posts'
      screenOptions={{
        tabBarStyle: { height: 40 },
        tabBarIndicatorStyle: { backgroundColor: COLORS.secondary },
      }}
    >
      <Tab.Screen name='Global' component={HomeFeedTest} />
      <Tab.Screen name='Following' component={FollowingFeed} />
    </Tab.Navigator>
  );
};

export default HomeTopNav;

const styles = StyleSheet.create({});
