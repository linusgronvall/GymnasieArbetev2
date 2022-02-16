import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  documentId,
  deleteDoc,
  where,
  query,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';

const LikeButton = ({ likeCount, id, uid }) => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const checkIfLike = async () => {
    const q = query(
      collection(db, 'users', auth.currentUser.email, 'likedPosts'),
      where('id', '==', id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(
          'Liked Posts',
          querySnapshot.docs.map((doc) => doc.data().id)
        );
        setLikedPosts(querySnapshot.docs.map((doc) => doc.data().id));
      });
    });
  };

  const handleLike = async () => {
    console.log('Temp', likedPosts);
    checkIfLike();
    if (likedPosts.includes(id)) {
      const q = query(
        collection(db, 'users', auth.currentUser.email, 'likedPosts'),
        where('id', '==', id)
      );
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      // decrement
      const q2 = query(collection(db, 'posts'), where('id', '==', id));
      const snapShot = await getDocs(q2);
      snapShot.forEach((doc) => {
        console.log(snapShot.docs.map((doc) => doc.data()));
        updateDoc(doc.ref, {
          likeCount: increment(-1),
        });
      });
      setHasLiked(false);
      const newLikes = [];
      setLikedPosts(newLikes);
    } else {
      // Add likedPosts in curUser

      const docRef = doc(db, 'users', auth.currentUser.email);
      await addDoc(collection(docRef, 'likedPosts'), {
        id: id,
        uid: uid,
      });
      setHasLiked(true);

      // Update original post likeCount
      const q = query(collection(db, 'posts'), where('id', '==', id));
      const snapShot = await getDocs(q);
      snapShot.forEach((doc) => {
        updateDoc(doc.ref, {
          likeCount: increment(1),
        });
      });
    }
  };

  useEffect(() => {
    checkIfLike();
  }, []);

  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
      <Ionicons
        color='grey'
        size={17}
        name={likedPosts.includes(id) ? 'heart' : 'heart-outline'} //
        onPress={handleLike}
      />
      <Text style={styles.actionButtonsNumbers}>{likeCount}</Text>
    </TouchableOpacity>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  actionButtonsNumbers: {
    fontSize: 12,
    paddingLeft: 3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
