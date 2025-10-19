"use client"

import { useState } from "react"
import VisionModal from "@/components/vision-modal"

interface AboutPageProps {
  onOpenFeedback?: () => void
}

export default function AboutPage({ onOpenFeedback }: AboutPageProps) {
  const [showVision, setShowVision] = useState(false)

  return (
    <section className="page active">
      <div className="content">
        <h2 style={{ fontSize: "48px", marginBottom: "24px" }}>About Catalyst</h2>
        <p className="muted" style={{ fontSize: "20px", lineHeight: "1.6", marginBottom: "32px" }}>
          Built by students, for students. Catalyst is a lightweight portal for surfacing the most common student
          issues, keeping processes transparent, and making help reachable.
        </p>

        <div style={{ display: "flex", gap: "18px", marginTop: "32px", flexWrap: "wrap" }}>
          <div
            onClick={() => setShowVision(true)}
            style={{ flex: 1, minWidth: "260px", padding: "32px", cursor: "pointer" }}
            className="card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <h3 style={{ fontSize: "32px", marginBottom: "16px" }}>Vision</h3>
            <p className="muted" style={{ fontSize: "18px", lineHeight: "1.6" }}>
              Transparent, quick, and student-owned processes for campus life.
            </p>
          </div>
          <div
            onClick={onOpenFeedback}
            style={{ flex: 1, minWidth: "260px", padding: "32px", cursor: "pointer" }}
            className="card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <h3 style={{ fontSize: "32px", marginBottom: "16px" }}>Contribute</h3>
            <p className="muted" style={{ fontSize: "18px", lineHeight: "1.6" }}>
              Share suggestions or report bugs — help us improve Catalyst for everyone.
            </p>
          </div>
        </div>
      </div>

      <VisionModal isOpen={showVision} onClose={() => setShowVision(false)} />
    </section>
  )
}
