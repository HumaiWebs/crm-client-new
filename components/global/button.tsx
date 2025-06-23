import React from "react";
import { Button as ShadCnButton } from "../ui/button";
import Loader from "./loader";

export default function Button({
  loading,
  children,
}: {
  loading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <ShadCnButton
      disabled={loading}
      className={`disabled:bg-indigo-600/10 bg-indigo-600 hover:bg-indigo-600/80 cursor-pointer`}
    >
      {loading ? <Loader /> : children}
    </ShadCnButton>
  );
}
