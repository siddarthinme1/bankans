import React, { useEffect, useState } from "react";
import FirebaseContext from "./FirebaseContext";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, push, update } from "firebase/database";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyB8eN1XWvUnWjp7yEmPWAd5cEtAb6xkg-w",
  authDomain: "projectans-27605.firebaseapp.com",
  projectId: "projectans-27605",
  storageBucket: "projectans-27605.appspot.com",
  messagingSenderId: "897233567719",
  appId: "1:897233567719:web:8587a696538ad4d49e4742",
  measurementId: "G-PVTHGPRZ8M",
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);

const database = getDatabase(firebaseApp);

const firestore = getFirestore(firebaseApp);

const FirebaseContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
  }, []);

  const signInUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(database, key), data);
  const pushData = (key, data) => push(ref(database, key), data);
  const updateData = (key, data) => update(ref(database, key), data);

  const signUpWithGoogle = () => {
    return signInWithPopup(firebaseAuth, provider);
  };

  const signOutWithGoogle = () => {
    return signOut(firebaseAuth);
  };

  const value = {
    signInUserWithEmailAndPassword,
    signUpUserWithEmailAndPassword,
    putData,
    pushData,
    updateData,
    signUpWithGoogle,
    signOutWithGoogle,
    firebaseAuth,
    user,
    isLoggedIn,
    firestore,
    database,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
