import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import axios from "axios"; 
import { auth } from "../firebase/firebase.init";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [dbUser, setDbUser] = useState(null); // MongoDB user
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // ✅ Google Login
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Email/Password Login
  const emailLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Register user & save name + photo in Firebase
  const register = async (email, password, name, profileLink) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // set displayName & photoURL
    await updateProfile(result.user, {
      displayName: name,
      photoURL: profileLink || null,
    });

    setUser({
      ...result.user,
      displayName: name,
      photoURL: profileLink || null,
    });

    return result.user;
  };

  // ✅ Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch MongoDB user when Firebase user is set
  useEffect(() => {
    const fetchDbUser = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(
            `/users/${user.email}`
          );
          setDbUser(res.data);
        } catch (err) {
          console.error("Failed to fetch DB user:", err);
        }
      } else {
        setDbUser(null);
      }
    };
    fetchDbUser();
  }, [user]);

  // ✅ Shared auth data/functions
  const info = {
    user, // Firebase user
    dbUser, // MongoDB user (with role)
    loading,
    googleLogin,
    emailLogin,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={info}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
