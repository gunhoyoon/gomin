"use client";
import { registerUser } from "@/utils/firebase-config";
import React, { ChangeEventHandler, useState } from "react";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit: ChangeEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError(""); // 이전 에러 메시지 초기화
    try {
      const user = await registerUser(email, password);
      console.log("User registered:", user);
      // 회원가입 성공 후, 로그인 페이지로 리디렉트하거나 사용자에게 성공 메시지를 보여주는 로직을 추가할 수 있습니다.
    } catch (err: unknown) {
      if (err instanceof Error) {
        // 에러 타입이 Error 인스턴스인지 확인
        setError(err.message); // 에러 메시지를 상태에 저장하여 사용자에게 보여줍니다.
      } else {
        setError("An unknown error occurred"); // 일반적인 에러 메시지 처리
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignUpPage;
