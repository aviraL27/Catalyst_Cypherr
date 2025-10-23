// Session management utilities for student authentication
export interface StudentSession {
  token: string
  email: string
  btId: string
}

export function getStudentSession(): StudentSession | null {
  if (typeof window === "undefined") {
    return null
  }

  const token = localStorage.getItem("studentToken")
  const email = localStorage.getItem("studentEmail")
  const btId = localStorage.getItem("studentBtId")

  if (token && email && btId) {
    return { token, email, btId }
  }

  return null
}

export function setStudentSession(session: StudentSession): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("studentToken", session.token)
    localStorage.setItem("studentEmail", session.email)
    localStorage.setItem("studentBtId", session.btId)
  }
}

export function clearStudentSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("studentToken")
    localStorage.removeItem("studentEmail")
    localStorage.removeItem("studentBtId")
  }
}

export function isStudentAuthenticated(): boolean {
  return getStudentSession() !== null
}
