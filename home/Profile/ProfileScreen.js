import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import LoadingScreen from '../../auth/screens/LoadingScreen';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import PostFeed from './components/PostFeed';
import Follows from './components/Follows';
import Bio from './components/Bio';
import FollowButton from './components/FollowButton';
import { UserContext } from '../Home/UserContext';
import ProfileData from './components/ProfileData';
import ContextProvider from '../Home/Provider';
import { COLORS } from '../../assets/colors';
import LikedPosts from './components/LikedPosts';
import TopNavigator from './components/TopNavigator';

const ProfileScreen = () => {
  // const [data, setData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  if (loading) {
    return (
      <View style={styles.container}>
        <ContextProvider>
          <ProfileData />
        </ContextProvider>

        <LikedPosts />
      </View>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
