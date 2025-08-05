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
  image?: string
  role: TUserRole;
  phone: string;
  password: ?string
};

export type TUserRole = "admin" | "client";

export type TProjectStatus = "Completed" | "Pending" | "In Progress" | string;

export type TProject = {
  _id: string;
  client: {
    _id: string;
    name: string;
    phone: string;
    createdAt: string;
    email: string;
  };
  employees: any[];
  name: string;
  companyName: string;
  category: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  depositedAmount: number;
  status: TProjectStatus;
  currency: string;
  files: any[];
  details: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface KPIData {
  totalClients: { count: number; newThisWeek: number; newThisMonth: number };
  activeProjects: { count: number; change: number };
  openTickets: { count: number; urgent: number };
  pendingInvoices: { count: number; totalAmount: number };
  expiringDomains: { count: number; next30Days: boolean };
}

export interface ChartData {
  month: string;
  [key: string]: number | string;
}
