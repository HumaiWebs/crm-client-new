import { Button } from '@/components/ui/button'
import { Bell, Plus } from 'lucide-react'
import React from 'react'

export default function DashboardPage() {
  return (
    <div  className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        {/* <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div> */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

    </div>
  )
}
