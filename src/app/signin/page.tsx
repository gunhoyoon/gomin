"use client";
import { loginUser, logout } from "@/utils/firebase-config";
import React, { ChangeEventHandler, useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin: ChangeEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await loginUser(email, password);
      if (userCredential) {
        const user = userCredential.user;
        console.log(user.uid); // 사용자 UID 출력

        // ID 토큰 가져오기 및 서버로 전송
        const idToken = await user.getIdToken();
        console.log("idToken", idToken);
        // idToken이 이미 있는데 이걸 서버에 굳이 보내서 해야되냐 결국 next middle ware에서 처리하려고 한건데..
        fetch("/api/setToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Token set in server", data);
            // 로그인 성공 후 페이지 리디렉션
            // window.location.href = "/dashboard";
          })
          .catch((error) => {
            console.error("Error setting token in server:", error);
          });
      }
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
      <div>
        {/* {userType === "admin"
          ? "관리자 등장"
          : userType === "user"
          ? "유저 등장"
          : "비로그인 등장"} */}
      </div>
    </div>
  );
}
