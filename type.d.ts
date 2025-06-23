import React, { SetStateAction } from "react";

export type TAuthContext = {
  user: TUser | null;
  setUser: React.Dispatch<SetStateAction<TUser | null>>;
  login: (token: string, user: TUser) => void;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: TUserRole;
};

export type TUserRole = "admin" | "client";
