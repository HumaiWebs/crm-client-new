"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EmailDashboard } from "@/components/email-marketing/email-dashboard"
import { EmailComposer } from "@/components/email-marketing/email-composer"
import { EmailLists } from "@/components/email-marketing/email-lists"
import { SMTPSettings } from "@/components/email-marketing/smtp-settings"
import { EmailTemplates } from "@/components/email-marketing/email-templates"
import { EmailCampaigns } from "@/components/email-marketing/email-campaigns"

export default function EmailMarketingPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Marketing</h1>
          <p className="text-muted-foreground">Professional Email Campaign Management System</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="lists">Email Lists</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">SMTP Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <EmailDashboard />
        </TabsContent>

        <TabsContent value="compose">
          <EmailComposer />
        </TabsContent>

        <TabsContent value="campaigns">
          <EmailCampaigns />
        </TabsContent>

        <TabsContent value="lists">
          <EmailLists />
        </TabsContent>

        <TabsContent value="templates">
          <EmailTemplates />
        </TabsContent>

        <TabsContent value="settings">
          <SMTPSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
