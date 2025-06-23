"use client";

import { TAuthContext, TUser } from "@/type";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { http } from "../config/axiosClient";

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth should only be used inside AuthContext");
  return ctx;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<TUser | null>(null);

  function login(token: string, user: TUser) {
    localStorage.setItem("token", token);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  useLayoutEffect(() => {
    http.interceptors.request.use((config) => {
      config.headers.Authorization = localStorage.getItem("token");
      return config;
    });
  }, []);

  const values = {
    user,
    setUser,
    login,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
