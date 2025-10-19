import { getStoredPassword, setStoredPassword } from "@/lib/password-store"

export async function POST(request: Request) {
  const { currentPassword, newPassword } = await request.json()

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
  const storedPassword = getStoredPassword()

  const isCurrentPasswordValid = currentPassword === ADMIN_PASSWORD || currentPassword === storedPassword

  if (!isCurrentPasswordValid) {
    return Response.json({ message: "Current password is incorrect" }, { status: 401 })
  }

  setStoredPassword(newPassword)

  return Response.json({ message: "Password changed successfully" }, { status: 200 })
}
