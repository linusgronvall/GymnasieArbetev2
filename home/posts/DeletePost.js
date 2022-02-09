import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';

const DeletePost = () => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, 'users', auth.currentUser.email), 'posts');
  };

  return (
    <View>
      <TouchableOpacity onPress={''}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeletePost;

const styles = StyleSheet.create({});
