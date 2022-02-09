import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const FollowButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    width: 55,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
});
