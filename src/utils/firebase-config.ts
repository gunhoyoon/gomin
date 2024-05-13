// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
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
const db = getFirestore(app);
// export const registerUser = async (
//   email: string,
//   password: string,
//   additionalInfo
// ) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // 사용자의 추가 정보를 Firestore에 저장
//     await setDoc(doc(db, "users", user.uid), {
//       email: user.email,
//       ...additionalInfo, // 예: 이름, 주소 등
//     });

//     console.log("User created and data saved:", user);
//     return user;
//   } catch (error) {
//     console.error("Registration and data saving error:", error);
//     throw error;
//   }
// };
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
// const setupAuthPersistence = async () => {
//   try {
//     await setPersistence(auth, browserLocalPersistence);
//     console.log("Persistence set to local storage");
//   } catch (error) {
//     console.error("Setting persistence failed:", error);
//   }
// };

// // 사용자 로그인 함수
// export const loginUser = async (email: string, password: string) => {
//   try {
//     // 로컬 스토리지에 로그인 상태 저장 설정 적용
//     await setupAuthPersistence();

//     // 이메일과 비밀번호를 사용하여 로그인 시도
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     console.log("User logged in:", userCredential.user);
//   } catch (error) {
//     console.error("Login error:", error);
//   }
// };
// export const loginUser = async (email: string, password: string) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     console.log("User logged in:", userCredential.user);
//   } catch (error) {
//     console.error("Login error:", error);
//   }
// };
// export const loginUser = async (email: string, password: string) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // 사용자의 이메일을 기반으로 Firestore에서 해당 사용자의 추가 정보를 가져옵니다.
//     const userDocRef = doc(db, "users", user.uid);
//     const userDocSnapshot = await getDoc(userDocRef);

//     // 사용자의 추가 정보가 Firestore에 없으면 새 문서를 생성합니다.
//     if (!userDocSnapshot.exists()) {
//       await setDoc(userDocRef, { isAdmin: false }); // isAdmin을 기본값으로 설정합니다.
//       console.log("New user record created, isAdmin set to false");
//     }

//     // 사용자 문서에서 isAdmin 값을 다시 가져옵니다.
//     const updatedUserDocSnapshot = await getDoc(userDocRef);
//     const isAdmin = updatedUserDocSnapshot.data()?.isAdmin;

//     console.log("User logged in:", user);
//     console.log("isAdmin:", isAdmin);
//   } catch (error) {
//     console.error("Login error:", error);
//   }
// };
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
// export const loginUser = async (email: string, password: string) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // 사용자의 이메일을 기반으로 Firestore에서 해당 사용자의 추가 정보를 가져옵니다.
//     const userDocRef = doc(db, "users", user.uid);
//     const userDocSnapshot = await getDoc(userDocRef);

//     // 사용자가 관리자인 경우에만 isAdmin 필드를 추가 또는 업데이트합니다.
//     if (user.uid === process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID) {
//       await setDoc(userDocRef, { isAdmin: true }, { merge: true });
//       console.log("Admin privileges granted.");
//     }

//     if (!userDocSnapshot.exists()) {
//       await setDoc(userDocRef, { isAdmin: false }); // 기본적으로 isAdmin을 false로 설정합니다.
//       console.log("New user record created, isAdmin set to false");
//     }

//     const isAdmin = userDocSnapshot.data()?.isAdmin;
//     console.log("User logged in:", user);
//     console.log("isAdmin:", isAdmin);
//   } catch (error) {
//     console.error("Login error:", error);
//   }
// };

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
