import DashbaordSectionHeader from "@/components/global/dashboard-section-header";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <section className="flex-1 bg-[#F5F5F5]">
        <DashbaordSectionHeader />
        {children}
      </section>
    </main>
  );
}
