import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onIdTokenChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

import axios from "axios";
 // simple axios instance

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Firebase user
  const [dbUser, setDbUser] = useState(null);  // MongoDB user
  const [loading, setLoading] = useState(true);
 

  const googleProvider = new GoogleAuthProvider();

  // Google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Email/Password login
  const emailLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Register new user
  const register = async (email, password, name, profileLink) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: name,
      photoURL: profileLink || null,
    });

    setUser({ ...result.user, displayName: name, photoURL: profileLink || null });
    return result.user;
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Track Firebase token
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const token = await currentUser.getIdToken(true);
          localStorage.setItem("access-token", token);
          setUser(currentUser);
        } else {
          localStorage.removeItem("access-token");
          setUser(null);
          setDbUser(null);
        }
      } catch (err) {
        console.error("❌ Token error:", err);
        setUser(null);
        setDbUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch MongoDB user (only after Firebase login)
   useEffect(() => {
    const fetchDbUser = async () => {
      if (user?.email) {
        try {
          const token = localStorage.getItem("access-token");
          const res = await axios.get(
            `http://localhost:3000/users/${encodeURIComponent(user.email)}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setDbUser(res.data);
        } catch (err) {
          console.error("❌ Failed to fetch DB user:", err);
          setDbUser(null);
        }
      } else {
        setDbUser(null);
      }
    };

    fetchDbUser();
  }, [user]);


  const info = {
    user,
    dbUser,
    loading,
    googleLogin,
    emailLogin,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={info}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
