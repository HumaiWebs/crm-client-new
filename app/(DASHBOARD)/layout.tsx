import DashbaordSectionHeader from "@/components/global/dashboard-section-header";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <section className="flex-1 bg-[#F5F5F5] flex flex-col">
        <DashbaordSectionHeader />
        <div className="flex-1 w-full h-max max-h-screen overflow-y-auto">{children}</div>
      </section>
    </main>
  );
}
