"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  console.log(user, isAdmin);

  // const { userType, setUserType } = useAuth();
  // console.log("userType", userType === "");
  // console.log("userType", userType);
  return (
    <>
      <div>이 부분이 메인이 될거고 리스트 ? 가 생길거임</div>
    </>
  );
}
