import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const MessageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
