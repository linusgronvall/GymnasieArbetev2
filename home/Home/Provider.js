import React, { useState, useEffect, Children } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from './UserContext';
import { doc, getDoc, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import ProfileData from '../Profile/components/ProfileData';

const ContextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const getUser = async () => {
    // setPosts([]);
    const unsub = onSnapshot(
      doc(db, 'users', auth.currentUser.email),
      (doc) => {
        setData(doc.data());
      }
    );
  };

  useEffect(() => {
    getUser();
  }, []);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default ContextProvider;

const styles = StyleSheet.create({});
