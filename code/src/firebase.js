import firebase from "firebase";

/*Initialize app. Code provided from firebase*/
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCbdAclYwfaA6gKhwiO1X5AE0xkLDutNIY",
  authDomain: "projectvitality-f1d2c.firebaseapp.com",
  projectId: "projectvitality-f1d2c",
  storageBucket: "projectvitality-f1d2c.appspot.com",
  messagingSenderId: "680048131890",
  appId: "1:680048131890:web:6b65718e3bdab01bd1e12b",
  measurementId: "G-52Z3174VNW",
});

const db = firebaseApp.firestore(); /*access the db*/
const auth = firebase.auth(); /*for authentication, create users, login, logout*/
const storage = firebase.storage(); /* for uploading pictures to firebase and storing in db */

export { db, auth, storage };
