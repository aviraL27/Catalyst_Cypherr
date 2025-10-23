// OTP storage with expiration (using a simple in-memory store with session persistence)
interface OTPRecord {
  otp: string
  email: string
  btId: string
  expiresAt: number
  attempts: number
}

const otpStore = new Map<string, OTPRecord>()

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function storeOTP(email: string, btId: string, otp: string): void {
  const key = `${email}:${btId}`
  otpStore.set(key, {
    otp,
    email,
    btId,
    expiresAt: Date.now() + 15 * 60 * 1000, // Extended to 15 minutes for better UX
    attempts: 0,
  })
  console.log(`[OTP Store] OTP stored for ${email}:${btId}`)
}

export function verifyOTP(email: string, btId: string, otp: string): boolean {
  const key = `${email}:${btId}`
  const record = otpStore.get(key)

  console.log(`[OTP Store] Verifying OTP for ${key}. Record exists: ${!!record}`)

  if (!record) {
    console.log(`[OTP Store] No OTP record found for ${key}`)
    return false
  }

  if (Date.now() > record.expiresAt) {
    console.log(`[OTP Store] OTP expired for ${key}`)
    otpStore.delete(key)
    return false
  }

  if (record.attempts >= 5) {
    console.log(`[OTP Store] Too many attempts for ${key}`)
    otpStore.delete(key)
    return false
  }

  if (record.otp === otp) {
    console.log(`[OTP Store] OTP verified successfully for ${key}`)
    otpStore.delete(key)
    return true
  }

  record.attempts++
  console.log(`[OTP Store] Invalid OTP attempt ${record.attempts} for ${key}`)
  return false
}

export function getOTPRecord(email: string, btId: string): OTPRecord | undefined {
  const key = `${email}:${btId}`
  return otpStore.get(key)
}

export function cleanupExpiredOTPs(): void {
  const now = Date.now()
  for (const [key, record] of otpStore.entries()) {
    if (now > record.expiresAt) {
      otpStore.delete(key)
      console.log(`[OTP Store] Cleaned up expired OTP for ${key}`)
    }
  }
}
