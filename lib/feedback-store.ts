const STORAGE_KEY = "catalyst_feedback"

function loadFeedback() {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading feedback from localStorage:", error)
    return []
  }
}

function saveFeedback(feedback: any[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback))
  } catch (error) {
    console.error("Error saving feedback to localStorage:", error)
  }
}

const feedback: any[] = loadFeedback()

export function addFeedback(item: any) {
  feedback.push(item)
  saveFeedback(feedback)
  return item
}

export function getFeedback() {
  return feedback
}

export function getFeedbackById(id: string) {
  return feedback.find((f) => f.id === id)
}
