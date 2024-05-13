"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, isAdmin } = useAuth();

  console.log();
  return (
    <div>
      {/* <SignUpPage />
      <Signin /> */}
      {user ? (
        <p>{user.email} 님 안녕하세요</p>
      ) : (
        <Link href="/signin">로그인</Link>
      )}
      {isAdmin ? <p>관리자입니다.</p> : <p>유저입니다.</p>}
      <Link href="/signup">회원가입</Link>
    </div>
  );
}
