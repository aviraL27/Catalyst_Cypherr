"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import HomePage from "@/components/pages/home-page"
import AcademicsPage from "@/components/pages/academics-page"
import HostelPage from "@/components/pages/hostel-page"
import SupportPage from "@/components/pages/support-page"
import AboutPage from "@/components/pages/about-page"
import MedicalPage from "@/components/pages/medical-page"
import IssueModal from "@/components/issue-modal"
import FacultyDirectoryModal from "@/components/faculty-directory-modal"
import FeedbackModal from "@/components/feedback-modal"

type PageType = "home" | "academics" | "hostel" | "medical" | "support" | "about"

export default function RootPage() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [showIssueModal, setShowIssueModal] = useState(false)
  const [preselectedCategory, setPreselectedCategory] = useState<string>("")
  const [showFacultyDirectory, setShowFacultyDirectory] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("studentToken")
    if (token) {
      setIsAuthenticated(true)
    } else {
      router.push("/student/login")
    }
    setIsLoading(false)
  }, [router])

  const handleRaiseIssue = (category?: string) => {
    if (category) {
      setPreselectedCategory(category)
    } else {
      setPreselectedCategory("")
    }
    setShowIssueModal(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("studentToken")
    localStorage.removeItem("studentEmail")
    localStorage.removeItem("studentBtId")
    router.push("/student/login")
  }

  if (isLoading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "white" }}>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const pages: Record<PageType, React.ReactNode> = {
    home: <HomePage onNavigate={setCurrentPage} onRaiseIssue={() => handleRaiseIssue()} />,
    academics: <AcademicsPage onOpenFacultyDirectory={() => setShowFacultyDirectory(true)} />,
    hostel: <HostelPage onRaiseIssue={handleRaiseIssue} />,
    medical: <MedicalPage onRaiseIssue={handleRaiseIssue} />,
    support: <SupportPage onRaiseIssue={() => handleRaiseIssue()} />,
    about: <AboutPage onOpenFeedback={() => setShowFeedbackModal(true)} />,
  }

  return (
    <div className="site">
      <AnimatedBackground />
      <Header currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
      <main>
        <div className="page active">{pages[currentPage]}</div>
      </main>
      <Footer />
      <IssueModal
        isOpen={showIssueModal}
        onClose={() => {
          setPreselectedCategory("")
          setShowIssueModal(false)
        }}
        preselectedCategory={preselectedCategory}
      />
      <FacultyDirectoryModal isOpen={showFacultyDirectory} onClose={() => setShowFacultyDirectory(false)} />
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
    </div>
  )
}
