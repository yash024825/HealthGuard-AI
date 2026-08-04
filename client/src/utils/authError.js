const FIREBASE_ERROR_MESSAGES = {
  "auth/email-already-in-use": "An account with this email already exists. Try signing in instead.",
  "auth/invalid-email": "That email address looks invalid.",
  "auth/weak-password": "Password is too weak. Try a longer or more complex password.",
  "auth/network-request-failed": "Network error reaching the sign-in service. Check your connection and try again.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/popup-blocked": "Your browser blocked the sign-in popup. Please allow popups and try again.",
  "auth/unauthorized-domain": "This domain isn't authorized for sign-in. Please contact support.",
};

export function getAuthErrorMessage(err, fallback) {
  const backendMessage = err?.response?.data?.message;
  if (backendMessage) return backendMessage;

  const code = err?.code;
  if (code) {
    return FIREBASE_ERROR_MESSAGES[code] || `${fallback} (${code})`;
  }

  return err?.message || fallback;
}