"use client";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { userType, setUserType } = useAuth();
  // console.log("userType", userType === "");
  console.log("userType", userType);
  return <div>제발 ..{userType}</div>;
}
