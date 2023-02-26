import React, { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
export const AuthContext = createContext();
const auth = getAuth(app);

const UseContext = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // firebase handel
  // signup account
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // signup account
  // updateName
  const updateUser = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  // updateName
  // email Verification
  const verificationEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };
  // email Verification
  // LogOut
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("token");
    return signOut(auth);
  };
  // LogOut
  // signIn
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // signIn
  // googleLogin
  const googleProvider = new GoogleAuthProvider();
  const google = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // googleLogin
  // onstateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);
  // onstateChange
  // firebase handel
  const authInfo = {
    setToggle,
    toggle,
    loading,
    setLoading,
    user,
    register,
    updateUser,
    verificationEmail,
    logOut,
    logIn,
    google,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UseContext;
