import React, { useState, useEffect, Children } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from './UserContext';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import ProfileData from '../Profile/components/ProfileData';

const ContextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const docRef = doc(db, 'users', auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setData(docSnap.data());
    } else {
      console.log('No such document!', docSnap.data());
    }
  }, []);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default ContextProvider;

const styles = StyleSheet.create({});
