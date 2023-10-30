// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBcZwS5OfjWzKi6GbEtdT7ToYGOUjnRh50",
//   authDomain: "egplag.firebaseapp.com",
//   databaseURL: "https://egplag-default-rtdb.firebaseio.com",
//   projectId: "egplag",
//   storageBucket: "egplag.appspot.com",
//   messagingSenderId: "1079518635974",
//   appId: "1:1079518635974:web:02d5110075f82be082b4c7",
//   measurementId: "G-YXFR7DXHTQ"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyDknQNJca9m0r10c1jBz5s048a1jpPLCC8",
//   authDomain: "fir-data-d8ade.firebaseapp.com",
//   databaseURL: "https://fir-data-d8ade-default-rtdb.firebaseio.com",
//   projectId: "fir-data-d8ade",
//   storageBucket: "fir-data-d8ade.appspot.com",
//   messagingSenderId: "220088387374",
//   appId: "1:220088387374:web:7becab795ecd1ef76fdcbf"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBVDOvDKBfXnuPZfGH9nSTHLM38hoJ5F6o",
//   authDomain: "fbeg-375009.firebaseapp.com",
//   databaseURL: "https://fbeg-375009-default-rtdb.firebaseio.com",
//   projectId: "fbeg-375009",
//   storageBucket: "fbeg-375009.appspot.com",
//   messagingSenderId: "971831979037",
//   appId: "1:971831979037:web:2c3d089d2c4fc9f13beaf4"
// };


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmhsm90sIbjYlNFEKAb1EXN797oVt_xSs",
  authDomain: "spire-webapge-testing.firebaseapp.com",
  databaseURL: "https://spire-webapge-testing-default-rtdb.firebaseio.com",
  projectId: "spire-webapge-testing",
  storageBucket: "spire-webapge-testing.appspot.com",
  messagingSenderId: "348515691622",
  appId: "1:348515691622:web:b93ea848fb98e08c2a51a7",
  measurementId: "G-877PH5PWR5"
};
// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app); 
export default firebase;
