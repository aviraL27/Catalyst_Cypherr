import { type NextRequest, NextResponse } from "next/server"
import { getNotifications, markNotificationAsRead, getUnreadCount } from "@/lib/notifications-store"

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email parameter required" }, { status: 400 })
    }

    const notifications = getNotifications(email)
    const unreadCount = getUnreadCount(email)

    return NextResponse.json({ notifications, unreadCount }, { status: 200 })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { notificationId } = body

    if (!notificationId) {
      return NextResponse.json({ error: "Notification ID required" }, { status: 400 })
    }

    markNotificationAsRead(notificationId)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error marking notification as read:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
