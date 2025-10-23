import { verifyOTP, cleanupExpiredOTPs } from "@/lib/otp-store"

export async function POST(request: Request) {
  try {
    cleanupExpiredOTPs()

    const { email, otp } = await request.json()

    if (!email || !otp) {
      return Response.json({ message: "Email and OTP are required" }, { status: 400 })
    }

    console.log(`[Verify OTP] Attempting to verify OTP for ${email}`)
    const isValid = verifyOTP(email, "", otp) // Pass empty string for btId

    if (isValid) {
      const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")
      console.log(`[Verify OTP] OTP verified successfully for ${email}`)
      return Response.json({ message: "Login successful", token, email }, { status: 200 })
    }

    console.log(`[Verify OTP] OTP verification failed for ${email}`)
    return Response.json({ message: "Invalid or expired OTP" }, { status: 401 })
  } catch (error) {
    console.error("Error:", error)
    return Response.json({ message: "An error occurred" }, { status: 500 })
  }
}
