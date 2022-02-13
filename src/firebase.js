import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAnalytics } from "firebase/analytics";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBZ3qPoXfdzxyudcZubWb3A8BeZDLNTitA",
  authDomain: "blindychatty.firebaseapp.com",
  databaseURL: "https://blindychatty-default-rtdb.firebaseio.com",
  projectId: "blindychatty",
  storageBucket: "blindychatty.appspot.com",
  messagingSenderId: "68123871852",
  appId: "1:68123871852:web:9bcbfbbe07db57c9fa2649",
  measurementId: "G-HDE0W18Z5T",
});

const analytics = getAnalytics(firebaseApp);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { auth, db, firebase, storage };
