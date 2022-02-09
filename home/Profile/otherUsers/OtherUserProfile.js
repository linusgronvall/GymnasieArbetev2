import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import UserListCard from '../../browse/components/UserListCard';
import Bio from '../components/Bio';
import Follows from '../components/Follows';

const OtherUserProfile = ({
  username,
  name,
  profilePicture,
  navigation,
  route,
}) => {
  const { data, user } = route.params;
  console.log(data);
  console.log(user);
  console.log('userName:', username);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity onPress={() => navigation.goBack('HomeTabs')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.userContainer}>
          <View style={styles.info}>
            <View style={styles.pictureFrame}>
              <Image
                source={{
                  uri: profilePicture,
                }}
                style={styles.profilePicture}
              />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.realName}>{name}</Text>
              <Text>@{username}</Text>
            </View>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <Follows />
          <Bio />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtherUserProfile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  inner: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  innerContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: 'black',
  },
  nameContainer: { marginLeft: 10 },
  realName: {
    fontSize: 15,
    fontWeight: '600',
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
  profileInfo: { borderBottomColor: 'black', borderBottomWidth: 0.2 },
});
