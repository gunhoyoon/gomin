"use client";
import { loginUser } from "@/utils/firebase-config";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin: ChangeEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await loginUser(email, password);
      if (userCredential) {
        const user = userCredential.user;
        console.log(user.uid); // 사용자 UID 출력

        // ID 토큰 가져오기 및 쿠키에 저장
        const idToken = await user.getIdToken();
        console.log("idToken", idToken);
        document.cookie = `idToken=${idToken};max-age=3600;path=/;`;

        fetch("/api/setCustomClaims", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ uid: user.uid }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Custom claims set response:", data);
            // 여기서 추가적인 로직을 실행할 수 있습니다, 예를 들어 페이지 리디렉션:
            // window.location.href = "/dashboard";
            router.push("/");
          })
          .catch((error) => {
            console.error("Error setting custom claims:", error);
          });

        // 사용자 정보를 서버에서 조회
        // fetch(`/api/users?uid=${user.uid}`, {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${idToken}`, // 토큰을 사용하여 인증
        //     "Content-Type": "application/json",
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("User data retrieved:", data);
        //     // 로그인 성공 후 페이지 리디렉션
        //     // window.location.href = "/dashboard";
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching user data:", error);
        //   });
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
