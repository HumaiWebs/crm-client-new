"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Send,
  Save,
  Eye,
  Paperclip,
  ImageIcon,
  Link,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  X,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Copy,
  Scissors,
  RotateCcw,
  RotateCw,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
} from "lucide-react"

export function EmailComposer() {
  const [emailContent, setEmailContent] = useState("")
  const [subject, setSubject] = useState("")
  const [selectedList, setSelectedList] = useState("all")
  const [attachments, setAttachments] = useState<File[]>([])
  const [previewMode, setPreviewMode] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showCcBcc, setShowCcBcc] = useState(false)

  // Advanced email options
  const [ccRecipients, setCcRecipients] = useState("")
  const [bccRecipients, setBccRecipients] = useState("")
  const [replyTo, setReplyTo] = useState("")
  const [priority, setPriority] = useState("normal")
  const [trackOpens, setTrackOpens] = useState(true)
  const [trackClicks, setTrackClicks] = useState(true)
  const [scheduleEmail, setScheduleEmail] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")

  const editorRef = useRef<HTMLDivElement>(null)

  const emailLists = [
    { id: "all", name: "All Subscribers", count: 3240 },
    { id: "vip", name: "VIP Customers", count: 156 },
    { id: "newsletter", name: "Newsletter Subscribers", count: 2890 },
    { id: "products", name: "Product Updates", count: 1245 },
  ]

  const smtpAccounts = [
    { id: "default", name: "Default SMTP", email: "noreply@humaicr.com" },
    { id: "marketing", name: "Marketing SMTP", email: "marketing@humaicr.com" },
    { id: "support", name: "Support SMTP", email: "support@humaicr.com" },
  ]

  const [selectedSmtp, setSelectedSmtp] = useState("default")

  // Rich text editor functions
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const paste = e.clipboardData.getData("text/html") || e.clipboardData.getData("text/plain")

    // Clean MS Word formatting
    let cleanedContent = paste
      .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
      .replace(/<o:p\s*\/?>|<\/o:p>/g, "") // Remove Word-specific tags
      .replace(/<span[^>]*font-family[^>]*>/g, "<span>") // Clean font-family
      .replace(/style="[^"]*"/g, "") // Remove inline styles initially
      .replace(/<(\/?)w:[^>]*>/g, "") // Remove Word namespace tags
      .replace(/class="[^"]*"/g, "") // Remove classes
      .replace(/mso-[^;]*;?/g, "") // Remove MSO styles

    // Re-add essential formatting
    cleanedContent = cleanedContent
      .replace(/<b\b[^>]*>/g, "<strong>")
      .replace(/<\/b>/g, "</strong>")
      .replace(/<i\b[^>]*>/g, "<em>")
      .replace(/<\/i>/g, "</em>")
      .replace(/<u\b[^>]*>/g, '<span style="text-decoration: underline;">')
      .replace(/<\/u>/g, "</span>")

    // Insert cleaned content
    if (document.queryCommandSupported("insertHTML")) {
      document.execCommand("insertHTML", false, cleanedContent)
    } else {
      // Fallback for browsers that don't support insertHTML
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        range.deleteContents()
        const div = document.createElement("div")
        div.innerHTML = cleanedContent
        range.insertNode(div)
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setAttachments((prev) => [...prev, ...Array.from(files)])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  const changeFontSize = (size: string) => {
    execCommand("fontSize", size)
  }

  const changeFontFamily = (font: string) => {
    execCommand("fontName", font)
  }

  const changeTextColor = (color: string) => {
    execCommand("foreColor", color)
  }

  const changeBackgroundColor = (color: string) => {
    execCommand("backColor", color)
  }

  const insertTable = () => {
    const rows = prompt("Number of rows:") || "2"
    const cols = prompt("Number of columns:") || "2"
    let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%;">'

    for (let i = 0; i < Number.parseInt(rows); i++) {
      tableHTML += "<tr>"
      for (let j = 0; j < Number.parseInt(cols); j++) {
        tableHTML += '<td style="padding: 8px; border: 1px solid #ddd;">&nbsp;</td>'
      }
      tableHTML += "</tr>"
    }
    tableHTML += "</table><br>"

    execCommand("insertHTML", tableHTML)
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addEventListener("paste", handlePaste as any)
      return () => {
        if (editorRef.current) {
          editorRef.current.removeEventListener("paste", handlePaste as any)
        }
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Compose Email Campaign</h3>
          <p className="text-sm text-muted-foreground">
            Create and send professional email campaigns with advanced features
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Send className="mr-2 h-4 w-4" />
            {scheduleEmail ? "Schedule Campaign" : "Send Campaign"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Composer */}
        <div className="lg:col-span-3 space-y-6">
          {!previewMode ? (
            <>
              {/* Email Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Email Settings</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                      Advanced Options
                      {showAdvanced ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Basic Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-account">SMTP Account</Label>
                      <select
                        id="smtp-account"
                        className="w-full p-2 border rounded-md"
                        value={selectedSmtp}
                        onChange={(e) => setSelectedSmtp(e.target.value)}
                      >
                        {smtpAccounts.map((smtp) => (
                          <option key={smtp.id} value={smtp.id}>
                            {smtp.name} ({smtp.email})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipient-list">Send To</Label>
                      <select
                        id="recipient-list"
                        className="w-full p-2 border rounded-md"
                        value={selectedList}
                        onChange={(e) => setSelectedList(e.target.value)}
                      >
                        {emailLists.map((list) => (
                          <option key={list.id} value={list.id}>
                            {list.name} ({list.count.toLocaleString()} subscribers)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      placeholder="Enter your email subject..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  {/* CC/BCC Section */}
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCcBcc(!showCcBcc)}
                      className="p-0 h-auto text-blue-600 hover:text-blue-700"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      {showCcBcc ? "Hide" : "Add"} CC/BCC
                    </Button>

                    {showCcBcc && (
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <Label htmlFor="cc">CC Recipients</Label>
                          <Input
                            id="cc"
                            placeholder="email1@example.com, email2@example.com"
                            value={ccRecipients}
                            onChange={(e) => setCcRecipients(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bcc">BCC Recipients</Label>
                          <Input
                            id="bcc"
                            placeholder="email1@example.com, email2@example.com"
                            value={bccRecipients}
                            onChange={(e) => setBccRecipients(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Advanced Settings */}
                  {showAdvanced && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reply-to">Reply-To Email</Label>
                          <Input
                            id="reply-to"
                            placeholder="reply@yourdomain.com"
                            value={replyTo}
                            onChange={(e) => setReplyTo(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority">Email Priority</Label>
                          <select
                            id="priority"
                            className="w-full p-2 border rounded-md"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                          >
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center space-x-2">
                          <Switch id="track-opens" checked={trackOpens} onCheckedChange={setTrackOpens} />
                          <Label htmlFor="track-opens">Track Email Opens</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="track-clicks" checked={trackClicks} onCheckedChange={setTrackClicks} />
                          <Label htmlFor="track-clicks">Track Link Clicks</Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="schedule-email" checked={scheduleEmail} onCheckedChange={setScheduleEmail} />
                          <Label htmlFor="schedule-email">Schedule Email</Label>
                        </div>
                        {scheduleEmail && (
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="space-y-2">
                              <Label htmlFor="schedule-date">Date</Label>
                              <Input
                                id="schedule-date"
                                type="date"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="schedule-time">Time</Label>
                              <Input
                                id="schedule-time"
                                type="time"
                                value={scheduledTime}
                                onChange={(e) => setScheduledTime(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Advanced Rich Text Editor */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Content</CardTitle>
                  <CardDescription>Professional rich text editor with MS Word paste support</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Advanced Toolbar */}
                  <div className="space-y-2">
                    {/* Row 1: Basic Formatting */}
                    <div className="flex flex-wrap items-center gap-1 p-2 border rounded-md bg-muted/50">
                      <Button variant="ghost" size="sm" onClick={() => execCommand("undo")}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("redo")}>
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6 mx-1" />

                      <Button variant="ghost" size="sm" onClick={() => execCommand("cut")}>
                        <Scissors className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("copy")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6 mx-1" />

                      <select
                        className="px-2 py-1 border rounded text-sm"
                        onChange={(e) => changeFontFamily(e.target.value)}
                      >
                        <option value="">Font Family</option>
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Courier New">Courier New</option>
                      </select>

                      <select
                        className="px-2 py-1 border rounded text-sm"
                        onChange={(e) => changeFontSize(e.target.value)}
                      >
                        <option value="">Size</option>
                        <option value="1">8pt</option>
                        <option value="2">10pt</option>
                        <option value="3">12pt</option>
                        <option value="4">14pt</option>
                        <option value="5">18pt</option>
                        <option value="6">24pt</option>
                        <option value="7">36pt</option>
                      </select>
                    </div>

                    {/* Row 2: Text Formatting */}
                    <div className="flex flex-wrap items-center gap-1 p-2 border rounded-md bg-muted/50">
                      <Button variant="ghost" size="sm" onClick={() => execCommand("bold")}>
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("italic")}>
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("underline")}>
                        <Underline className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("strikeThrough")}>
                        <Strikethrough className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("subscript")}>
                        <Subscript className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("superscript")}>
                        <Superscript className="h-4 w-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6 mx-1" />

                      <input
                        type="color"
                        className="w-8 h-8 border rounded cursor-pointer"
                        onChange={(e) => changeTextColor(e.target.value)}
                        title="Text Color"
                      />
                      <input
                        type="color"
                        className="w-8 h-8 border rounded cursor-pointer"
                        onChange={(e) => changeBackgroundColor(e.target.value)}
                        title="Background Color"
                      />
                    </div>

                    {/* Row 3: Alignment & Lists */}
                    <div className="flex flex-wrap items-center gap-1 p-2 border rounded-md bg-muted/50">
                      <Button variant="ghost" size="sm" onClick={() => execCommand("justifyLeft")}>
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("justifyCenter")}>
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("justifyRight")}>
                        <AlignRight className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("justifyFull")}>
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6 mx-1" />

                      <Button variant="ghost" size="sm" onClick={() => execCommand("insertUnorderedList")}>
                        <List className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("insertOrderedList")}>
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("outdent")}>
                        <Quote className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("indent")}>
                        <Quote className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>

                    {/* Row 4: Insert Elements */}
                    <div className="flex flex-wrap items-center gap-1 p-2 border rounded-md bg-muted/50">
                      <Button variant="ghost" size="sm" onClick={insertLink}>
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={insertImage}>
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={insertTable}>
                        <Table className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("insertHorizontalRule")}>
                        <Separator className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "blockquote")}>
                        <Quote className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "pre")}>
                        <Code className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Rich Text Editor */}
                  <div className="min-h-[400px] border rounded-md">
                    <div
                      ref={editorRef}
                      contentEditable
                      className="min-h-[400px] p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      style={{
                        lineHeight: "1.6",
                        fontSize: "14px",
                        fontFamily: "Arial, sans-serif",
                      }}
                      onInput={(e) => setEmailContent((e.target as HTMLDivElement).innerHTML)}
                      suppressContentEditableWarning={true}
                      placeholder="Start writing your email content here... You can paste from MS Word and formatting will be preserved!"
                    />
                  </div>

                  <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
                    <strong>💡 Pro Tip:</strong> You can copy and paste directly from Microsoft Word, Google Docs, or
                    any rich text editor. The editor will automatically clean and preserve your formatting!
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                  <CardDescription>Add documents, images, or other files to your email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                    <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                      <Paperclip className="mr-2 h-4 w-4" />
                      Add Attachment
                    </Button>
                    <p className="text-sm text-muted-foreground">Maximum file size: 25MB per file</p>
                  </div>

                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Attached Files</Label>
                      <div className="space-y-2">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center space-x-2">
                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{file.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </Badge>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            /* Preview Mode */
            <Card>
              <CardHeader>
                <CardTitle>Email Preview</CardTitle>
                <CardDescription>This is how your email will appear to recipients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="border-b pb-4 mb-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      <strong>From:</strong> {smtpAccounts.find((s) => s.id === selectedSmtp)?.email}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      <strong>To:</strong> {emailLists.find((list) => list.id === selectedList)?.name}
                    </div>
                    {ccRecipients && (
                      <div className="text-sm text-muted-foreground mb-2">
                        <strong>CC:</strong> {ccRecipients}
                      </div>
                    )}
                    {bccRecipients && (
                      <div className="text-sm text-muted-foreground mb-2">
                        <strong>BCC:</strong> {bccRecipients}
                      </div>
                    )}
                    <h2 className="text-xl font-semibold">{subject || "No subject"}</h2>
                  </div>
                  <div className="prose max-w-none">
                    {emailContent ? (
                      <div dangerouslySetInnerHTML={{ __html: emailContent }} />
                    ) : (
                      <p className="text-muted-foreground italic">No content added yet...</p>
                    )}
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-6 pt-4 border-t">
                      <p className="text-sm font-medium mb-2">Attachments:</p>
                      <div className="space-y-1">
                        {attachments.map((file, index) => (
                          <div key={index} className="text-sm text-blue-600">
                            📎 {file.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Campaign Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Recipients:</span>
                  <span className="font-medium">
                    {emailLists.find((list) => list.id === selectedList)?.count.toLocaleString()}
                  </span>
                </div>
                {ccRecipients && (
                  <div className="flex justify-between text-sm">
                    <span>CC Recipients:</span>
                    <span className="font-medium">{ccRecipients.split(",").length}</span>
                  </div>
                )}
                {bccRecipients && (
                  <div className="flex justify-between text-sm">
                    <span>BCC Recipients:</span>
                    <span className="font-medium">{bccRecipients.split(",").length}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Attachments:</span>
                  <span className="font-medium">{attachments.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Priority:</span>
                  <Badge variant={priority === "high" ? "destructive" : priority === "low" ? "secondary" : "default"}>
                    {priority}
                  </Badge>
                </div>
                {scheduleEmail && (
                  <div className="flex justify-between text-sm">
                    <span>Scheduled:</span>
                    <span className="font-medium">
                      {scheduledDate} {scheduledTime}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Insert */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Insert</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Company Logo
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Unsubscribe Link
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Social Media Links
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Contact Information
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                Email Signature
              </Button>
            </CardContent>
          </Card>

          {/* Personalization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Personalization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                {`{{firstName}}`}
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                {`{{lastName}}`}
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                {`{{email}}`}
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                {`{{companyName}}`}
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                {`{{customField1}}`}
              </Button>
            </CardContent>
          </Card>

          {/* Tracking & Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Open Tracking</span>
                <Badge variant={trackOpens ? "default" : "secondary"}>{trackOpens ? "ON" : "OFF"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Click Tracking</span>
                <Badge variant={trackClicks ? "default" : "secondary"}>{trackClicks ? "ON" : "OFF"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Priority</span>
                <Badge variant={priority === "high" ? "destructive" : "default"}>{priority.toUpperCase()}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
