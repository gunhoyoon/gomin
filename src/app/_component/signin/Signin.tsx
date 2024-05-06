"use client";
import { loginUser, logout } from "@/utils/firebase-config";
import React, { ChangeEventHandler, useState } from "react";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin: ChangeEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      console.log("Login successful", user);
      // 로그인 성공 후 로직, 예를 들면 페이지 리디렉션 등
    } catch (error) {
      console.error("Login failed:", error);
      // 사용자에게 로그인 실패를 알림
    }
  };
  const handleEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <fieldset>
        <legend>로그인하기</legend>
        <form action="submit" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleEmail} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handlePassword} />
          <button type="submit">로그인</button>
        </form>
      </fieldset>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};
