import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../../assets/colors';

const CurryImagePicker = ({ image, onImagePicked }) => {
  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      path: 'images',
      includeBase64: true,
    };
    await launchImageLibrary(options, callback);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image />
      </View>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text>Pick Image</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CurryImagePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    height: 150,
  },
  button: {
    margin: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
