import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
  where,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase';
import FollowButton from './FollowButton';
import { COLORS } from '../../../assets/colors';

const UserListCard = ({ userName, name, profilePicture, uid }) => {
  const [following, setFollowing] = useState([]);

  const checkForFollowing = async () => {
    const q = query(
      collection(db, 'users', auth.currentUser.email, 'following'),
      where('uid', '==', uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(
          'Following',
          querySnapshot.docs.map((doc) => doc.data().uid)
        );
        setFollowing(querySnapshot.docs.map((doc) => doc.data().uid));
      });
    });
  };

  const handleFollow = async () => {
    console.log('FO', following);
    checkForFollowing();
    if (following.includes(uid)) {
      const q = query(
        collection(db, 'users', auth.currentUser.email, 'following'),
        where('uid', '==', uid)
      );
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      const newFollowing = [];
      setFollowing(newFollowing);
    } else {
      const docRef = doc(db, 'users', auth.currentUser.email);
      await addDoc(collection(docRef, 'following'), {
        uid: uid,
      });
    }
  };

  useEffect(() => {
    checkForFollowing();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.pictureFrame}>
          <Image
            source={{
              uri: profilePicture,
            }}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text>{name}</Text>
          <Text>@{userName}</Text>
        </View>
      </View>
      <View style={styles.followButtonContainer}>
        <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserListCard;

const styles = StyleSheet.create({
  container: {
    width: '93%',
    height: 70,
    margin: 10,
    padding: 5,
    flexDirection: 'row',
  },
  userInfo: {
    width: '50%',
    flexDirection: 'row',
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  pictureFrame: { justifyContent: 'center', alignItems: 'center' },
  profilePicture: { width: 45, height: 45, borderRadius: 100, marginRight: 5 },
  followButton: {
    backgroundColor: COLORS.secondary,
    width: 55,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followText: { color: COLORS.white },
});
