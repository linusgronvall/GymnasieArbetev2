import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
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
  query,
  collectionGroup,
} from 'firebase/firestore';
import UserListCard from './components/UserListCard';
import { UsersContext } from './components/UsersContext';
import { COLORS } from '../../assets/colors';
import Header from '../../components/Header';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const BrowseScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getUsers = async () => {
    setUsers([]);
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().uid);
        setUsers(querySnapshot.docs.map((doc) => doc.data()));
      });
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handlePress = () => {
    navigation.navigate('OtherUserProfile', {
      data: 'text',
      user: users?.userName,
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  });

  useEffect(() => {
    if (refreshing === false) getUsers();
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.title}>People to follow</Text>
      </SafeAreaView>
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
        <SafeAreaView style={styles.userList}>
          {users.map((user) => (
            <TouchableOpacity
              style={styles.listItem}
              activeOpacity={0.8}
              onPress={handlePress}
            >
              <UserListCard
                key={user?.uid}
                name={user?.name}
                userName={user?.userName}
                profilePicture={user?.profilePicture}
                uid={user?.uid}
              />
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default BrowseScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  userList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    marginVertical: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    shadowColor: COLORS.shadow,
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 85,
    shadowColor: COLORS.shadow,
    elevation: 10,
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 20,
    color: COLORS.text,
    paddingBottom: 10,
  },
  feed: {
    paddingTop: 10,
  },
});
