import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthStack from './auth/routes/AuthStack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeScreen from './home/Home/HomeScreen';
import HomeTabs from './home/routes/HomeTabs';
import { auth, db } from './firebase/firebase';
import LoadingScreen from './auth/screens/LoadingScreen';
import HomeStack from './home/routes/HomeStack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage']);
LogBox.ignoreAllLogs();
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    });
  }, []);

  if (loading === true) {
    return <LoadingScreen />;
  }
  if (currentUser && loading === false) {
    return (
      <View style={styles.container}>
        <HomeStack />
        <StatusBar style='auto' />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <AuthStack />
        <StatusBar style='light' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
