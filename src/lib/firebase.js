import Firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
// import {seedDatabase} from '../seed'
//here is where I want to call the seed file only once

const config = {
  apiKey: "AIzaSyAk68W-O8iTJFUtq1gU1oxohV5d0fh1YgI",
  authDomain: "instagram-d65d1.firebaseapp.com",
  projectId: "instagram-d65d1",
  storageBucket: "instagram-d65d1.appspot.com",
  messagingSenderId: "765349212924",
  appId: "1:765349212924:web:17c77ba2ddd8375f651d79",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// console.log('firebase',firebase);
// seedDatabase(firebase);

export { firebase, FieldValue };