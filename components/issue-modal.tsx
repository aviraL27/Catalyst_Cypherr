"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface IssueModalProps {
  isOpen: boolean
  onClose: () => void
  preselectedCategory?: string
}

export default function IssueModal({ isOpen, onClose, preselectedCategory }: IssueModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    btId: "",
    name: "",
    email: "",
    category: preselectedCategory || "",
    urgency: "",
    description: "",
  })

  useEffect(() => {
    if (preselectedCategory) {
      setFormData((prev) => ({ ...prev, category: preselectedCategory }))
    }
  }, [preselectedCategory, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Issue submitted successfully!")
        setFormData({
          btId: "",
          name: "",
          email: "",
          category: preselectedCategory || "",
          urgency: "",
          description: "",
        })
        onClose()
      } else {
        alert("Failed to submit issue. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting issue:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02))",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          color: "white",
          padding: "28px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
          animation: "fadeInUp 0.25s ease",
          position: "relative",
          zIndex: 1001,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginTop: 0, marginBottom: "14px", fontSize: "22px" }}>Raise an Issue</h2>
        <p className="muted" style={{ marginTop: 0, marginBottom: "20px" }}>
          Fill in the details below to log your issue. Our team will get back within 24–48 hrs.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input
            type="text"
            name="btId"
            placeholder="BT ID"
            required
            value={formData.btId}
            onChange={handleChange}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.04)",
              color: "white",
            }}
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.04)",
              color: "white",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email (for follow-up)"
            required
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.04)",
              color: "white",
            }}
          />

          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            style={
              {
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.04)",
                color: "white",
                position: "relative",
                zIndex: 1002,
                colorScheme: "dark",
              } as React.CSSProperties
            }
          >
            <option value="">Category</option>
            <option>Academics</option>
            <option>Hostel</option>
            <option>Support</option>
            <option>Other</option>
          </select>

          <select
            name="urgency"
            required
            value={formData.urgency}
            onChange={handleChange}
            style={
              {
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.04)",
                color: "white",
                position: "relative",
                zIndex: 1002,
                colorScheme: "dark",
              } as React.CSSProperties
            }
          >
            <option value="">Urgency</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <textarea
            name="description"
            placeholder="Describe your issue..."
            required
            value={formData.description}
            onChange={handleChange}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.04)",
              color: "white",
              minHeight: "100px",
            }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "6px" }}>
            <button
              type="button"
              onClick={onClose}
              className="btn"
              style={{ background: "rgba(255, 255, 255, 0.05)", color: "white" }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
