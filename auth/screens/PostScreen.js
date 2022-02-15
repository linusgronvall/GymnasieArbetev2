import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { auth, db } from '../../firebase/firebase';
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  onSnapshot,
  documentId,
} from 'firebase/firestore';
import { COLORS } from '../../assets/colors';
import uuid from 'react-native-uuid';

const PostScreen = ({ navigation }) => {
  const [userInput, setUserInput] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getDate = () => {
    var nd = new Date();
    var i = nd.getMinutes();
    var h = nd.getHours();
    var d = nd.getDate();
    var m = nd.getMonth() + 1;
    var y = nd.getFullYear();

    var time = d + '/' + m + '-' + y + ' ' + h + ':' + i;
    console.log(time);
    return time;
  };

  useEffect(async () => {
    const docRef = doc(db, 'users', auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log('No such document!', docSnap.data);
    }
  }, []);

  // console.log(auth.currentUser.uid);
  console.log('Data from post', data?.uid);
  const postText = async () => {
    try {
      if (userInput.length < 1) {
        Alert.alert(
          'Invalid input!',
          'Your post must contain at least one character.',
          [{ text: 'OK' }]
        );
      } else {
        const docRef = doc(db, 'users', auth.currentUser.email);
        await addDoc(collection(db, 'posts'), {
          text: userInput,
          date: getDate(),
          userName: data?.userName,
          name: data?.name,
          profilePicture: data?.profilePicture,
          id: uuid.v4(),
          uid: auth.currentUser.uid,
          likeCount: 0,
        });
        console.log('Document written with ID: ', docRef.id);
        console.log('user input: ', userInput);
        console.log(auth.currentUser.uid);
        setSuccessful(true);
        setUserInput('');
        if (successful) {
          const timer = setTimeout(() => {
            console.log('Loading');
            setLoading(false);
            navigation.navigate('Home');
          }, 100);

          // Add loading bar
          return () => clearTimeout(timer);
        }
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={userInput}
        onChangeText={(text) => setUserInput(text)}
        autoCapitalize='none'
        keyboardType='default'
        returnKeyType='done'
      />
      <TouchableOpacity style={styles.button} onPress={postText}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  input: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
    width: 250,
    height: 40,
    marginBottom: 10,
  },
  button: {
    width: 100,
    height: 30,
    marginTop: 10,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: { color: 'white', fontWeight: '600' },
});
