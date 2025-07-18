'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  FileText,
  Briefcase,
  MessageSquare,
  Globe,
  Server,
  ShoppingCart,
  CreditCard,
  Target,
  AlertCircle,
  UserCheck,
  Shield,
  Activity,
  Calendar,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardPanels() {
  const router = useRouter();

  // Calendar/Timeline data
  const upcomingEvents = [
    { title: "Website Redesign Deadline", date: "Dec 15", type: "project" },
    { title: "Client Meeting - TechCorp", date: "Dec 12", type: "meeting" },
    { title: "Domain Renewal - startup.io", date: "Dec 20", type: "billing" },
    { title: "Project Milestone Review", date: "Dec 18", type: "milestone" },
  ];

  // Support data
  const supportData = {
    openTickets: 8,
    avgResolutionTime: "4.2 hours",
    satisfactionScore: 4.6,
    recentMessages: [
      {
        client: "TechCorp",
        message: "Login issues with admin panel",
        time: "10 min ago",
      },
      {
        client: "StartupXYZ",
        message: "Request for feature enhancement",
        time: "1 hour ago",
      },
      {
        client: "RetailCo",
        message: "Payment gateway not working",
        time: "2 hours ago",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* 🔧 Quick Access Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into common tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button
            onClick={() => {
              router.push("/clients?createTrigger=true");
            }}
            variant="outline"
            className="h-20 flex-col space-y-2 bg-transparent cursor-pointer"
          >
            <Users className="h-6 w-6" />
            <span>Add New Client</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-transparent"
          >
            <FileText className="h-6 w-6" />
            <span>Create Invoice</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-transparent"
          >
            <Briefcase className="h-6 w-6" />
            <span>Start Project</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-transparent"
          >
            <MessageSquare className="h-6 w-6" />
            <span>Open Support Ticket</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-transparent"
          >
            <Globe className="h-6 w-6" />
            <span>Add Domain/Hosting</span>
          </Button>
        </CardContent>
      </Card>

      {/* 🗂️ Mini Panels per Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* SERVICES Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">SERVICES</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">Total Domains</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">156</div>
                <div className="text-xs text-orange-600">5 expiring</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4" />
                <span className="text-sm">Active Hosting</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">89</div>
                <div className="text-xs text-green-600">All active</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm">E-commerce Sites</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">23</div>
                <div className="text-xs text-green-600">22 online</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BUSINESS Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">BUSINESS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm">Invoices</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">45 Paid / 12 Unpaid</div>
                <div className="text-xs text-muted-foreground">
                  $15,750 pending
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span className="text-sm">Projects</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  8 Todo / 18 Progress / 45 Done
                </div>
                <div className="text-xs text-muted-foreground">71 total</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Open Tickets</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">2 High / 4 Medium / 2 Low</div>
                <div className="text-xs text-muted-foreground">8 total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MANAGEMENT Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">MANAGEMENT</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4" />
                <span className="text-sm">Team Members</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">8 Online / 12 Total</div>
                <div className="text-xs text-green-600">4 active now</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">System Alerts</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">2 Active</div>
                <div className="text-xs text-yellow-600">1 backup warning</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span className="text-sm">System Health</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">Excellent</div>
                <div className="text-xs text-muted-foreground">
                  99.9% uptime
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 📅 Calendar/Timeline & 💬 Support Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Project deadlines, meetings, and billing dates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50"
              >
                <div
                  className={`h-3 w-3 rounded-full ${
                    event.type === "project"
                      ? "bg-blue-500"
                      : event.type === "meeting"
                      ? "bg-green-500"
                      : event.type === "billing"
                      ? "bg-orange-500"
                      : "bg-purple-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
                <Badge variant="outline">{event.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Support Overview
            </CardTitle>
            <CardDescription>
              Ticket status and customer satisfaction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {supportData.openTickets}
                </div>
                <div className="text-xs text-muted-foreground">
                  Open Tickets
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {supportData.avgResolutionTime}
                </div>
                <div className="text-xs text-muted-foreground">
                  Avg Resolution
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {supportData.satisfactionScore}
                </div>
                <Star className="h-4 w-4 text-yellow-500 ml-1" />
                <div className="text-xs text-muted-foreground ml-2">Rating</div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Latest Messages</h4>
              {supportData.recentMessages.map((msg, index) => (
                <div key={index} className="text-xs">
                  <span className="font-medium">{msg.client}:</span>{" "}
                  {msg.message}
                  <span className="text-muted-foreground ml-2">
                    ({msg.time})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
