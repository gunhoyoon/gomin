"use client";

import { useAuth } from "@/context/AuthContext";
import { logout } from "@/utils/firebase-config";

// import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, isAdmin } = useAuth();
  console.log(user, isAdmin);

  // const { userType, setUserType } = useAuth();
  // console.log("userType", userType === "");
  // console.log("userType", userType);
  return (
    <>
      <div>제발 ..</div>
      <button onClick={logout}>로그아웃</button>
    </>
  );
}
