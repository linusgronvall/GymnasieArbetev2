import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { COLORS } from '../../assets/colors';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('Logged in with: ' + auth.currentUser.email);
      })
      .catch((error) => {
        Alert.alert('Something went wrong', error.message, [
          {
            text: 'Ok',
            style: 'cancel',
          },
          {
            text: 'Sign Up',
            onPress: () => {
              navigation.navigate('SignUp');
            },
          },
        ]);
        // alert(error.message);

        // ..
      });
  };

  const handleButton = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email + ' is logged in.');

        // https://firebase.google.com/docs/reference/js/firebase.User
      } else {
        console.log('Oops no one is logged in');
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogIn}>
          <Text style={styles.logInButton}>Login</Text>
        </TouchableOpacity>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={styles.toOtherScreen}> Create one</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleButton()}>
          <Text>Log current user</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
    width: 100,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  logInButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
