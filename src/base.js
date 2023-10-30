import firebase from "firebase/compat/app";
import { getFirestore, collection, addDoc, where, query, getDocs} from "firebase/firestore"
import "firebase/compat/auth";


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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// const firebaseConfig = {
//   apiKey: "AIzaSyBVDOvDKBfXnuPZfGH9nSTHLM38hoJ5F6o",
//   authDomain: "fbeg-375009.firebaseapp.com",
//   databaseURL: "https://fbeg-375009-default-rtdb.firebaseio.com",
//   projectId: "fbeg-375009",
//   storageBucket: "fbeg-375009.appspot.com",
//   messagingSenderId: "971831979037",
//   appId: "1:971831979037:web:2c3d089d2c4fc9f13beaf4"
// };


firebase.initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = firebase.auth();
export default firebase;

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
    const user = res.user;
    const userRef = collection(db, "users");
    const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
    if (result.empty) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    // alert(err.message);
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    alert(err.message);
  }
};

// const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const logout = () => {
//   auth.signOut();
// };
