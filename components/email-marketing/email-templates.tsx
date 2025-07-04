"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Eye, Edit, Copy, Trash2, Search, Filter } from "lucide-react"

export function EmailTemplates() {
  const [templates] = useState([
    {
      id: 1,
      name: "Welcome Email",
      description: "Professional welcome email for new subscribers",
      category: "Welcome",
      isDefault: true,
      lastModified: "2 days ago",
      thumbnail: "/placeholder.svg?height=200&width=300",
      content: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: #3b82f6; color: white; padding: 20px; text-align: center;">
            <h1>Welcome to HumAi CRM!</h1>
          </div>
          <div style="padding: 30px 20px;">
            <h2>Hi {{firstName}},</h2>
            <p>Welcome to our community! We're excited to have you on board.</p>
            <p>Here's what you can expect from us:</p>
            <ul>
              <li>Weekly newsletters with industry insights</li>
              <li>Exclusive offers and promotions</li>
              <li>Product updates and announcements</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Get Started</a>
            </div>
            <p>Best regards,<br>The HumAi CRM Team</p>
          </div>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>© 2024 HumAi CRM Inc. All rights reserved.</p>
            <p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Update Preferences</a></p>
          </div>
        </div>
      `,
    },
    {
      id: 2,
      name: "Newsletter Template",
      description: "Clean newsletter layout with sections for content",
      category: "Newsletter",
      isDefault: true,
      lastModified: "1 week ago",
      thumbnail: "/placeholder.svg?height=200&width=300",
      content: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: #1f2937; color: white; padding: 20px;">
            <h1 style="margin: 0;">Weekly Newsletter</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">Issue #{{issueNumber}} - {{date}}</p>
          </div>
          <div style="padding: 30px 20px;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">This Week's Highlights</h2>
            
            <div style="margin: 30px 0;">
              <h3 style="color: #3b82f6;">Featured Article</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="#" style="color: #3b82f6; text-decoration: none;">Read More →</a>
            </div>
            
            <div style="margin: 30px 0;">
              <h3 style="color: #3b82f6;">Industry News</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 10px 0; padding: 10px; background: #f9fafb; border-left: 3px solid #3b82f6;">
                  <strong>News Item 1:</strong> Brief description of the news item.
                </li>
                <li style="margin: 10px 0; padding: 10px; background: #f9fafb; border-left: 3px solid #3b82f6;">
                  <strong>News Item 2:</strong> Brief description of the news item.
                </li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 40px 0; padding: 20px; background: #eff6ff; border-radius: 8px;">
              <h3 style="color: #1e40af; margin-top: 0;">Special Offer</h3>
              <p>Get 20% off your next purchase with code NEWSLETTER20</p>
              <a href="#" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Shop Now</a>
            </div>
          </div>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>© 2024 HumAi CRM Inc. All rights reserved.</p>
            <p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Update Preferences</a></p>
          </div>
        </div>
      `,
    },
    {
      id: 3,
      name: "Product Launch",
      description: "Announcement template for new product launches",
      category: "Announcement",
      isDefault: true,
      lastModified: "3 days ago",
      thumbnail: "/placeholder.svg?height=200&width=300",
      content: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px;">🚀 New Product Launch!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Introducing {{productName}}</p>
          </div>
          <div style="padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="/placeholder.svg?height=200&width=400" alt="Product Image" style="max-width: 100%; height: auto; border-radius: 8px;">
            </div>
            
            <h2 style="color: #1f2937; text-align: center;">Meet Your New Favorite Tool</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
              We're thrilled to introduce {{productName}}, designed to revolutionize the way you work. 
              After months of development and testing, we're confident this will become an essential part of your toolkit.
            </p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="color: #0369a1; margin-top: 0;">Key Features:</h3>
              <ul style="color: #1e40af; line-height: 1.8;">
                <li>Feature 1: Advanced functionality</li>
                <li>Feature 2: Seamless integration</li>
                <li>Feature 3: Enhanced performance</li>
                <li>Feature 4: User-friendly interface</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-size: 18px; font-weight: bold;">
                Try It Now - Free for 30 Days
              </a>
            </div>
            
            <p style="text-align: center; color: #6b7280; font-size: 14px;">
              Questions? Reply to this email or <a href="#" style="color: #3b82f6;">contact our support team</a>.
            </p>
          </div>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>© 2024 HumAi CRM Inc. All rights reserved.</p>
            <p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Update Preferences</a></p>
          </div>
        </div>
      `,
    },
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Email Templates</h3>
          <p className="text-sm text-muted-foreground">Pre-designed templates to get you started quickly</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Templates Grid */}
      {!previewMode ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </div>
                  {template.isDefault && (
                    <Badge variant="secondary" className="text-xs">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{template.lastModified}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setPreviewMode(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    {!template.isDefault && (
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Preview Mode */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium">
              Template Preview: {templates.find((t) => t.id === selectedTemplate)?.name}
            </h4>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setPreviewMode(false)}>
                Back to Templates
              </Button>
              <Button>Use This Template</Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <div
                className="border rounded-lg p-4 bg-white"
                dangerouslySetInnerHTML={{
                  __html: templates.find((t) => t.id === selectedTemplate)?.content || "",
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
