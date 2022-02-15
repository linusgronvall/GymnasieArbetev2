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

  const getFollows = async () => {
    const q = query(
      collection(db, 'users', auth.currentUser.email, 'following')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(
          'USERS',
          querySnapshot.docs.map((doc) => doc.data().uid)
        );
        // setUsers(querySnapshot.docs.map((doc) => doc.data()));
        const q2 = query(
          collection(db, 'posts'),
          where(
            'uid',
            '==',
            querySnapshot.docs.map((doc) => doc.data().uid)
          )
        );
        const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log('apa');
            setPosts(querySnapshot.docs.map((doc) => doc.data()));
            console.log(
              'POSTS',
              querySnapshot.docs.map((doc) => doc.data().uid)
            );
          });
        });
      });
    });
  };

  const getFollowingPosts = async () => {
    const followingQ = query(
      collection(db, 'users', auth.currentUser.email, 'following')
    );

    const usersIds = await getDocs(followingQ);
    usersIds.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  };

  const getFollowingPosts2 = async () => {
    const followingQ = query(
      collection(db, 'users', auth.currentUser.email, 'following')
    );

    const usersIds = await getDocs(followingQ);
    usersIds.forEach(async (doc) => {
      console.log(doc.id, ' => ', doc.data());
      const q = query(
        collection(db, 'posts'),
        where('uid', '==', doc.data().uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        setPosts(querySnapshot.docs.map((doc) => doc.data()));
      });
    });
  };

  const getPosts2 = async () => {
    const q = query(
      collection(db, 'users', auth.currentUser.email, 'following'),
      where('uid', '==', uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setPosts(querySnapshot.docs.map((doc) => doc.data()));
        console.log(
          'POSTS',
          querySnapshot.docs.map((doc) => doc.data().uid)
        );
      });
    });
  };

  const getFollows2 = () => {
    const q2 = query(
      collection(db, 'posts'),
      where(
        'uid',
        '==',
        querySnapshot.docs.map((doc) => doc.data())
      )
    );
    const unsubscribe2 = onSnapshot(q2, (querySnapshot2) => {
      querySnapshot2.forEach((doc) => {
        console.log(
          'Posts:',
          querySnapshot2.docs.map((doc) => doc.data())
        );
        setPosts(querySnapshot2.docs.map((doc) => doc.data()));
      });
    });
  };

  useEffect(() => {
    getFollowingPosts2();
  }, []);

  useEffect(() => {
    if (refreshing === false);
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
