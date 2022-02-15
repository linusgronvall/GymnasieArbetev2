import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
import { auth, db } from '../../../firebase/firebase';
import { COLORS } from '../../../assets/colors';
import FollowingButton from './FollowingButton';

const UserListCard = ({ userName, name, profilePicture, uid }) => {
  const [following, setFollowing] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.pictureFrame}>
          <Image
            source={{
              uri: profilePicture,
            }}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text>{name}</Text>
          <Text>@{userName}</Text>
        </View>
      </View>
      <View style={styles.followButtonContainer}>
        <FollowingButton uid={uid} />
        {/* <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default UserListCard;

const styles = StyleSheet.create({
  container: {
    width: '93%',
    height: 70,
    margin: 10,
    padding: 5,
    flexDirection: 'row',
  },
  userInfo: {
    width: '50%',
    flexDirection: 'row',
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  pictureFrame: { justifyContent: 'center', alignItems: 'center' },
  profilePicture: { width: 45, height: 45, borderRadius: 100, marginRight: 5 },
  // followButton: {
  //   backgroundColor: COLORS.secondary,
  //   width: 55,
  //   height: 25,
  //   borderRadius: 5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // followText: { color: COLORS.white },
});
