// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created and logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
    // 로그아웃 성공 후 필요한 로직을 추가할 수 있습니다.
    // 예를 들어, 사용자를 로그인 페이지로 리다이렉트 할 수 있습니다.
  } catch (error) {
    console.error("Logout failed", error);
    // 로그아웃 실패 시 에러 처리 로직을 추가할 수 있습니다.
  }
};
if (typeof window !== "undefined") {
  // 클라이언트 사이드에서만 Analytics 초기화
  const analytics = getAnalytics(app);
}
//사용자 앱 패턴 분석하는데 사용
export default app;
