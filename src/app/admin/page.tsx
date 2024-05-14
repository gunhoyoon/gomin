"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  if (!isAdmin) {
    router.push("/");
  }
  return <div>관리자 권한으로 로그인하셨습니다.</div>;
}
