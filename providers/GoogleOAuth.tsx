"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux/store";
import LoginSignup from "@/components/login/LoginSignup";

const GoogleOAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return <>{isAuthenticated ? children : <LoginSignup />}</>;
};

export default GoogleOAuth;
