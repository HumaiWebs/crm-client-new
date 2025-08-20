"use client";

import { http } from "@/app/config/axiosClient";
import { RQKeys } from "@/app_data_store/react-query-keys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Users, Briefcase, AlertCircle, CreditCard, Globe } from "lucide-react";
import Loader from "../global/loader";

export type TDahsboardStats = {
  total_clients: number;
  expiring_domains: number;
  active_projects: number;
  open_tickets: number;
  pending_invoices: number;
  total_pending_amount: number;
};

export function DashboardStats() {
  const { data: stats, isFetching: loading_stats } = useQuery<TDahsboardStats>({
    queryKey: [RQKeys.DASHBOARD.RQ_STATS_ADMIN],
    async queryFn() {
      return (await http.get("/dashboard/stats")).data;
    },
  });

  return (
    <div className="space-y-6">
      {/* 🔝 Top Summary Widgets / KPIs */}
      <div className="grid gap-2 xl:gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading_stats ? <Loader /> : stats?.total_clients}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading_stats ? <Loader /> : stats?.active_projects}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading_stats ? <Loader /> : stats?.open_tickets}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Invoices
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading_stats ? <Loader /> : stats?.pending_invoices}
            </div>
            <p className="text-xs text-muted-foreground">
              ${stats?.total_pending_amount} total amount
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expiring Domains
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {loading_stats ? <Loader /> : stats?.expiring_domains}
            </div>
            <p className="text-xs text-muted-foreground">In next 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* 📈 Graphs & Trends */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"></div>
    </div>
  );
}
