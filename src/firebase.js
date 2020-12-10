import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBY-TwbQsLnrvWL1rxIThTz_uNNgqM25G0",
  authDomain: "netflix-yt-clone.firebaseapp.com",
  databaseURL: "https://netflix-yt-clone.firebaseio.com",
  projectId: "netflix-yt-clone",
  storageBucket: "netflix-yt-clone.appspot.com",
  messagingSenderId: "773896396165",
  appId: "1:773896396165:web:575767a5fc2da7dc9378ec",
  measurementId: "G-NLR4WFVQBB",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();


export { db, auth };
