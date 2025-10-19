"use client"

import { useState } from "react"
import FacultyDirectoryModal from "@/components/faculty-directory-modal"
import { useToast } from "@/hooks/use-toast"

interface AcademicsPageProps {
  onRaiseIssue?: (category: string) => void
}

export default function AcademicsPage({ onRaiseIssue }: AcademicsPageProps) {
  const [showFacultyDirectory, setShowFacultyDirectory] = useState(false)
  const { toast } = useToast()

  const handleTimetableClick = () => {
    window.open(
      "https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vRfQ4y9QJMRVpm-VcnnQ2IhZGQAs9RqM_fRFOUngZpGO7n77iSKOJLrEzXvkE0dxg/pubhtml?gid=1622894700&single=true",
      "_blank",
    )
  }

  const handleOccupancyClick = () => {
    window.open("https://www.iiitn.ac.in/academics/timetable", "_blank")
  }

  return (
    <section className="page active">
      <div className="content">
        <h2>Academics</h2>
        <p className="muted">Faculty directory, course materials, grades and timetable.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "14px" }}>
          <div
            className="card"
            onClick={() => setShowFacultyDirectory(true)}
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
            <h3>Faculty Directory</h3>
            <p className="muted">Find faculty contact information, office hours and research interests.</p>
          </div>

          <div
            className="card"
            onClick={() => window.open("https://www.iiitn.ac.in/academics/curricula", "_blank")}
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
            <h3>My Syllabus</h3>
            <p className="muted">Access course syllabi and academic requirements.</p>
          </div>

          <div
            className="card"
            onClick={handleOccupancyClick}
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
            <h3>Class and Lab Occupancy</h3>
            <p className="muted">Check real-time availability of classrooms and laboratory facilities.</p>
          </div>

          <div
            className="card"
            onClick={handleTimetableClick}
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
            <h3>Timetable</h3>
            <p className="muted">Check your class schedule and exam dates.</p>
          </div>
        </div>
      </div>

      <FacultyDirectoryModal isOpen={showFacultyDirectory} onClose={() => setShowFacultyDirectory(false)} />
    </section>
  )
}
