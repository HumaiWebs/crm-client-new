import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle } from "lucide-react"

export function DashboardActivity() {
  // Action Items / Notifications
  const actionItems = [
    { type: "ticket", message: "New support ticket from TechCorp", time: "5 min ago", priority: "high" },
    { type: "project", message: "Website Redesign project deadline in 2 days", time: "1 hour ago", priority: "medium" },
    { type: "invoice", message: "Invoice #1234 overdue by 5 days", time: "2 hours ago", priority: "high" },
    { type: "domain", message: "techcorp.com expires in 15 days", time: "1 day ago", priority: "medium" },
    { type: "order", message: "New e-commerce order #5678", time: "3 hours ago", priority: "low" },
  ]

  // Recent clients and employees
  const recentClients = [
    { name: "Sarah Johnson", email: "sarah@company.com", addedDate: "2 days ago", avatar: "SJ" },
    { name: "Mike Chen", email: "mike@startup.io", addedDate: "3 days ago", avatar: "MC" },
    { name: "Emma Davis", email: "emma@business.com", addedDate: "5 days ago", avatar: "ED" },
    { name: "John Smith", email: "john@enterprise.org", addedDate: "1 week ago", avatar: "JS" },
    { name: "Lisa Wang", email: "lisa@innovation.co", addedDate: "1 week ago", avatar: "LW" },
  ]

  const employeeActivity = [
    { name: "Sarah", activity: "Closed 3 tickets today", avatar: "S", status: "online" },
    { name: "Mike", activity: "Completed 2 projects this week", avatar: "M", status: "online" },
    { name: "Emma", activity: "Generated 5 invoices today", avatar: "E", status: "away" },
    { name: "John", activity: "Added 2 new clients", avatar: "J", status: "offline" },
  ]

  return (
    <div className="space-y-6">
      {/* ✅ Action Items / Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Action Items & Notifications
          </CardTitle>
          <CardDescription>Recent activity requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {actionItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div
                  className={`h-2 w-2 rounded-full ${
                    item.priority === "high"
                      ? "bg-red-500"
                      : item.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.message}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>{item.priority}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 🧑‍💼 Clients / Employees Preview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Clients</CardTitle>
            <CardDescription>5 most recently added clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentClients.map((client, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-blue-100 text-blue-600">{client.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.email}</p>
                </div>
                <div className="text-xs text-muted-foreground">{client.addedDate}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employee Activity</CardTitle>
            <CardDescription>Team member highlights and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {employeeActivity.map((employee, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-green-100 text-green-600">{employee.avatar}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                      employee.status === "online"
                        ? "bg-green-500"
                        : employee.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">{employee.activity}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
