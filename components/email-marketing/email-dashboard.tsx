import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  Building,
  FileText,
  Server,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Send,
  Calendar,
  Eye,
  Edit,
  Folder,
  AlertCircle,
} from "lucide-react"

export function EmailDashboard() {
  // System readiness data
  const systemReadiness = {
    smtp: { count: 3, ready: true, status: "3 Connected" },
    companies: { count: 5, ready: true, status: "5 Added" },
    emailLists: { count: 10, ready: true, status: "10 Lists" },
    templates: { count: 2, ready: true, status: "2 Templates" },
  }

  // Email folders/lists data
  const emailFolders = [
    { name: "Security Companies", lists: 2, contacts: 0, lastUpdated: "2024-06-20", warning: true },
    { name: "IT Companies", lists: 1, contacts: 300, lastUpdated: "2024-06-25", warning: false },
    { name: "Retail Sector", lists: 0, contacts: 0, lastUpdated: "Never", warning: true },
    { name: "Healthcare", lists: 3, contacts: 450, lastUpdated: "2024-06-28", warning: false },
    { name: "Finance", lists: 2, contacts: 780, lastUpdated: "2024-06-27", warning: false },
    { name: "Manufacturing", lists: 2, contacts: 0, lastUpdated: "2024-06-15", warning: true },
  ]

  // Last campaign data
  const lastCampaign = {
    date: "2024-06-28",
    name: "Summer Sale 2024",
    emailList: "IT Companies",
    smtp: "Default SMTP",
    status: "Sent",
    recipients: 300,
  }

  // System alerts
  const alerts = [
    { type: "warning", message: "3 email lists have 0 contacts", action: "Add Contacts" },
    { type: "info", message: "1 SMTP server needs testing", action: "Test SMTP" },
  ]

  // Quick stats
  const quickStats = {
    totalContacts: 1530,
    smtpConfigured: 3,
    companiesAdded: 5,
    emailLists: 10,
    emptyLists: 3,
  }

  const getStatusIcon = (ready: boolean) => {
    return ready ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />
  }

  const getStatusBadge = (ready: boolean) => {
    return ready ? (
      <Badge className="bg-green-100 text-green-800">Ready</Badge>
    ) : (
      <Badge variant="destructive">Missing</Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* 🚨 Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-red-600 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            System Alerts
          </h3>
          {alerts.map((alert, index) => (
            <Alert
              key={index}
              className={alert.type === "warning" ? "border-yellow-200 bg-yellow-50" : "border-blue-200 bg-blue-50"}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{alert.message}</span>
                <Button variant="outline" size="sm">
                  {alert.action}
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* 🔧 System Readiness Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Settings className="mr-2 h-6 w-6" />
            System Readiness Overview
          </CardTitle>
          <CardDescription>Check what's ready and what's missing to send emails</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* SMTP Senders */}
            <div className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-center mb-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Server className="h-6 w-6 text-blue-600" />
                </div>
                {getStatusIcon(systemReadiness.smtp.ready)}
              </div>
              <h4 className="font-semibold text-gray-900">SMTP Senders</h4>
              <p className="text-2xl font-bold text-blue-600 my-2">{systemReadiness.smtp.count}</p>
              <p className="text-sm text-gray-600">{systemReadiness.smtp.status}</p>
              {getStatusBadge(systemReadiness.smtp.ready)}
              <Button variant="outline" size="sm" className="mt-2 w-full bg-transparent">
                <Edit className="h-3 w-3 mr-1" />
                Manage
              </Button>
            </div>

            {/* Companies */}
            <div className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-center mb-3">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                {getStatusIcon(systemReadiness.companies.ready)}
              </div>
              <h4 className="font-semibold text-gray-900">Companies</h4>
              <p className="text-2xl font-bold text-green-600 my-2">{systemReadiness.companies.count}</p>
              <p className="text-sm text-gray-600">{systemReadiness.companies.status}</p>
              {getStatusBadge(systemReadiness.companies.ready)}
              <Button variant="outline" size="sm" className="mt-2 w-full bg-transparent">
                <Edit className="h-3 w-3 mr-1" />
                Manage
              </Button>
            </div>

            {/* Email Lists */}
            <div className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-center mb-3">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                {getStatusIcon(systemReadiness.emailLists.ready)}
              </div>
              <h4 className="font-semibold text-gray-900">Email Lists</h4>
              <p className="text-2xl font-bold text-purple-600 my-2">{systemReadiness.emailLists.count}</p>
              <p className="text-sm text-gray-600">{systemReadiness.emailLists.status}</p>
              {getStatusBadge(systemReadiness.emailLists.ready)}
              <Button variant="outline" size="sm" className="mt-2 w-full bg-transparent">
                <Edit className="h-3 w-3 mr-1" />
                Manage
              </Button>
            </div>

            {/* Templates */}
            <div className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-center mb-3">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                {getStatusIcon(systemReadiness.templates.ready)}
              </div>
              <h4 className="font-semibold text-gray-900">Templates</h4>
              <p className="text-2xl font-bold text-orange-600 my-2">{systemReadiness.templates.count}</p>
              <p className="text-sm text-gray-600">{systemReadiness.templates.status}</p>
              {getStatusBadge(systemReadiness.templates.ready)}
              <Button variant="outline" size="sm" className="mt-2 w-full bg-transparent">
                <Edit className="h-3 w-3 mr-1" />
                Manage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 📂 Email Folders Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Folder className="mr-2 h-5 w-5" />
              Email Folders Summary
            </CardTitle>
            <CardDescription>Organized by industry or category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emailFolders.map((folder, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    folder.warning ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"
                  } hover:shadow-sm transition-shadow`}
                >
                  <div className="flex items-center space-x-3">
                    <Folder className={`h-5 w-5 ${folder.warning ? "text-red-500" : "text-blue-500"}`} />
                    <div>
                      <p className="font-medium text-gray-900">{folder.name}</p>
                      <p className="text-sm text-gray-600">
                        {folder.lists} list{folder.lists !== 1 ? "s" : ""}, {folder.contacts.toLocaleString()} contacts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {folder.warning && <AlertCircle className="h-4 w-4 text-red-500" />}
                    <div className="text-right text-xs text-gray-500">
                      <p>Updated: {folder.lastUpdated}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* 📤 Last Campaign Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Last Campaign
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Campaign:</span>
                <span className="font-medium">{lastCampaign.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Date:</span>
                <span className="font-medium">{lastCampaign.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email List:</span>
                <span className="font-medium">{lastCampaign.emailList}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SMTP:</span>
                <span className="font-medium">{lastCampaign.smtp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge className="bg-green-100 text-green-800">{lastCampaign.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Recipients:</span>
                <span className="font-medium">{lastCampaign.recipients.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* 📈 Mini Stats Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Contacts</span>
                <span className="text-xl font-bold text-blue-600">{quickStats.totalContacts.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SMTPs Configured</span>
                <span className="text-xl font-bold text-green-600">{quickStats.smtpConfigured}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Companies Added</span>
                <span className="text-xl font-bold text-purple-600">{quickStats.companiesAdded}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Lists</span>
                <span className="text-xl font-bold text-orange-600">{quickStats.emailLists}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Lists With 0 Contacts</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xl font-bold text-red-600">{quickStats.emptyLists}</span>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ➕ Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Next steps to get your email marketing ready</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button className="h-16 flex-col space-y-2 bg-blue-600 hover:bg-blue-700">
              <Folder className="h-5 w-5" />
              <span className="text-sm">Create New Folder</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent">
              <Users className="h-5 w-5" />
              <span className="text-sm">Add Contacts to List</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent">
              <Server className="h-5 w-5" />
              <span className="text-sm">Add SMTP Sender</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Create Email Template</span>
            </Button>
            <Button className="h-16 flex-col space-y-2 bg-green-600 hover:bg-green-700">
              <Send className="h-5 w-5" />
              <span className="text-sm">Compose New Campaign</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
