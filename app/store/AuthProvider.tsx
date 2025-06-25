"use client";

import { TAuthContext, TUser } from "@/type";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { http } from "../config/axiosClient";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth should only be used inside AuthContext");
  return ctx;
};

http.interceptors.request.use((config) => {
  console.log(
    "adding auth token to axios instance",
    localStorage.getItem("token")
  );
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    // INFO: check if user has valid token if not logout
    console.log(error, " : ", error.status);
    if (error.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
      return error;
    }
    return error;
  }
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<TUser | null>(null);

  function login(token: string, user: TUser) {
    localStorage.setItem("token", token);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  useLayoutEffect(() => {
    const storedUserString = localStorage.getItem("user");
    const storeduser = storedUserString ? JSON.parse(storedUserString) : null;
    if (!storeduser && pathname !== "/auth/login") {
      router.push("/auth/login");
    }
  }, []);

  const values = {
    user,
    setUser,
    login,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
