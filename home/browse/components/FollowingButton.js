import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
import { COLORS } from '../../../assets/colors';
import { auth, db } from '../../../firebase/firebase';

const FollowingButton = ({ uid }) => {
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

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
      setIsFollowing(false);
      const newFollowing = [];
      setFollowing(newFollowing);
    } else {
      const docRef = doc(db, 'users', auth.currentUser.email);
      await addDoc(collection(docRef, 'following'), {
        uid: uid,
      });
      setIsFollowing(true);
    }
  };

  useEffect(() => {
    checkForFollowing();
  }, []);

  if (following.includes(uid)) {
    return (
      <TouchableOpacity
        style={styles.followingButton}
        onPress={handleFollow}
        activeOpacity={0.8}
      >
        <Text style={styles.followingText}>Following</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.followButton}
        onPress={handleFollow}
        activeOpacity={0.8}
      >
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
    );
  }
};

export default FollowingButton;

const styles = StyleSheet.create({
  followButton: {
    backgroundColor: COLORS.secondary,
    width: 85,
    height: 27,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: COLORS.primary,
    width: 85,
    height: 27,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },

  followText: { color: COLORS.primary, fontWeight: '600' },
  followingText: { color: COLORS.secondary, fontWeight: '600' },
});
