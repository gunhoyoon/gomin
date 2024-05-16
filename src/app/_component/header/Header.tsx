"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./header.module.css";
import { logout } from "@/utils/firebase-config";
export default function Header() {
  const { user, isAdmin } = useAuth();

  console.log();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerInner}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>
            <Link href={"/"}>
              <img src="/logo.png" alt="고민고민 로고" />
            </Link>
          </h1>
        </div>
        {isAdmin && <Link href={"/admin"}>Admin으로 이동</Link>}
        <div className={styles.signContainer}>
          {user ? (
            <p>{user.email} 님 안녕하세요</p>
          ) : (
            <Link href="/signin">로그인</Link>
          )}
          {user ? (
            <button className={styles.logoutButton} onClick={logout}>
              로그아웃
            </button>
          ) : (
            <Link href="/signup">회원가입</Link>
          )}
        </div>
      </div>
    </div>
  );
}
