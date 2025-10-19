"use client"

import { useState } from "react"
import { X, Star } from "lucide-react"

interface MessFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MessFeedbackModal({ isOpen, onClose }: MessFeedbackModalProps) {
  const [ratings, setRatings] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0,
  })
  const [suggestions, setSuggestions] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleRating = (meal: keyof typeof ratings, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [meal]: rating,
    }))
  }

  const handleSubmit = () => {
    const feedback = {
      ratings,
      suggestions,
      timestamp: new Date().toISOString(),
    }
    console.log("[v0] Mess feedback submitted:", feedback)

    // Store feedback in localStorage
    const existingFeedback = JSON.parse(localStorage.getItem("messFeedback") || "[]")
    existingFeedback.push(feedback)
    localStorage.setItem("messFeedback", JSON.stringify(existingFeedback))

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setRatings({ breakfast: 0, lunch: 0, snacks: 0, dinner: 0 })
      setSuggestions("")
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Mess Feedback</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="modal-body" style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
            <h3>Thank you for your feedback!</h3>
            <p className="muted">Your suggestions have been recorded and will help improve our mess services.</p>
          </div>
        ) : (
          <div className="modal-body">
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>Rate Your Meals (Out of 5)</h3>

              {/* Breakfast Rating */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                  Breakfast
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating("breakfast", star)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <Star
                        size={24}
                        fill={star <= ratings.breakfast ? "#fbbf24" : "none"}
                        stroke={star <= ratings.breakfast ? "#fbbf24" : "#d1d5db"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Lunch Rating */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                  Lunch
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating("lunch", star)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <Star
                        size={24}
                        fill={star <= ratings.lunch ? "#fbbf24" : "none"}
                        stroke={star <= ratings.lunch ? "#fbbf24" : "#d1d5db"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Snacks Rating */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                  Snacks
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating("snacks", star)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <Star
                        size={24}
                        fill={star <= ratings.snacks ? "#fbbf24" : "none"}
                        stroke={star <= ratings.snacks ? "#fbbf24" : "#d1d5db"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Dinner Rating */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                  Dinner
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating("dinner", star)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <Star
                        size={24}
                        fill={star <= ratings.dinner ? "#fbbf24" : "none"}
                        stroke={star <= ratings.dinner ? "#fbbf24" : "#d1d5db"}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
                What would you like to be changed or improved?
              </label>
              <textarea
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="Share your suggestions for improvement..."
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#3b82f6")}
              >
                Submit Feedback
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#f3f4f6")}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
