"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChangePasswordModal } from "@/components/change-password-modal"

interface Issue {
  id: string
  btId: string
  name: string
  email: string
  category: string
  urgency: string
  description: string
  createdAt: string
  status: string
}

interface Feedback {
  id: string
  type: "suggestion" | "bug"
  title: string
  description: string
  createdAt: string
}

export default function AdminDashboard() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<"issues" | "feedback">("issues")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [resolvingId, setResolvingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      setAuthLoading(false)
      fetchIssues()
      fetchFeedback()
    }
  }, [router])

  const fetchIssues = async () => {
    try {
      const response = await fetch("/api/issues")
      const data = await response.json()
      setIssues(data.issues || [])
    } catch (error) {
      console.error("Error fetching issues:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFeedback = async () => {
    try {
      const response = await fetch("/api/feedback")
      const data = await response.json()
      setFeedback(data.feedback || [])
    } catch (error) {
      console.error("Error fetching feedback:", error)
    }
  }

  const handleResolveIssue = async (issueId: string) => {
    setResolvingId(issueId)
    try {
      const response = await fetch(`/api/issues/${issueId}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        // Update local state
        setIssues(issues.map((issue) => (issue.id === issueId ? { ...issue, status: "resolved" } : issue)))
        alert("Issue marked as resolved and student notified!")
      } else {
        alert("Error resolving issue")
      }
    } catch (error) {
      console.error("Error resolving issue:", error)
      alert("Error resolving issue")
    } finally {
      setResolvingId(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const filteredIssues = filter === "all" ? issues : issues.filter((issue) => issue.urgency === filter)

  const sortedIssues = [...filteredIssues].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "default"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      academic: "bg-blue-500/20 text-blue-300",
      hostel: "bg-purple-500/20 text-purple-300",
      infrastructure: "bg-green-500/20 text-green-300",
      other: "bg-gray-500/20 text-gray-300",
    }
    return colors[category.toLowerCase()] || colors.other
  }

  const getStatusColor = (status: string) => {
    return status === "resolved" ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">View and manage all student complaints and feedback</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setShowPasswordModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
            >
              Change Password
            </Button>
            <Link href="/">
              <Button className="bg-slate-600 hover:bg-slate-700 text-white border-0">Back to Portal</Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive" className="bg-red-600 hover:bg-red-700">
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <Button
            onClick={() => setActiveTab("issues")}
            className={`${
              activeTab === "issues"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-700 hover:bg-slate-600 text-white"
            } border-0`}
          >
            Issues ({issues.length})
          </Button>
          <Button
            onClick={() => setActiveTab("feedback")}
            className={`${
              activeTab === "feedback"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-700 hover:bg-slate-600 text-white"
            } border-0`}
          >
            Feedback ({feedback.length})
          </Button>
        </div>

        {/* Issues Tab */}
        {activeTab === "issues" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{issues.length}</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Critical</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-400">
                    {issues.filter((i) => i.urgency === "critical").length}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">High Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">
                    {issues.filter((i) => i.urgency === "high").length}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Open</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">
                    {issues.filter((i) => i.status === "open").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filter Buttons */}
            <div className="mb-6 flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
              >
                All Issues
              </Button>
              <Button
                variant={filter === "critical" ? "default" : "outline"}
                onClick={() => setFilter("critical")}
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
              >
                Critical
              </Button>
              <Button
                variant={filter === "high" ? "default" : "outline"}
                onClick={() => setFilter("high")}
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
              >
                High
              </Button>
              <Button
                variant={filter === "medium" ? "default" : "outline"}
                onClick={() => setFilter("medium")}
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
              >
                Medium
              </Button>
              <Button
                variant={filter === "low" ? "default" : "outline"}
                onClick={() => setFilter("low")}
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
              >
                Low
              </Button>
              <Button
                onClick={fetchIssues}
                variant="outline"
                className="ml-auto border-slate-600 text-white hover:bg-slate-700 bg-transparent"
              >
                Refresh
              </Button>
            </div>

            {/* Issues List */}
            <div className="space-y-4">
              {loading ? (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <p className="text-slate-400">Loading issues...</p>
                  </CardContent>
                </Card>
              ) : filteredIssues.length === 0 ? (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <p className="text-slate-400">No issues found</p>
                  </CardContent>
                </Card>
              ) : (
                sortedIssues.map((issue) => (
                  <Card
                    key={issue.id}
                    className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <CardTitle className="text-lg text-white">{issue.name}</CardTitle>
                            <Badge variant={getUrgencyColor(issue.urgency) as any}>{issue.urgency.toUpperCase()}</Badge>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(issue.category)}`}
                            >
                              {issue.category}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(issue.status)}`}>
                              {issue.status.toUpperCase()}
                            </span>
                          </div>
                          <CardDescription className="text-slate-400">
                            BT ID: {issue.btId} • Email: {issue.email}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">{new Date(issue.createdAt).toLocaleDateString()}</p>
                          <p className="text-xs text-slate-500">{new Date(issue.createdAt).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 leading-relaxed mb-4">{issue.description}</p>
                      {issue.status === "open" && (
                        <Button
                          onClick={() => handleResolveIssue(issue.id)}
                          disabled={resolvingId === issue.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {resolvingId === issue.id ? "Resolving..." : "Mark as Resolved"}
                        </Button>
                      )}
                      {issue.status === "resolved" && (
                        <p className="text-green-400 text-sm">✓ This issue has been resolved</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div className="space-y-4">
            {feedback.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6">
                  <p className="text-slate-400">No feedback received yet</p>
                </CardContent>
              </Card>
            ) : (
              feedback
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((item) => (
                  <Card
                    key={item.id}
                    className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                            <Badge
                              variant={item.type === "bug" ? "destructive" : "default"}
                              className={item.type === "bug" ? "bg-red-600" : "bg-blue-600"}
                            >
                              {item.type === "bug" ? "BUG REPORT" : "SUGGESTION"}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                          <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        )}
      </div>

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={() => {
          // Optional: show success message or refresh
        }}
      />
    </div>
  )
}
