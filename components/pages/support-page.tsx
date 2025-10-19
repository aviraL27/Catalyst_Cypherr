"use client"

import { useState } from "react"
import EmergencyContactsModal from "@/components/emergency-contacts-modal"
import PeerMentorshipModal from "@/components/peer-mentorship-modal"

interface SupportPageProps {
  onRaiseIssue: () => void
}

export default function SupportPage({ onRaiseIssue }: SupportPageProps) {
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false)
  const [showPeerMentorship, setShowPeerMentorship] = useState(false)

  return (
    <section className="page active">
      <div className="content">
        <h2>Support</h2>
        <p className="muted">Counselling, grievances, mentorship and quick help for urgent issues.</p>

        <div style={{ display: "flex", gap: "18px", marginTop: "18px", flexDirection: "column" }}>
          <div className="card">
            <h3>Raise a Grievance</h3>
            <p className="muted">Formal grievance submission with tracking and escalation.</p>
            <button onClick={onRaiseIssue} className="btn btn-primary" style={{ marginTop: "12px" }}>
              Submit Grievance
            </button>
          </div>

          <div className="card">
            <h3>Peer Mentorship</h3>
            <p className="muted">Connect with senior mentors and club tutors.</p>
            <button
              onClick={() => setShowPeerMentorship(true)}
              className="btn btn-primary"
              style={{ marginTop: "12px" }}
            >
              Find Mentors
            </button>
          </div>

          <div className="card">
            <h3>Emergency Contacts</h3>
            <p className="muted">Immediate help lines and campus security details.</p>
            <button
              onClick={() => setShowEmergencyContacts(true)}
              className="btn btn-primary"
              style={{ marginTop: "12px" }}
            >
              View Contacts
            </button>
          </div>
        </div>
      </div>

      <EmergencyContactsModal isOpen={showEmergencyContacts} onClose={() => setShowEmergencyContacts(false)} />
      <PeerMentorshipModal isOpen={showPeerMentorship} onClose={() => setShowPeerMentorship(false)} />
    </section>
  )
}
