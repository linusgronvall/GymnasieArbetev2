import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';
import CurryImagePicker from './CurryImagePicker';

const PostScreen3 = () => {
  console.log(uuid.v4());

  return (
    <View>
      <CurryImagePicker />
    </View>
  );
};

export default PostScreen3;

const styles = StyleSheet.create({});
