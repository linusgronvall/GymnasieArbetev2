import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import TextPost from '../../posts/TextPost';
import { auth, db } from '../../../firebase/firebase';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
  collectionGroup,
  query,
  where,
  docs,
} from 'firebase/firestore';
import { COLORS } from '../../../assets/colors';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const LikedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  });

  const getLikedPosts = async () => {
    setPosts([]);
    const followingQ = query(
      collection(db, 'users', auth.currentUser.email, 'likedPosts')
    );

    const usersIds = await getDocs(followingQ);
    usersIds.forEach(async (doc) => {
      const q = query(
        collection(db, 'posts'),
        where('uid', '==', doc.data().uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPosts(querySnapshot.docs.map((doc) => doc.data()));
      });
    });
  };

  useEffect(() => {
    getLikedPosts();
  }, []);

  useEffect(() => {
    if (refreshing === false) getLikedPosts();
  }, [refreshing]);

  if (posts) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            automaticallyAdjustContentInsets: true,
          }}
          style={styles.feed}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.secondary}
            />
          }
        >
          <SafeAreaView>
            {posts.map((post) => (
              <TextPost
                content={post?.text}
                image={post?.profilePicture}
                userName={post?.userName}
                name={post?.name}
                date={post?.date}
                key={post?.id}
                id={post?.id}
                uid={post?.uid}
                likeCount={post?.likeCount}
              />
            ))}
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    );
  }
  if (!posts) {
    // Fixa senare
    return (
      <SafeAreaView>
        <Text>No Posts</Text>
      </SafeAreaView>
    );
  }
};

export default LikedPosts;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  feed: { paddingVertical: 10 },
});
