"use client"

import { X } from "lucide-react"

interface VisionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function VisionModal({ isOpen, onClose }: VisionModalProps) {
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
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#000000",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
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

        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", color: "#ffffff" }}>Our Vision</h2>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.8",
            color: "#e0e0e0",
            marginBottom: "16px",
          }}
        >
          At The Catalyst, we envision a campus where every student feels heard and empowered. Our mission is to
          eliminate confusion and delays by creating a streamlined, transparent, and efficient system for addressing all
          student issues—from academics to campus life. We believe in fostering a collaborative community where feedback
          directly fuels positive change, making our college not just a place to learn, but a place that listens.
        </p>
      </div>
    </div>
  )
}
