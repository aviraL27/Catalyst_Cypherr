import { type NextRequest, NextResponse } from "next/server"
import { addIssue, getIssues } from "@/lib/issues-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.btId || !body.name || !body.email || !body.category || !body.urgency || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create issue object
    const issue = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      status: "open",
    }

    // Store issue using shared store
    addIssue(issue)

    console.log("Issue submitted:", issue)

    return NextResponse.json({ success: true, issue }, { status: 201 })
  } catch (error) {
    console.error("Error processing issue:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  // Return all issues from shared store
  return NextResponse.json({ issues: getIssues() })
}
