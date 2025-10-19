import { getStoredPassword } from "@/lib/password-store"

export async function POST(request: Request) {
  const { password } = await request.json()

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
  const storedPassword = getStoredPassword()

  if (password === ADMIN_PASSWORD || password === storedPassword) {
    return Response.json({ token: "admin-token-" + Date.now(), message: "Login successful" }, { status: 200 })
  }

  return Response.json({ message: "Invalid password" }, { status: 401 })
}
