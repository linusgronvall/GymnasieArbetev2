import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommentButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Ionicons color='grey' size={16} name='chatbox-outline' />
      <Text style={styles.actionButtonsNumbers}>0</Text>
    </TouchableOpacity>
  );
};

export default CommentButton;

const styles = StyleSheet.create({
  actionButtonsNumbers: {
    fontSize: 12,
    paddingLeft: 3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
