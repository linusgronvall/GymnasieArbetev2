// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCfKlppcYp06Ozuf5ZdCMezVmZy-vE900I',
  authDomain: 'databasetest-dbef9.firebaseapp.com',
  projectId: 'databasetest-dbef9',
  storageBucket: 'databasetest-dbef9.appspot.com',
  messagingSenderId: '792572916823',
  appId: '1:792572916823:web:e00fd7d18025af1f07df12',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
