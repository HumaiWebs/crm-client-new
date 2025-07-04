import { DashboardActivity } from '@/components/dashboard/dashboard-activity'
import { DashboardPanels } from '@/components/dashboard/dashboard-panels'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import React from 'react'

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <DashboardStats />
       <DashboardPanels />
      <DashboardActivity />
     
    </div>
  )
}
