"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState<"suggestion" | "bug">("suggestion")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: feedbackType,
          title,
          description,
          createdAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setTitle("")
          setDescription("")
          setFeedbackType("suggestion")
          setSubmitted(false)
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("Error submitting feedback")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#000000",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          <X size={24} color="#ffffff" />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
              }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", color: "#ffffff" }}>Thank You!</h2>
            <p style={{ color: "#cccccc", marginBottom: "16px" }}>
              Your {feedbackType === "suggestion" ? "suggestion" : "bug report"} has been received. We appreciate your
              contribution to making Catalyst better!
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px", color: "#ffffff" }}>
              Share Your Feedback
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Feedback Type */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                  Feedback Type
                </label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      value="suggestion"
                      checked={feedbackType === "suggestion"}
                      onChange={(e) => setFeedbackType(e.target.value as "suggestion" | "bug")}
                      style={{ cursor: "pointer" }}
                    />
                    <span style={{ color: "#ffffff" }}>Suggestion</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      value="bug"
                      checked={feedbackType === "bug"}
                      onChange={(e) => setFeedbackType(e.target.value as "suggestion" | "bug")}
                      style={{ cursor: "pointer" }}
                    />
                    <span style={{ color: "#ffffff" }}>Bug Report</span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief title of your feedback"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #444444",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#ffffff" }}>
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide details about your feedback"
                  required
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #444444",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    resize: "vertical",
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "1px solid #444444",
                    backgroundColor: "#2a2a2a",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
