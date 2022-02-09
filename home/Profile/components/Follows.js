import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Follows = () => {
  return (
    <View>
      <View style={styles.follows}>
        <Text style={styles.text}>45 Followers</Text>
        <Text style={styles.text}>23 Following</Text>
      </View>
    </View>
  );
};

export default Follows;

const styles = StyleSheet.create({
  follows: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  text: { marginRight: 8, color: 'white', fontWeight: '600' },
});
