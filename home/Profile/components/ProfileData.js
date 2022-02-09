import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../../Home/UserContext';
import Follows from '../components/Follows';
import Bio from '../components/Bio';
import FollowButton from '../components/FollowButton';
import { auth, db } from '../../../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { COLORS } from '../../../assets/colors';
import TextPost from '../../posts/TextPost';

const ProfileData = () => {
  const data = useContext(UserContext);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.userContainer}>
          <View style={styles.info}>
            <View style={styles.pictureFrame}>
              <Image
                source={{
                  uri: data?.profilePicture,
                }}
                style={styles.profilePicture}
              />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.realName}>{data?.name}</Text>
              <Text style={styles.userName}>@{data?.userName}</Text>
            </View>
          </View>
          <View style={styles.followButtonContainer}>
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.logOutButton}
            >
              <Text style={styles.logOutButtonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <Follows />
          <Bio />
        </View>
      </View>
    </View>
  );
};

export default ProfileData;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 175,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.secondary,
    // borderRadius: 15,
  },
  userContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
  },
  // pictureFrame: {
  //   backgroundColor: 'grey',
  //   width: 60,
  //   height: 60,
  //   borderRadius: 100,
  //   margin: 10,
  // },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginLeft: -5,
  },
  info: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: { marginLeft: 10, color: 'white' },
  realName: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  secondContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  followButtonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  profileInfo: {
    width: '100%',
    paddingBottom: 15,
    backgroundColor: COLORS.secondary,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    borderRadius: 15,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginTop: 0,
  },
  logOutButton: {
    backgroundColor: COLORS.secondary,
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  logOutButtonText: { color: 'white' },
  userName: {
    color: 'white',
    fontSize: 15,
  },
});
