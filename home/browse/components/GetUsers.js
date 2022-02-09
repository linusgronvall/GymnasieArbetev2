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
import { UsersContext } from './UsersContext';
import UserListCard from './UserListCard';
import BrowseScreen from '../BrowseScreen';

const GetUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const userPosts = query(collectionGroup(db, 'users'));

    const querySnapshot = await getDocs(userPosts);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      setUsers(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <UsersContext.Provider value={users}>
      <BrowseScreen />
    </UsersContext.Provider>
  );
};

export default GetUsers;

const styles = StyleSheet.create({});
