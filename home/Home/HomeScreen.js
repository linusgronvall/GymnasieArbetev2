import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import HomeFeedTest from './components/HomeFeedTest';
import Header from '../../components/Header';
import { COLORS } from '../../assets/colors';
import TopNavigator from '../Profile/components/TopNavigator';
import ContextProvider from './Provider';
import ProfileData from '../Profile/components/ProfileData';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ContextProvider>
        <ProfileData />
      </ContextProvider>
      <TopNavigator />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
