"use client";

import { http } from "@/app/config/axiosClient";
import { RQKeys } from "@/app_data_store/react-query-keys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Briefcase,
  AlertCircle,
  CreditCard,
  Globe,
  ArrowDownRight,
} from "lucide-react";
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
    queryKey: [RQKeys.DASHBOARD.RQ_STATES_ADMIN],
    async queryFn() {
      return (await http.get("/dashboard/stats")).data;
    },
  });

  const kpiData = {
    totalClients: { count: 247, newThisWeek: 8, newThisMonth: 23 },
    activeProjects: { count: 18, change: -2 },
    openTickets: { count: 8, urgent: 2 },
    pendingInvoices: { count: 12, totalAmount: 15750 },
    expiringDomains: { count: 5, next30Days: true },
  };

  console.log(stats);

  return (
    <div className="space-y-6">
      {/* 🔝 Top Summary Widgets / KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading_stats ? <Loader /> : stats?.total_clients}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +{kpiData.totalClients.newThisWeek} this week, +
              {kpiData.totalClients.newThisMonth} this month
            </p> */}
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
            {/* <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                {Math.abs(kpiData.activeProjects.change)} from last week
              </span>
            </p> */}
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
            {/* <p className="text-xs text-muted-foreground">
              {kpiData.openTickets.urgent} urgent tickets
            </p> */}
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Client Growth</CardTitle>
            <CardDescription>Monthly new client acquisitions</CardDescription>
          </CardHeader> */}
        {/* <CardContent>
            <ChartContainer
              config={{
                clients: {
                  label: "Clients",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="clients"
                    stroke="var(--color-clients)"
                    fill="var(--color-clients)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent> */}
        {/* </Card> */}

        {/* <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue from invoices</CardDescription>
          </CardHeader>
          {/* <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent> 
        {/* </Card> */}
      </div>
    </div>
  );
}
