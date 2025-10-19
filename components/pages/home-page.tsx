"use client"

import { useEffect, useState } from "react"

interface HomePageProps {
  onNavigate: (page: string) => void
  onRaiseIssue: () => void
}

interface Issue {
  id: string
  status: string
  urgency: string
}

export default function HomePage({ onNavigate, onRaiseIssue }: HomePageProps) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("/api/issues")
        const data = await response.json()
        setIssues(data.issues || [])
      } catch (error) {
        console.error("Error fetching issues:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchIssues()

    const interval = setInterval(fetchIssues, 2000)
    return () => clearInterval(interval)
  }, [])

  const totalIssues = issues.length
  const resolvedIssues = issues.filter((i) => i.status === "resolved").length
  const ongoingIssues = issues.filter((i) => i.status === "open").length
  const raisedIssues = totalIssues

  return (
    <section className="page active">
      <div className="hero">
        <div className="hero-card">
          <h1>Welcome to Catalyst</h1>
          <p>
            Your student-first portal for academic help, hostel issues, announcements and peer support at IIIT Nagpur.
          </p>
          <div className="quick-links">
            <button
              onClick={() => onNavigate("academics")}
              className="ql"
              style={{ background: "var(--card)", border: "1px solid rgba(255, 255, 255, 0.02)" }}
            >
              <div>
                <strong>Academics</strong>
                <span>Grades, timetable, faculty contacts, course resources</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate("hostel")}
              className="ql"
              style={{ background: "var(--card)", border: "1px solid rgba(255, 255, 255, 0.02)" }}
            >
              <div>
                <strong>Hostel</strong>
                <span>Mess feedback, maintenance requests, roommate board</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate("support")}
              className="ql"
              style={{ background: "var(--card)", border: "1px solid rgba(255, 255, 255, 0.02)" }}
            >
              <div>
                <strong>Support</strong>
                <span>Counselling, mentorship, grievance redressal</span>
              </div>
            </button>
          </div>

          <div style={{ marginTop: "18px", display: "flex", gap: "10px" }}>
            <button onClick={onRaiseIssue} className="btn btn-primary">
              Raise an issue
            </button>
            <button className="btn" style={{ background: "rgba(255, 255, 255, 0.05)", color: "white" }}>
              Latest
            </button>
          </div>
        </div>

        <aside style={{ textAlign: "right" }}>
          <div
            className="hero-card"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}
            >
              <h3 style={{ margin: 0 }}>Issue Tickets Status</h3>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                  animation: "pulse 2s infinite",
                }}
              ></div>
            </div>

            <div className="grid" style={{ marginTop: "12px", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {/* Raised Issues Card */}
              <div
                className="card"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.2)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.6)",
                      margin: "0 0 8px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Raised
                  </p>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "32px",
                      fontWeight: "700",
                      background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {loading ? "..." : raisedIssues}
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", margin: "4px 0 0 0" }}>
                    total issues
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "60px",
                    height: "60px",
                    background: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "50%",
                    animation: "float 3s ease-in-out infinite",
                  }}
                ></div>
              </div>

              {/* Resolved Issues Card */}
              <div
                className="card"
                style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(16, 185, 129, 0.2)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.6)",
                      margin: "0 0 8px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Resolved
                  </p>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "32px",
                      fontWeight: "700",
                      background: "linear-gradient(135deg, #10b981, #34d399)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {loading ? "..." : resolvedIssues}
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", margin: "4px 0 0 0" }}>completed</p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "60px",
                    height: "60px",
                    background: "rgba(16, 185, 129, 0.1)",
                    borderRadius: "50%",
                    animation: "float 3s ease-in-out infinite 0.5s",
                  }}
                ></div>
              </div>

              {/* Ongoing Issues Card */}
              <div
                className="card"
                style={{
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(245, 158, 11, 0.2)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.6)",
                      margin: "0 0 8px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Ongoing
                  </p>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "32px",
                      fontWeight: "700",
                      background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {loading ? "..." : ongoingIssues}
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", margin: "4px 0 0 0" }}>
                    in progress
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "60px",
                    height: "60px",
                    background: "rgba(245, 158, 11, 0.1)",
                    borderRadius: "50%",
                    animation: "float 3s ease-in-out infinite 1s",
                  }}
                ></div>
              </div>

              {/* Resolution Rate Card */}
              <div
                className="card"
                style={{
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(139, 92, 246, 0.2)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.6)",
                      margin: "0 0 8px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Resolution Rate
                  </p>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "32px",
                      fontWeight: "700",
                      background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {loading ? "..." : totalIssues > 0 ? `${Math.round((resolvedIssues / totalIssues) * 100)}%` : "0%"}
                  </h4>
                  <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", margin: "4px 0 0 0" }}>
                    success rate
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "60px",
                    height: "60px",
                    background: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "50%",
                    animation: "float 3s ease-in-out infinite 1.5s",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div id="news" className="content">
        <h2 style={{ marginTop: 0 }}>Announcements</h2>
        <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div className="card">
            <h3>Notice</h3>
            <p className="muted">Beehive removal today at 4:00 PM near room 202, Hostel block A. Stay indoors!</p>
          </div>
          <div className="card">
            <h3>Mess Menu Update</h3>
            <p className="muted">Beverage options increased; feedback welcomed via the hostel page.</p>
          </div>
          <div className="card">
            <h3>Endterm Schedule</h3>
            <p className="muted">Dates out — check your course page for slotting and instructions.</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  )
}
