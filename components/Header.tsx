// components/Header.tsx
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">CRM Dashboard</h1>
      <nav className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/users">Users</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </header>
  );
};

export default Header;
