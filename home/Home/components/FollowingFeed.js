import React, { useEffect, useState, useLayoutEffect } from 'react';
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
  query,
  where,
} from 'firebase/firestore';
import { COLORS } from '../../../assets/colors';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const FollowingFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  });

  const getFollowingPosts2 = async () => {
    const followingQ = query(
      collection(db, 'users', auth.currentUser.email, 'following')
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
    getFollowingPosts2();
  }, []);

  useEffect(() => {
    if (refreshing === false) getFollowingPosts2();
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
            {/* {console.log('posts from jsx', posts)} */}
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
  return (
    <View>
      <Text>Looks like you haven't liked any posts yet...</Text>
    </View>
  );
};

export default FollowingFeed;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  feed: { paddingVertical: 10 },
});
