"use client";
// components/Sidebar.tsx
import {
  LayoutDashboard,
  Users,
  Server,
  Globe,
  ShoppingCart,
  FileText,
  FolderKanban,
  LifeBuoy,
  Settings,
  UserCog,
  ShieldCheck,
  MessageCircle,
  ChevronsLeftRight,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Button from "./global/button";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  return (
    <header className="h-screen min-w-[300px] bg-gradient-to-b from-primary to-blue-700 text-white flex flex-col justify-between">
      <div>
        <div className="text-center py-6 text-2xl font-bold border-b border-secondary">
          HumAi CRM
        </div>

        <nav className="mt-4 px-4 space-y-1 text-sm font-medium">
          {/* MAIN */}
          <Section title="MAIN">
            <SidebarLink
              href="/dashboard"
              icon={<LayoutDashboard size={18} />}
              text="Dashboard"
            />
            <SidebarLink
              href="/clients"
              icon={<Users size={18} />}
              text="Clients"
            />
            <SidebarLink
              href="/employees"
              icon={<ShieldCheck size={18} />}
              text="Employees"
            />
          </Section>

          {/* SERVICES */}
          <Section title="SERVICES">
            <SidebarLink
              href="/domains"
              icon={<Globe size={18} />}
              text="Domains"
            />
            <SidebarLink
              href="/hosting"
              icon={<Server size={18} />}
              text="Hosting"
            />
            <SidebarLink
              href="/ecommerce"
              icon={<ShoppingCart size={18} />}
              text="E-Commerce Sites"
            />
          </Section>
 
          {/* BUSINESS */}
          <Section title="BUSINESS">
            <SidebarLink
              href="/invoices"
              icon={<FileText size={18} />}
              text="Invoices"
            />
            <SidebarLink
              href="/projects"
              icon={<FolderKanban size={18} />}
              text="Projects"
            />
            <SidebarLink
              href="/maintenance"
              icon={<ChevronsLeftRight size={18} />}
              text="Maintenance"
            />
            <SidebarLink
              href="/tickets"
              icon={<LifeBuoy size={18} />}
        
              text="Support Tickets"
            />
          </Section>

          {/* MANAGEMENT */}
          <Section title="MANAGEMENT">
            <SidebarLink
              href="/team"
              icon={<UserCog size={18} />}
              text="Team"
            />
            <SidebarLink
              href="/settings"
              icon={<Settings size={18} />}
              text="Settings"
            />
            <SidebarLink
              href="/help"
              icon={<LifeBuoy size={18} />}
              text="Help & Support"
            />
            <Button
              className="flex gap-4 items-center"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                router.push("/auth/login");
              }}
            >
              Logout
            </Button>
          </Section>
        </nav>
      </div>

      <div className="text-center py-4 text-xs text-blue-300">
        © 2025 HumAi CRM Inc.
      </div>
    </header>
  );
};

const SidebarLink = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-secondary transition"
  >
    {icon}
    {text}
  </Link>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-4">
    <p className="text-xs text-blue-300 px-3 mb-1 uppercase tracking-wider">
      {title}
    </p>
    <div className="space-y-1">{children}</div>
  </div>
);

export default Sidebar;
