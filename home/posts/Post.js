import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/colors';
import DeletePost from './DeletePost';

const TextPost = ({ content, image, userName, name, date }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: image }} style={styles.profilePicture} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>@{userName}</Text>
        </View>
        <View style={styles.deleteButton}>
          <DeletePost />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{content}</Text>
      </View>
      <View style={styles.dateContainer}>
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
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 10,
  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginRight: 10,
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
  contentContainer: {},
  contentText: {},
  deleteButton: {
    position: 'absolute',
    right: 0,
    height: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '300',
  },
});
