import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const EditScreen = () => {
  return (
    <View style={styles.container}>
      <Text>EditScreen</Text>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
