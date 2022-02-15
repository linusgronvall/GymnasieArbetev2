import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../../firebase/firebase';

import DeletePost from './DeletePost';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

const TextPost = ({
  content,
  image,
  userName,
  name,
  date,
  id,
  uid,
  likeCount,
}) => {
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
          <LikeButton likeCount={likeCount} uid={uid} id={id} />
          <CommentButton />
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
});
