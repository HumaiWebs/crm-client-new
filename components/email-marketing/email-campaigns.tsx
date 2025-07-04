"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Play, Pause, MoreHorizontal, Eye, BarChart3 } from "lucide-react"

export function EmailCampaigns() {
  const [campaigns] = useState([
    {
      id: 1,
      name: "Summer Sale 2024",
      status: "completed",
      type: "promotional",
      subject: "🌞 Summer Sale - Up to 50% Off Everything!",
      recipients: 2500,
      sent: 2500,
      delivered: 2475,
      opened: 625,
      clicked: 87,
      bounced: 25,
      unsubscribed: 3,
      createdDate: "2024-06-15",
      sentDate: "2024-06-16",
      openRate: 25.2,
      clickRate: 3.5,
      conversionRate: 2.1,
    },
    {
      id: 2,
      name: "Product Launch - CRM 2.0",
      status: "active",
      type: "announcement",
      subject: "🚀 Introducing CRM 2.0 - Revolutionary Features Inside",
      recipients: 1800,
      sent: 1800,
      delivered: 1785,
      opened: 432,
      clicked: 65,
      bounced: 15,
      unsubscribed: 2,
      createdDate: "2024-06-20",
      sentDate: "2024-06-21",
      openRate: 24.2,
      clickRate: 3.6,
      conversionRate: 1.8,
    },
    {
      id: 3,
      name: "Weekly Newsletter #45",
      status: "scheduled",
      type: "newsletter",
      subject: "Weekly Insights: Industry Trends & Tips",
      recipients: 3200,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      createdDate: "2024-06-25",
      sentDate: "2024-06-28",
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
    },
    {
      id: 4,
      name: "Welcome Series - Part 1",
      status: "draft",
      type: "welcome",
      subject: "Welcome to HumAi CRM - Let's Get Started!",
      recipients: 0,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      createdDate: "2024-06-26",
      sentDate: null,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "active":
        return "default"
      case "scheduled":
        return "secondary"
      case "draft":
        return "outline"
      case "paused":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "promotional":
        return "bg-purple-100 text-purple-800"
      case "announcement":
        return "bg-blue-100 text-blue-800"
      case "newsletter":
        return "bg-green-100 text-green-800"
      case "welcome":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Email Campaigns</h3>
            <p className="text-sm text-muted-foreground">Manage and track your email marketing campaigns</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search campaigns..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium">{campaign.name}</h4>
                      <Badge variant={getStatusColor(campaign.status)} className="capitalize">
                        {campaign.status}
                      </Badge>
                      <Badge className={`text-xs ${getTypeColor(campaign.type)}`}>{campaign.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{campaign.subject}</p>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{campaign.recipients.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Recipients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{campaign.delivered.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Delivered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{campaign.opened.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Opened</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{campaign.clicked.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Clicked</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{campaign.openRate.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Open Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{campaign.clickRate.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Click Rate</div>
                      </div>
                    </div>

                    {campaign.status === "active" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{((campaign.sent / campaign.recipients) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(campaign.sent / campaign.recipients) * 100} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>Created: {campaign.createdDate}</span>
                        {campaign.sentDate && <span>Sent: {campaign.sentDate}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {campaign.status === "scheduled" && (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Send Now
                      </Button>
                    )}
                    {campaign.status === "active" && (
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Other tab contents would filter the campaigns array */}
        <TabsContent value="active">
          <div className="text-center py-8 text-muted-foreground">Active campaigns will be shown here</div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="text-center py-8 text-muted-foreground">Scheduled campaigns will be shown here</div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-8 text-muted-foreground">Completed campaigns will be shown here</div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="text-center py-8 text-muted-foreground">Draft campaigns will be shown here</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
