import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FetchInfo from '../data/FetchInfo';
import { auth, db } from '../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const docRef = doc(db, 'users', auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data);
      setLoading(false);
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!', docSnap.data);
    }
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>UserData</Text>
      </View>
    );
  }
};

export default UserData;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
