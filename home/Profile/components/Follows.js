import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { COLORS } from '../../../assets/colors';

const Follows = ({ followers, following, numPosts }) => {
  return (
    <View>
      <View style={styles.follows}>
        <View style={styles.container}>
          <Text style={styles.text}>{numPosts}</Text>
          <Text style={styles.text2}>Posts</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>{followers}</Text>
          <Text style={styles.text2}>Followers</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>{following}</Text>
          <Text style={styles.text2}>Following</Text>
        </View>
      </View>
    </View>
  );
};

export default Follows;

const styles = StyleSheet.create({
  follows: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: { marginRight: 8, color: COLORS.primary, fontWeight: '600' },
  text2: { marginRight: 8, color: COLORS.primary, fontWeight: '500' },
});
