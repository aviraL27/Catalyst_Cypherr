import { addFeedback, getFeedback } from "@/lib/feedback-store"

export async function GET() {
  try {
    const feedback = getFeedback()
    return Response.json({ feedback })
  } catch (error) {
    return Response.json({ error: "Failed to fetch feedback" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const feedback = {
      id: Date.now().toString(),
      ...body,
    }
    addFeedback(feedback)
    return Response.json({ success: true, feedback })
  } catch (error) {
    return Response.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}
