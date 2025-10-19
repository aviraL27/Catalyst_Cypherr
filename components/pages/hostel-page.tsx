"use client"

import { useState } from "react"
import MessFeedbackModal from "@/components/mess-feedback-modal"
import MessMenuModal from "@/components/mess-menu-modal"

interface HostelPageProps {
  onRaiseIssue?: (category: string) => void
}

export default function HostelPage({ onRaiseIssue }: HostelPageProps) {
  const [showMessFeedback, setShowMessFeedback] = useState(false)
  const [showMessMenu, setShowMessMenu] = useState(false)

  return (
    <section className="page active">
      <div className="content">
        <h2>Hostel</h2>
        <p className="muted">Mess menus, maintenance, roommate board and complaint tracker.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "14px" }}>
          <div
            className="card"
            onClick={() => onRaiseIssue?.("Hostel")}
            style={{ cursor: "pointer", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = ""
            }}
          >
            <h3>Raise a Maintenance Ticket</h3>
            <p className="muted">Request repairs, schedule checks and view technician ETA.</p>
          </div>
          <div
            className="card"
            onClick={() => setShowMessFeedback(true)}
            style={{ cursor: "pointer", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = ""
            }}
          >
            <h3>Mess Feedback</h3>
            <p className="muted">Rate meals, request changes or add suggestions for the mess committee.</p>
          </div>
          <div
            className="card"
            onClick={() => setShowMessMenu(true)}
            style={{ cursor: "pointer", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = ""
            }}
          >
            <h3>Mess Menu</h3>
            <p className="muted">View weekly meal plans for breakfast, lunch, snacks and dinner.</p>
          </div>
          <div className="card">
            <h3>Hostel Rules & Notices</h3>
            <p className="muted">Policy documents, late-night permissions and campus guidelines.</p>
          </div>
        </div>
      </div>

      <MessFeedbackModal isOpen={showMessFeedback} onClose={() => setShowMessFeedback(false)} />
      <MessMenuModal isOpen={showMessMenu} onClose={() => setShowMessMenu(false)} />
    </section>
  )
}
