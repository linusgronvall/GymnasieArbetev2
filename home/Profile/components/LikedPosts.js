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
} from 'firebase/firestore';
import { COLORS } from '../../../assets/colors';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const LikedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  });

  const getPosts = async () => {
    const docRef = await getDocs(
      collection(db, 'users', auth.currentUser.email, 'likedPosts')
    );

    setPosts(docRef.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (refreshing === false) getPosts();
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
                content={post?.content}
                image={post?.image}
                username={post?.userName}
                name={post?.name}
                date={post.date}
                key={post?.id}
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
        <Text>Looks like you haven't liked any posts yet...</Text>
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
