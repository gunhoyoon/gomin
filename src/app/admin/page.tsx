"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ListContainer from "./_component/ListContainer";

export default function AdminPage() {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  // console.log("isAdmin", isAdmin);
  // console.log("isLoading", isLoading);
  // 로딩 - 초기 true , user / isAdmin 에 관한 데이터가 다 들ㅇ어오고 나면 false, 그 전까지 대체 - Loading .. 스피너
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/signin"); // 로그인 페이지로 리다이렉트
      } else if (!isAdmin) {
        router.push("/"); // 권한이 없는 경우 다른 페이지로 리다이렉트
      }
    }
  }, [user, isAdmin, isLoading, router]);
  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 컴포넌트
  }
  // 사실 이 부분에서 상태를 관리안하면, 굳이 client로 만들 필요도 없음.
  // 리다이렉션 하는거 자체는 서버와 상관없이 브라우저에서만 시키면 되기 때문에, user는 어드민에 절대 접근을 못하게 하는거 그뿐인데.
  return (
    <div>
      {/* 관리자 권한으로 로그인하셨습니다. */}
      <ListContainer />
    </div>
  );
}

// 여기서 전체 리스트를 보여주는 ListContainer  - title만 뜰 수 있게
//
