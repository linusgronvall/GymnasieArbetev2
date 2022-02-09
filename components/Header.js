import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../assets/colors';

const Header = ({ title, HEIGHT }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 80,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 20,
    color: COLORS.text,
    paddingBottom: 5,
  },
});
