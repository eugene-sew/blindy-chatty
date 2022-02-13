import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBZ3qPoXfdzxyudcZubWb3A8BeZDLNTitA",
  authDomain: "blindychatty.firebaseapp.com",
  projectId: "blindychatty",
  storageBucket: "blindychatty.appspot.com",
  messagingSenderId: "68123871852",
  appId: "1:68123871852:web:9bcbfbbe07db57c9fa2649",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { auth, db, firebase, storage };
