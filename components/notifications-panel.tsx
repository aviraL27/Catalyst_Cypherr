"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  studentEmail: string
  issueId: string
  message: string
  read: boolean
  createdAt: string
}

export function NotificationsPanel({ studentEmail }: { studentEmail: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 5000) // Poll every 5 seconds
    return () => clearInterval(interval)
  }, [studentEmail])

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/notifications?email=${encodeURIComponent(studentEmail)}`)
      const data = await response.json()
      setNotifications(data.notifications || [])
      setUnreadCount(data.unreadCount || 0)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId }),
      })
      fetchNotifications()
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  if (loading) {
    return <p className="text-slate-400">Loading notifications...</p>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Notifications</h2>
        {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} Unread</Badge>}
      </div>

      {notifications.length === 0 ? (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <p className="text-slate-400">No notifications yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-slate-700 transition-colors ${
                notification.read ? "bg-slate-800/30" : "bg-slate-800/50 border-blue-500/50"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base text-white">{notification.message}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {new Date(notification.createdAt).toLocaleDateString()} at{" "}
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </CardDescription>
                  </div>
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="ml-2"
                    >
                      Mark Read
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
