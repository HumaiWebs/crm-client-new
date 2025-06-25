import React from "react";
import { Button as ShadCnButton } from "../ui/button";
import Loader from "./loader";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  loaderSize?: "sm" | "md" | "lg";
};

export default function Button({
  loading,
  children,
  loaderSize = "sm",
  ...props
}: ButtonProps) {
  return (
    <ShadCnButton
      disabled={loading || props.disabled}
      className={`disabled:bg-indigo-600/10 bg-indigo-600 hover:bg-indigo-600/80 cursor-pointer ${props.className ?? ""}`}
      {...props}
    >
      {loading ? <Loader size={loaderSize} /> : children}
    </ShadCnButton>
  );
}
