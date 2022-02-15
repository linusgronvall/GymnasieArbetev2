import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../../firebase/firebase';
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
import DeletePost from './DeletePost';

const TextPost = ({
  content,
  image,
  userName,
  name,
  date,
  id,
  uid,
  likeCount,
  userId,
  navigation,
}) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [exist, setExist] = useState(false);

  const getLikeState = async () => {
    const docRef = await getDocs(
      collection(db, 'users', auth.currentUser.email, 'likedPosts')
    );
    setPosts(docRef.docs.map((doc) => doc.data()));
  };

  const checkIfLike = async () => {
    const q = query(
      collection(db, 'users', auth.currentUser.email, 'likedPosts'),
      where('id', '==', id)
    );
    await getDocs(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          console.log('DOCC', doc.data());
        } else {
          setExist(false);
        }
        setExist(true);
      });
    });
  };

  // useEffect(() => {
  //   checkIfLike();
  // });

  const handleUpdateLike = async () => {
    checkIfLike;
    if (!exist) {
      console.log('liked');
      console.log(id, uid);

      // Add likedPosts in curUser
      const docRef = doc(db, 'users', auth.currentUser.email);
      await addDoc(collection(docRef, 'likedPosts'), {
        id: id,
        uid: uid,
      });

      // Update original post likeCount
      const q = query(collection(db, 'posts'), where('id', '==', id));
      const snapShot = await getDocs(q);
      snapShot.forEach((doc) => {
        updateDoc(doc.ref, {
          likeCount: increment(1),
        });
      });
    } else if (exist) {
      const quer = query(
        collection(db, 'users', auth.currentUser.email, 'likedPosts'),
        where('id', '==', id)
      );
      const snep = await getDocs(quer);
      snep.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      //decrement
      const q = query(collection(db, 'posts'), where('id', '==', id));
      const snapShot = await getDocs(q);
      snapShot.forEach((doc) => {
        console.log(snapShot.docs.map((doc) => doc.data()));
        updateDoc(doc.ref, {
          likeCount: increment(-1),
        });
      });
    }
    console.log(exist);
    checkIfLike();
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <TouchableOpacity style={styles.userInfo} activeOpacity={0.8}>
        <Image source={{ uri: image }} style={styles.profilePicture} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>@{userName}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{content}</Text>
      </View>
      <View style={styles.dateContainer}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button}>
            <Ionicons
              color='grey'
              size={17}
              name={posts.liked ? 'heart' : 'heart-outline'} //
              onPress={handleUpdateLike}
              // currentLikeState.state
            />
            <Text style={styles.actionButtonsNumbers}>{likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons color='grey' size={16} name='chatbox-outline' />
            <Text style={styles.actionButtonsNumbers}>0</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 20,
  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginRight: 10,
    marginLeft: -15,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 5,
  },
  username: { color: 'grey' },
  dateContainer: {
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '300',
  },
  actionButtons: {
    flexDirection: 'row',
    width: 75,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtonsNumbers: {
    fontSize: 12,
    paddingLeft: 3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
