import { generateOTP, storeOTP } from "@/lib/otp-store"

async function mockSendEmail(email: string, otp: string) {
  console.log("[OTP Service] Mock email sent")
  console.log(`[OTP Service] To: ${email}`)
  console.log(`[OTP Service] OTP: ${otp}`)
  return { success: true, otp }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return Response.json({ message: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ message: "Invalid email format" }, { status: 400 })
    }

    const otp = generateOTP()
    storeOTP(email, "", otp)
    console.log(`[OTP API] Generated OTP ${otp} for ${email}`)

    const result = await mockSendEmail(email, otp)

    return Response.json(
      {
        message: "OTP generated (display mode)",
        email,
        testMode: true,
        otp: otp,
        note: "Test Mode: OTP is displayed below for verification.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error:", error)
    return Response.json({ message: error instanceof Error ? error.message : "An error occurred" }, { status: 500 })
  }
}
