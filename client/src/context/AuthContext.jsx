import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fires on load, on login, on logout, and on token refresh.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    const res = await api.get("/auth/me");
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (
    fullName,
    email,
    password,
    phone,
    gender,
    dateOfBirth
  ) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: fullName });

    const res = await api.post("/auth/sync", {
      fullName,
      phone,
      gender,
      dateOfBirth,
    });

    setUser(res.data.user);
    return res.data.user;
  };

  const loginWithGoogle = async () => {
    const credential = await signInWithPopup(auth, googleProvider);

    const res = await api.post("/auth/sync", {
      fullName: credential.user.displayName,
    });

    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
}

export default AuthContext;