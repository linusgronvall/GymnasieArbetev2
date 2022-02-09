import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { auth, db } from '../../../firebase/firebase';
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  documentId,
  query,
  collectionGroup,
} from 'firebase/firestore';

const FollowButton = () => {
  // useEffect(async () => {
  //   const docRef = doc(db, 'users', auth.currentUser.email);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     setData(docSnap.data());
  //   } else {
  //     console.log('No such document!', docSnap.data);
  //   }
  // }, []);

  const handleFollow = async () => {
    const docRef = doc(db, 'users', auth.currentUser.email);
    await addDoc(collection(docRef, 'following'), {
      name: data?.name,
      userName: data?.userName,
      profilePicture: data?.profilePicture,
    });
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Text>Follow</Text>
    </TouchableOpacity>
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
