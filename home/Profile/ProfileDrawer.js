import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeScreen from '../Home/HomeScreen';
import EditScreen from './EditScreen';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { COLORS } from '../../assets/colors';

const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  const handleSignOut = () => {
    signOut(auth).catch((error) => {});
  };
  return (
    <Drawer.Navigator
      initialRouteName='Profile'
      screenOptions={{
        drawerActiveTintColor: COLORS.secondary,
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label='Log out' onPress={handleSignOut} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name='Profile'
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.secondary,
            height: 70,
            shadowColor: COLORS.secondary,
          },
          headerTitleStyle: {
            color: COLORS.secondary,
          },
          headerTintColor: COLORS.primary,
        }}
      />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;

const styles = StyleSheet.create({});
