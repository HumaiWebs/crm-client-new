"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Search, Filter, Download, Upload, Folder, MoreHorizontal, Edit, Trash2 } from "lucide-react"

export function EmailLists() {
  const [emailLists, setEmailLists] = useState([
    {
      id: 1,
      name: "All Subscribers",
      count: 3240,
      type: "all",
      description: "Complete subscriber database",
      lastUpdated: "2 hours ago",
      isDefault: true,
    },
    {
      id: 2,
      name: "VIP Customers",
      count: 156,
      type: "segment",
      description: "High-value customers and premium subscribers",
      lastUpdated: "1 day ago",
      isDefault: false,
    },
    {
      id: 3,
      name: "Newsletter Subscribers",
      count: 2890,
      type: "segment",
      description: "Users subscribed to weekly newsletter",
      lastUpdated: "3 hours ago",
      isDefault: false,
    },
    {
      id: 4,
      name: "Product Updates",
      count: 1245,
      type: "segment",
      description: "Subscribers interested in product announcements",
      lastUpdated: "5 hours ago",
      isDefault: false,
    },
  ])

  const [contacts, setContacts] = useState([
    {
      id: 1,
      email: "sarah.johnson@company.com",
      firstName: "Sarah",
      lastName: "Johnson",
      status: "subscribed",
      lists: ["All Subscribers", "VIP Customers"],
      joinDate: "2024-01-15",
      lastActivity: "2024-06-28",
    },
    {
      id: 2,
      email: "mike.chen@startup.io",
      firstName: "Mike",
      lastName: "Chen",
      status: "subscribed",
      lists: ["All Subscribers", "Newsletter Subscribers"],
      joinDate: "2024-02-20",
      lastActivity: "2024-06-30",
    },
    {
      id: 3,
      email: "emma.davis@business.com",
      firstName: "Emma",
      lastName: "Davis",
      status: "unsubscribed",
      lists: ["All Subscribers"],
      joinDate: "2024-01-08",
      lastActivity: "2024-05-15",
    },
  ])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="lists" className="space-y-6">
        <TabsList>
          <TabsTrigger value="lists">Email Lists</TabsTrigger>
          <TabsTrigger value="contacts">All Contacts</TabsTrigger>
          <TabsTrigger value="import">Import/Export</TabsTrigger>
        </TabsList>

        <TabsContent value="lists" className="space-y-6">
          {/* Lists Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Email Lists</h3>
              <p className="text-sm text-muted-foreground">Organize your subscribers into targeted lists</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create List
            </Button>
          </div>

          {/* Lists Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {emailLists.map((list) => (
              <Card key={list.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {list.type === "all" ? (
                        <Users className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Folder className="h-5 w-5 text-green-600" />
                      )}
                      <div>
                        <CardTitle className="text-base">{list.name}</CardTitle>
                        <CardDescription className="text-xs">{list.count.toLocaleString()} subscribers</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {list.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{list.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Updated {list.lastUpdated}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      {!list.isDefault && (
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          {/* Contacts Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">All Contacts</h3>
              <p className="text-sm text-muted-foreground">Manage individual subscriber details</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="pl-10" />
            </div>
          </div>

          {/* Contacts Table */}
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {contact.firstName[0]}
                          {contact.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={contact.status === "subscribed" ? "default" : "secondary"}>
                          {contact.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {contact.lists.length} list{contact.lists.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>Joined: {contact.joinDate}</p>
                        <p>Active: {contact.lastActivity}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          {/* Import/Export Header */}
          <div>
            <h3 className="text-lg font-medium">Import & Export</h3>
            <p className="text-sm text-muted-foreground">Manage your contact data in bulk</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Import Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Import Contacts
                </CardTitle>
                <CardDescription>Upload contacts from CSV, Excel, or other formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
                  <Button variant="outline">Choose File</Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Import to List</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Subscribers</option>
                    <option>VIP Customers</option>
                    <option>Newsletter Subscribers</option>
                    <option>Create New List...</option>
                  </select>
                </div>
                <Button className="w-full">Import Contacts</Button>
              </CardContent>
            </Card>

            {/* Export Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Export Contacts
                </CardTitle>
                <CardDescription>Download your contact lists in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select List to Export</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Subscribers (3,240 contacts)</option>
                    <option>VIP Customers (156 contacts)</option>
                    <option>Newsletter Subscribers (2,890 contacts)</option>
                    <option>Product Updates (1,245 contacts)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Export Format</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>CSV (.csv)</option>
                    <option>Excel (.xlsx)</option>
                    <option>JSON (.json)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Include Fields</label>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>Email Address</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>First & Last Name</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Subscription Status</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span>Join Date</span>
                    </label>
                  </div>
                </div>
                <Button className="w-full">Export Contacts</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
