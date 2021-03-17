import firebase from "firebase";

// /*Initialize app. Code provided from firebase*/
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCGBKdeyMoSzjYhLWG-zEz7HEl14WLz2FA",
  authDomain: "project-vitality-918dd.firebaseapp.com",
  projectId: "project-vitality-918dd",
  storageBucket: "project-vitality-918dd.appspot.com",
  messagingSenderId: "451721068836",
  appId: "1:451721068836:web:595d8e7af54597648373b1",
  measurementId: "G-NGXRXQ72X3",
});

const db = firebaseApp.firestore(); /*access the db*/
const auth = firebase.auth(); /*for authentication, create users, login, logout*/
const storage = firebase.storage(); /* for uploading pictures to firebase and storing in db */

export { db, auth, storage };
