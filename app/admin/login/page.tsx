"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("adminToken", data.token)
        router.push("/admin")
      } else {
        setError(data.message || "Invalid password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02))",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          padding: "40px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
        }}
      >
        <h1 style={{ color: "white", marginTop: 0, marginBottom: "8px", fontSize: "28px" }}>Admin Login</h1>
        <p style={{ color: "rgba(255, 255, 255, 0.6)", marginBottom: "24px" }}>Enter your admin password to continue</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.04)",
                color: "white",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && <p style={{ color: "#ff6b6b", fontSize: "14px", margin: 0 }}>{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link href="/" style={{ color: "#3b82f6", textDecoration: "none", fontSize: "14px" }}>
            Back to Portal
          </Link>
        </div>
      </div>
    </div>
  )
}
