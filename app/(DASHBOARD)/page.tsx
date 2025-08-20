import { DashboardActivity } from "@/components/dashboard/dashboard-activity";
import { DashboardPanels } from "@/components/dashboard/dashboard-panels";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";

export default function Home() {
  return (
    <div className="flex-1 space-y-6 max-md:p-3 p-6">
      <DashboardStats />
      <DashboardPanels />
      <DashboardActivity />
    </div>
  );
}
