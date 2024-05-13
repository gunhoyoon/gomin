"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/utils/firebase-config";

// AuthContext 생성
interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = getAuth(app); // 이미 초기화된 Firebase 앱에서 Auth 인스턴스 가져오기
  // 이 부분은 firebase-config.ts (클라이언트 측 초기화 한 부분의 app을 가지고 있어야하고 이 부분은 공용으로 사용하기 때문에 import해서 사용)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        setUser(user);
        setIsAdmin(!!idTokenResult.claims.isAdmin); // 관리자 권한 확인
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
