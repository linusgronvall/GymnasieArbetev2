import React, { useState, useEffect, createContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import uuid from 'react-native-uuid';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../assets/colors';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const addUser = async () => {
    try {
      const docRef = await setDoc(doc(db, 'users', email), {
        name: name,
        userName: username,
        email: email,
        profilePicture:
          'https://i.pinimg.com/originals/63/9f/f2/639ff23f2fa0d07258f8d6290136d918.jpg',
        id: uuid.v4(),
      });
      console.log('Document written with ID: ', email);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('Created account with: ' + user.email);
      })
      .then(addUser())

      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text>Register</Text>
        <TextInput
          style={styles.input}
          placeholder='Name'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Username'
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.registerButton}>Register Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.toOtherScreen}> Log in</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// <FontAwesome5 name={'eye'} size={25} style={{ alignSelf: 'center' }} />;

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 30,
    padding: 5,
    margin: 10,
  },
  button: {
    height: 45,
    width: 200,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  registerButton: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
});
