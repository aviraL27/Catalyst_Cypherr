"use client"

import { useState } from "react"

interface MedicalPageProps {
  onRaiseIssue?: (category: string) => void
}

export default function MedicalPage({ onRaiseIssue }: MedicalPageProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  // This ensures only one modal is open at a time

  return (
    <section className="page active">
      <div className="content">
        <h2>Medical</h2>
        <p className="muted">Health services, emergency medical aid, and common medicines.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "14px" }}>
          <div
            className="card"
            onClick={() => onRaiseIssue?.("Medical")}
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
            <h3>Report Health Issue</h3>
            <p className="muted">Submit medical concerns, emergencies, and health-related requests.</p>
          </div>

          <div
            className="card"
            onClick={() => setActiveModal("services")}
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
            <h3>Medical Services</h3>
            <p className="muted">View doctor availability, clinic hours, and health services information.</p>
          </div>

          <div
            className="card"
            onClick={() => setActiveModal("medicines")}
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
            <h3>Common Medicines</h3>
            <p className="muted">Quick reference for common medicines for fever, cold, cough, and other ailments.</p>
          </div>

          <div
            className="card"
            onClick={() => setActiveModal("emergency")}
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
            <h3>Emergency Contacts</h3>
            <p className="muted">Quick access to emergency medical contacts and nearby hospitals.</p>
          </div>
        </div>

        {/* Medical Services Info */}
        {activeModal === "services" && (
          <div
            style={{
              marginTop: "28px",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h3 style={{ margin: 0 }}>Medical Services Information</h3>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Doctor Availability</h4>
                <p className="muted" style={{ fontSize: "14px" }}>
                  <strong>All Days:</strong> 6:00 PM - 7:00 PM
                </p>
                <p className="muted" style={{ fontSize: "14px" }}>
                  <strong>Location:</strong> Hostel Block A, IIIT Nagpur
                </p>
              </div>

              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Services Available</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>General health checkups</li>
                  <li>First aid and emergency care</li>
                  <li>Vaccination services</li>
                  <li>Health counseling</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeModal === "medicines" && (
          <div
            style={{
              marginTop: "28px",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h3 style={{ margin: 0 }}>Common Medicines</h3>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Fever</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>Paracetamol (500mg)</li>
                  <li>Ibuprofen (400mg)</li>
                  <li>Aspirin (500mg)</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Cold & Flu</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>Cetirizine (10mg)</li>
                  <li>Loratadine (10mg)</li>
                  <li>Vitamin C tablets</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Cough</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>Cough syrup (Dextromethorphan)</li>
                  <li>Lozenges</li>
                  <li>Honey & ginger tea</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Headache & Pain</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>Paracetamol (500mg)</li>
                  <li>Ibuprofen (400mg)</li>
                  <li>Aspirin (500mg)</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Stomach Issues</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>Antacid tablets</li>
                  <li>Omeprazole (20mg)</li>
                  <li>Loperamide (for diarrhea)</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Allergies</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>Cetirizine (10mg)</li>
                  <li>Loratadine (10mg)</li>
                  <li>Antihistamine cream</li>
                </ul>
              </div>
            </div>

            <p className="muted" style={{ fontSize: "12px", marginTop: "16px", marginBottom: 0 }}>
              <strong>Note:</strong> These are common over-the-counter medicines. Always consult with the doctor before
              taking any medication. In case of severe symptoms, seek immediate medical attention.
            </p>
          </div>
        )}

        {activeModal === "emergency" && (
          <div
            style={{
              marginTop: "28px",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h3 style={{ margin: 0 }}>Emergency Contacts & Support</h3>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Campus Emergency</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>
                    <strong>Security Office:</strong> +91-XXXX-XXXX-XX
                  </li>
                  <li>
                    <strong>Medical Emergency:</strong> Contact Security
                  </li>
                  <li>
                    <strong>Location:</strong> Hostel Block A, IIIT Nagpur
                  </li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Nearby Hospitals</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>
                    <strong>Nagpur Medical College:</strong> 5 km away
                  </li>
                  <li>
                    <strong>Apollo Hospital:</strong> 8 km away
                  </li>
                  <li>
                    <strong>Ambulance Service:</strong> 102
                  </li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>Emergency Guidelines</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>For life-threatening emergencies, call 102 (Ambulance)</li>
                  <li>Contact security office immediately</li>
                  <li>Inform hostel warden or RA</li>
                  <li>Keep emergency contact numbers handy</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}>After Hours Support</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
                  <li>Doctor available 6:00 PM - 7:00 PM daily</li>
                  <li>Outside hours: Contact security</li>
                  <li>Severe cases: Go to nearest hospital</li>
                  <li>Report issue in portal for follow-up</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
