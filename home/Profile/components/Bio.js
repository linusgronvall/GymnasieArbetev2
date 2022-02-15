import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../assets/colors';

const Bio = (props) => {
  const show = true;
  if (show) {
    return (
      <View style={styles.container}>
        <Text style={styles.bioText}>
          lkjdslkjadlkjaskldjsakljdlkajlkdjsalkj
        </Text>
      </View>
    );
  } else {
    return <View style={styles.container}></View>;
  }
};

export default Bio;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  bioText: { color: COLORS.primary, fontSize: 14 },

  iconContainer: { marginRight: 30 },
});
