/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import auth from "../firebase/firebase.config"
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
  } from "firebase/auth";
  

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  //login with google

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    signInWithGoogle,
  };

  

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
