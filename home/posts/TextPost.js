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
} from 'firebase/firestore';

const TextPost = ({ content, image, userName, name, date, id, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: 0,
  });

  const updateLikes = () => {};

  const getLikeState = async () => {
    const docRef = await getDocs(
      collection(db, 'users', auth.currentUser.email, 'likedPosts')
    );
    setPosts(docRef.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getLikeState;
  }, []);

  // Hitta i databasen where username === username alltså hitta den användaren som posten tillhör sen hämta rätt post.

  const handleUpdateLike = async () => {
    const docRef = doc(db, 'users', auth.currentUser.email);
    await addDoc(collection(docRef, 'likedPosts'), {
      content: content,
      image: image,
      userName: userName,
      name: name,
      date: date,
      id: id,
      liked: true,
    });
    setCurrentLikeState({
      state: !currentLikeState.state,
      counter: currentLikeState.counter + (currentLikeState.state ? -1 : 1),
    });
  };

  const getLikes = () => {};

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
              name={posts.liked ? 'heart' : 'heart-outline'}
              onPress={handleUpdateLike}
              // currentLikeState.state
            />
            <Text style={styles.actionButtonsNumbers}>
              {currentLikeState.counter}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons color='grey' size={16} name='chatbox-outline' />
            <Text style={styles.actionButtonsNumbers}>14</Text>
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
