import { type NextRequest, NextResponse } from "next/server"
import { getIssueById, updateIssue } from "@/lib/issues-store"
import { addNotification } from "@/lib/notifications-store"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const issueId = params.id

    // Get issue from shared store
    const issue = getIssueById(issueId)
    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 })
    }

    // Update issue status using shared store
    const updatedIssue = updateIssue(issueId, {
      status: "resolved",
      resolvedAt: new Date().toISOString(),
    })

    // Create notification for student
    const notification = addNotification(
      issue.email,
      issueId,
      `Your issue "${issue.category}" has been resolved. We appreciate your patience!`,
    )

    console.log("Issue resolved:", updatedIssue)
    console.log("Notification sent:", notification)

    return NextResponse.json({ success: true, issue: updatedIssue, notification }, { status: 200 })
  } catch (error) {
    console.error("Error resolving issue:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
