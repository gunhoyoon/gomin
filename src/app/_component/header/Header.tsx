import React from "react";
import { Signin } from "../../signin/page";
import SignUpPage from "../../signup/page";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      {/* <SignUpPage />
      <Signin /> */}
      <Link href="/signin">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </div>
  );
}
