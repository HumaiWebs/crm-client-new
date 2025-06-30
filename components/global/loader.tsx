import React from "react";
import { BiLoader } from "react-icons/bi";

type LoaderProps = {
  message?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "text-xl", // ~20px
  md: "text-3xl", // ~30px
  lg: "text-5xl", // ~48px
};

export default function Loader({ message, size = "md" }: LoaderProps) {
  return (
    <div className="flex gap-4 items-center text-primary">
      <BiLoader
        className={`animate-spin text-indigo-900 ${sizeClasses[size]}`}
      />
      {message}
    </div>
  );
}
