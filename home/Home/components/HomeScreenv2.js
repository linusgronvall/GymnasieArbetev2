import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeTopNav from './HomeTopNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../../components/Header';

const HomeScreenv2 = () => {
  return (
    <SafeAreaProvider>
      <Header title={'Feed'} />
      <HomeTopNav />
    </SafeAreaProvider>
  );
};

export default HomeScreenv2;

const styles = StyleSheet.create({});
