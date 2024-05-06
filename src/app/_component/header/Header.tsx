import React from "react";
import { Signin } from "../signin/Signin";
import SignUpPage from "../signup/Signup";

export default function Header() {
  return (
    <div>
      <SignUpPage />
      <Signin />
    </div>
  );
}
