import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Bio = () => {
  return (
    <View>
      <Text style={styles.bioText}>
        I love coding and I am currently coding this app!
      </Text>
    </View>
  );
};

export default Bio;

const styles = StyleSheet.create({ bioText: { color: 'white' } });
