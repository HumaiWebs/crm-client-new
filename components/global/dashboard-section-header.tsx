"use client";

import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashbaordSectionHeader() {
  const pathname = usePathname();
  const heading = pathname
    .split("/")
    [pathname.split("/").length - 1].replaceAll("/", "")
    .replaceAll("-", " ");

  return (
    <div className="p-4 flex bg-white border-b border-gray-200 shadow-sm items-center">
      {" "}
      <div className="flex items-center gap-2 flex-1">
        <MenuIcon size={28} className="text-gray-600" />{" "}
        <h2 className="capitalize text-2xl text-secondary font-semibold">
          {heading.length > 0 ? heading : "Dashboard"}
        </h2>
      </div>
      <div className="flex pr-8 gap-2 items-center">
        <div className="w-[50px] h-[50px] rounded-full bg-slate-100"></div>
        <div>
          <p className="font-semibold text-secondary">Mudassir Khan</p>
          <p className="text-blue-500">crm@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
