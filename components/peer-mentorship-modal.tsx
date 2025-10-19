"use client"

import { useState } from "react"
import { X, Mail, Phone } from "lucide-react"

interface Mentor {
  id: number
  name: string
  year: string
  department: string
  skills: string[]
  email: string
  phone: string
  bio: string
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Mentor A",
    year: "3rd Year",
    department: "Computer Science",
    skills: ["Competitive Programming", "Data Structures", "Algorithms"],
    email: "**** **** 1234",
    phone: "**** **** 5678",
    bio: "Passionate about problem-solving and competitive programming.",
  },
  {
    id: 2,
    name: "Mentor B",
    year: "4th Year",
    department: "Computer Science",
    skills: ["Web Development", "React", "Node.js"],
    email: "**** **** 2345",
    phone: "**** **** 6789",
    bio: "Full-stack developer with expertise in modern web technologies.",
  },
  {
    id: 3,
    name: "Mentor C",
    year: "3rd Year",
    department: "Electronics",
    skills: ["Machine Learning", "Python", "TensorFlow"],
    email: "**** **** 3456",
    phone: "**** **** 7890",
    bio: "AI/ML enthusiast helping students with deep learning projects.",
  },
  {
    id: 4,
    name: "Mentor D",
    year: "2nd Year",
    department: "Computer Science",
    skills: ["Mobile Development", "Flutter", "Android"],
    email: "**** **** 4567",
    phone: "**** **** 8901",
    bio: "Mobile app developer with experience in cross-platform development.",
  },
  {
    id: 5,
    name: "Mentor E",
    year: "4th Year",
    department: "Electronics",
    skills: ["Circuit Design", "Embedded Systems", "Arduino"],
    email: "**** **** 5678",
    phone: "**** **** 9012",
    bio: "Electronics expert specializing in circuit design and embedded systems projects.",
  },
  {
    id: 6,
    name: "Mentor F",
    year: "3rd Year",
    department: "Computer Science",
    skills: ["Database Design", "SQL", "System Design"],
    email: "**** **** 6789",
    phone: "**** **** 0123",
    bio: "Database architect helping with complex data management systems.",
  },
]

interface PeerMentorshipModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PeerMentorshipModal({ isOpen, onClose }: PeerMentorshipModalProps) {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)

  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--background)",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "800px",
          maxHeight: "80vh",
          overflow: "auto",
          position: "relative",
          animation: "slideUp 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            borderBottom: "1px solid var(--border)",
            position: "sticky",
            top: 0,
            backgroundColor: "var(--background)",
          }}
        >
          <h2>{selectedMentor ? selectedMentor.name : "Peer Mentors"}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: "20px" }}>
          {!selectedMentor ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  onClick={() => setSelectedMentor(mentor)}
                  style={{
                    padding: "16px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backgroundColor: "var(--card)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  <h3 style={{ marginBottom: "4px", color: "var(--foreground)" }}>{mentor.name}</h3>
                  <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginBottom: "8px" }}>
                    {mentor.year} • {mentor.department}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                    {mentor.skills.slice(0, 2).map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: "11px",
                          backgroundColor: "var(--primary)",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.skills.length > 2 && (
                      <span
                        style={{
                          fontSize: "11px",
                          backgroundColor: "var(--muted)",
                          color: "var(--muted-foreground)",
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        +{mentor.skills.length - 2}
                      </span>
                    )}
                  </div>
                  <button
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSelectedMentor(null)}
                style={{
                  marginBottom: "16px",
                  padding: "8px 12px",
                  backgroundColor: "var(--muted)",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ← Back to Mentors
              </button>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                <div>
                  <h3 style={{ marginBottom: "12px" }}>About</h3>
                  <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>{selectedMentor.bio}</p>

                  <h3 style={{ marginBottom: "12px" }}>Year & Department</h3>
                  <p style={{ marginBottom: "4px" }}>
                    <strong>Year:</strong> {selectedMentor.year}
                  </p>
                  <p style={{ marginBottom: "16px" }}>
                    <strong>Department:</strong> {selectedMentor.department}
                  </p>
                </div>

                <div>
                  <h3 style={{ marginBottom: "12px" }}>Skills</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                    {selectedMentor.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "13px",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ marginBottom: "12px" }}>Contact</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <Mail size={18} />
                    <span style={{ fontSize: "14px" }}>{selectedMentor.email}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Phone size={18} />
                    <span style={{ fontSize: "14px" }}>{selectedMentor.phone}</span>
                  </div>
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "12px",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Request Mentorship
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
