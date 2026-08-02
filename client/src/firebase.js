import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkmWgNR9w440uyxWCDY-1se8ZOG8V3_Zo",
  authDomain: "healthguard-ai-5cd24.firebaseapp.com",
  projectId: "healthguard-ai-5cd24",
  storageBucket: "healthguard-ai-5cd24.firebasestorage.app",
  messagingSenderId: "918109714505",
  appId: "1:918109714505:web:74132d90310d6f7521a798",
  measurementId: "G-EN0SG840EW"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;