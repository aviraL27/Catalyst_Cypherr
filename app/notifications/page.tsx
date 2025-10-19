"use client"

import type React from "react"

import { useState } from "react"
import { NotificationsPanel } from "@/components/notifications-panel"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotificationsPage() {
  const [studentEmail, setStudentEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (studentEmail.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4 bg-transparent">
              ← Back to Portal
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">My Notifications</h1>
          <p className="text-slate-400">Check the status of your submitted issues</p>
        </div>

        {!submitted ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Enter Your Email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                required
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                View My Notifications
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <NotificationsPanel studentEmail={studentEmail} />
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false)
                setStudentEmail("")
              }}
              className="mt-6"
            >
              Change Email
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
