const STORAGE_KEY = "catalyst_issues"

function loadIssues() {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading issues from localStorage:", error)
    return []
  }
}

function saveIssues(issues: any[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(issues))
  } catch (error) {
    console.error("Error saving issues to localStorage:", error)
  }
}

const issues: any[] = loadIssues()

export function addIssue(issue: any) {
  issues.push(issue)
  saveIssues(issues)
  return issue
}

export function getIssues() {
  return issues
}

export function getIssueById(id: string) {
  return issues.find((i) => i.id === id)
}

export function updateIssue(id: string, updates: any) {
  const issue = issues.find((i) => i.id === id)
  if (issue) {
    Object.assign(issue, updates)
    saveIssues(issues)
  }
  return issue
}
