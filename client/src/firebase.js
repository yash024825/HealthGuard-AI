import { initializeApp } from "firebase/app";
import { isSupported, getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// getAnalytics() throws synchronously in browsers/webviews where Firebase
// Analytics isn't supported (many mobile in-app browsers, privacy modes,
// or when a content/ad blocker kills the collection request). Calling it
// unguarded at module load can crash this entire module — including
// `auth` and `googleProvider` below — before the app ever renders, which
// breaks login/signup on affected mobile browsers with no visible error.
// isSupported() checks first and we only initialize if it's safe to.
isSupported()
  .then((supported) => {
    if (supported) getAnalytics(app);
  })
  .catch(() => {
    // Analytics is a nice-to-have; never let it affect auth.
  });

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;