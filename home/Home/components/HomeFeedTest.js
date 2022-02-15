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
  SectionList,
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
  updateDoc,
} from 'firebase/firestore';
import { COLORS } from '../../../assets/colors';
import Header from '../../../components/Header';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeFeedTest = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  });

  // const getPosts = async () => {
  //   const docRef = doc(db, auth.currentUser.email, 'following');
  //   const userPosts = query(collection(db, 'posts'));

  //   const querySnapshot = await getDocs(userPosts);
  //   querySnapshot.forEach((doc) => {
  //     setPosts(querySnapshot.docs.map((doc) => doc.data()));
  //   });
  // };

  const getPosts = async () => {
    setPosts([]);
    const q = query(collection(db, 'posts'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setPosts(querySnapshot.docs.map((doc) => doc.data()));
      });
    });
  };

  const quickFix = async () => {
    const userRef = doc(db, 'users', auth.currentUser.email);
    await updateDoc(userRef, {
      uid: auth.currentUser.uid,
    });
  };

  useEffect(() => {
    quickFix();
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
          <SafeAreaView style={{}}>
            {/* {console.log('posts from jsx home', posts)} */}

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
  } else {
    return (
      <View style={styles.container}>
        <Text>No posts available</Text>
      </View>
    );
  }
};

export default HomeFeedTest;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  feed: {
    paddingTop: 5,
  },
});
