"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Mail, Building, Trash2, Edit, CheckCircle, AlertCircle, TestTube } from "lucide-react"

export function SMTPSettings() {
  const [smtpConfigs, setSMTPConfigs] = useState([
    {
      id: 1,
      name: "Default SMTP",
      host: "smtp.gmail.com",
      port: 587,
      username: "noreply@humaicr.com",
      isDefault: true,
      status: "active",
      company: {
        name: "HumAi CRM Inc.",
        email: "noreply@humaicr.com",
        address: "123 Business St, City, State 12345",
        phone: "+1 (555) 123-4567",
      },
    },
  ])

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "HumAi CRM Inc.",
      email: "noreply@humaicr.com",
      address: "123 Business St, City, State 12345",
      phone: "+1 (555) 123-4567",
      logo: null,
      isDefault: true,
    },
  ])

  const [showAddSMTP, setShowAddSMTP] = useState(false)
  const [showAddCompany, setShowAddCompany] = useState(false)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="smtp" className="space-y-6">
        <TabsList>
          <TabsTrigger value="smtp">SMTP Configurations</TabsTrigger>
          <TabsTrigger value="companies">Company Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="smtp" className="space-y-6">
          {/* SMTP Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">SMTP Configurations</h3>
              <p className="text-sm text-muted-foreground">Manage your email sending servers</p>
            </div>
            <Button onClick={() => setShowAddSMTP(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add SMTP
            </Button>
          </div>

          {/* SMTP List */}
          <div className="grid gap-4">
            {smtpConfigs.map((smtp) => (
              <Card key={smtp.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5" />
                      <div>
                        <CardTitle className="text-base">{smtp.name}</CardTitle>
                        <CardDescription>
                          {smtp.host}:{smtp.port}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {smtp.isDefault && <Badge>Default</Badge>}
                      <Badge variant={smtp.status === "active" ? "default" : "secondary"}>{smtp.status}</Badge>
                      <Button variant="outline" size="sm">
                        <TestTube className="h-4 w-4 mr-2" />
                        Test
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!smtp.isDefault && (
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">Username</Label>
                      <p>{smtp.username}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Company</Label>
                      <p>{smtp.company.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">From Email</Label>
                      <p>{smtp.company.email}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Status</Label>
                      <div className="flex items-center space-x-2">
                        {smtp.status === "active" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="capitalize">{smtp.status}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add SMTP Form */}
          {showAddSMTP && (
            <Card>
              <CardHeader>
                <CardTitle>Add New SMTP Configuration</CardTitle>
                <CardDescription>Configure a new email sending server</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-name">Configuration Name</Label>
                    <Input id="smtp-name" placeholder="e.g., Marketing SMTP" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Port</Label>
                    <Input id="smtp-port" type="number" placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">Username</Label>
                    <Input id="smtp-username" placeholder="your-email@domain.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">Password</Label>
                    <Input id="smtp-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-company">Associated Company</Label>
                    <select className="w-full p-2 border rounded-md">
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="use-tls" />
                  <Label htmlFor="use-tls">Use TLS/SSL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="set-default" />
                  <Label htmlFor="set-default">Set as default SMTP</Label>
                </div>
                <div className="flex space-x-2">
                  <Button>Save Configuration</Button>
                  <Button variant="outline" onClick={() => setShowAddSMTP(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          {/* Companies Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Company Profiles</h3>
              <p className="text-sm text-muted-foreground">Manage sender company information</p>
            </div>
            <Button onClick={() => setShowAddCompany(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>

          {/* Companies List */}
          <div className="grid gap-4">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Building className="h-5 w-5" />
                      <div>
                        <CardTitle className="text-base">{company.name}</CardTitle>
                        <CardDescription>{company.email}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {company.isDefault && <Badge>Default</Badge>}
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!company.isDefault && (
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">Address</Label>
                      <p>{company.address}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Phone</Label>
                      <p>{company.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Company Form */}
          {showAddCompany && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Company Profile</CardTitle>
                <CardDescription>Create a new sender company profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Your Company Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Email Address</Label>
                    <Input id="company-email" placeholder="contact@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Phone Number</Label>
                    <Input id="company-phone" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <Input id="company-website" placeholder="https://company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Textarea id="company-address" placeholder="123 Business St, City, State 12345" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="set-default-company" />
                  <Label htmlFor="set-default-company">Set as default company</Label>
                </div>
                <div className="flex space-x-2">
                  <Button>Save Company</Button>
                  <Button variant="outline" onClick={() => setShowAddCompany(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
