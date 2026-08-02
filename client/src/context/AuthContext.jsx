import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import api from "../api/axios";

const AuthContext = createContext(null);

// Popup-based Google sign-in is unreliable on mobile browsers — popups get
// blocked outright, or silently fail under mobile Safari/Chrome's stricter
// third-party storage rules. Firebase's own guidance is to use a full-page
// redirect flow on mobile instead.
const isMobileDevice = () =>
  typeof navigator !== "undefined" &&
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

const POPUP_FALLBACK_CODES = new Set([
  "auth/popup-blocked",
  "auth/cancelled-popup-request",
  "auth/operation-not-supported-in-this-environment",
]);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Completes a redirect-based Google sign-in (the mobile fallback below).
    // No-op if the user didn't just arrive back from a redirect.
    getRedirectResult(auth)
      .then(async (result) => {
        if (!result) return;
        const res = await api.post("/auth/sync", {
          fullName: result.user.displayName,
        });
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Google redirect sign-in failed:", err);
      });

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
    if (isMobileDevice()) {
      // Page navigates away here. AuthProvider picks up the result via
      // getRedirectResult() above once the user is sent back.
      await signInWithRedirect(auth, googleProvider);
      return null;
    }

    try {
      const credential = await signInWithPopup(auth, googleProvider);
      const res = await api.post("/auth/sync", {
        fullName: credential.user.displayName,
      });
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      if (POPUP_FALLBACK_CODES.has(err.code)) {
        await signInWithRedirect(auth, googleProvider);
        return null;
      }
      throw err;
    }
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
