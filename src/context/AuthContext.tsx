"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "@/utils/firebase-config";
type UserType = "user" | "admin" | ""; // UserType을 "user" 또는 "admin"으로 지정합니다.
type CookieContextType = {
  userType: UserType;
  setUserType: Dispatch<SetStateAction<UserType>>;
};

const AuthContext = createContext<CookieContextType>({
  userType: "",
  setUserType: () => {},
});

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [userType, setUserType] = useState<UserType>(""); // 초기 상태를 빈 문자열("") 대신에 UserType으로 지정합니다.

  // 사용자 유형을 확인하고 설정하는 함수
  const checkUserType = async () => {
    try {
      const auth = getAuth();
      console.log(auth.currentUser);
      const user = auth.currentUser;
      console.log("user", user);
      if (user) {
        // 사용자가 로그인한 경우에만 진행합니다.
        // 사용자의 UID를 가져옵니다.
        const uid = user.uid;
        console.log("uid", uid);
        const adminUid = "Luh29XnfGhdOyipgMlvBZxzKCB43"; // 관리자 uid
        if (uid === adminUid) {
          //   console.log("true");
          setUserType("admin");
        } else {
          //   console.log("false");
          setUserType("user");
        }
      } else {
        // 사용자가 로그인하지 않은 경우 userType을 초기화합니다.
        setUserType("");
      }
    } catch (error) {
      console.error("User type checking error:", error);
    }
  };

  // 초기 렌더링 시에 한 번만 사용자 유형을 확인합니다.
  useEffect(() => {
    // 초기화 되었는지 확인하고 필요하면 초기화 실행
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkUserType();
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};
