import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';

const DeletePost = (owner) => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, 'users', auth.currentUser.email), 'posts');
  };
  if (owner === true) {
    return (
      <View>
        <TouchableOpacity>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (owner === false) {
    <View>
      <TouchableOpacity>
        <Text>Follow</Text>
      </TouchableOpacity>
    </View>;
  }
};

export default DeletePost;

const styles = StyleSheet.create({});
