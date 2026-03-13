
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJvHY0y6tRTyqPqhWQLs-IvO88aqAIlWA",
  authDomain: "spms-55c85.firebaseapp.com",
  projectId: "spms-55c85",
  storageBucket: "spms-55c85.firebasestorage.app",
  messagingSenderId: "274672869007",
  appId: "1:274672869007:web:5edad5d1bdc2b12a3d9afa",
  measurementId: "G-YX0FGYKZYC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
