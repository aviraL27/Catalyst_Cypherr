"use client"

import { useState } from "react"

interface MessMenuModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MessMenuModal({ isOpen, onClose }: MessMenuModalProps) {
  const [selectedDay, setSelectedDay] = useState("Monday")

  const messMenu = {
    Monday: {
      breakfast: ["Idli", "Sambhar", "Chutney", "Milk", "Tea and Coffee Powder", "Sugar"],
      lunch: ["Aloo Matar", "Dal Tadka", "Chapati", "Rice Normal", "Salad", "Achar", "Papad"],
      snacks: ["Kanda Bhajiya", "French Fries (Masala)", "Tea"],
      dinner: ["Patodi", "Chana Dal", "Jeera Fried Rice", "Chach"],
    },
    Tuesday: {
      breakfast: ["Aalu Paratha", "Milk", "Tea and Coffee Powder", "Sugar", "Bread", "Butter", "Jam"],
      lunch: ["Desi Chana Gravy", "Dal", "Chapati", "Matar Rice", "Curd", "Salad", "Papad", "Achar"],
      snacks: ["Poha-Sev", "Tea"],
      dinner: ["White Mattar Sazi", "Dal Makhni", "Rice", "Salad", "Achar", "Thecha", "Sprouts", "Halwa/Fruit Custard"],
    },
    Wednesday: {
      breakfast: ["Uttapam", "Sambhar", "Chutney", "Milk", "Tea and Coffee Powder", "Sugar", "Bread", "Butter", "Jam"],
      lunch: ["Kadi Pakoda", "Sem Aalu", "Chapati", "Dal Tadka", "Veg Pulao", "Salad", "Achar", "Papad"],
      snacks: ["Pani Puri", "Dhokla", "Tea"],
      dinner: ["Paneer Mattr", "Jeera Rice", "Salad", "Achar"],
    },
    Thursday: {
      breakfast: ["Aloo Puri", "Bread", "Butter", "Jam", "Tea and Coffee Powder", "Sugar", "Milk"],
      lunch: ["Soya Wadi", "Massori Dal", "Rice Normal", "Chapati", "Salad", "Achar"],
      snacks: ["Sabu Dana", "Vada Pav", "Hari and Lal Chutney", "Tea"],
      dinner: ["Sukhe Chane", "Sambhar/Kadhi", "Rice", "Chapati", "Achar", "Salad", "Dahi", "Rasgulla/Gulab Jamun"],
    },
    Friday: {
      breakfast: ["Vada", "Sambhar", "Chutney", "Milk", "Tea and Coffee Powder", "Sugar", "Bread", "Butter", "Jam"],
      lunch: ["Rajma Curry", "Moong Dal", "Veg-Biryani", "Tomato Rice", "Chapati", "Salad", "Achar"],
      snacks: ["Samosa", "Bread-Pakoda", "Tea"],
      dinner: ["Chole Masala", "Mix Dal", "Chapati", "Salad", "Achar", "Papad", "Chach"],
    },
    Saturday: {
      breakfast: ["Poha", "Chana Curry", "Tea and Coffee Powder", "Bread", "Butter", "Jam", "Milk", "Sprouts"],
      lunch: ["Sprouts Sabzi", "Matar Rice", "Salad", "Achar", "Papad", "Tomato Rice", "Raita"],
      snacks: ["Fried Rice", "Maggi", "Tea"],
      dinner: ["Sev Bhaji", "Dal Makhni", "Paratha", "Chapati", "Salad", "Achar", "Thecha"],
    },
    Sunday: {
      breakfast: ["Dosa", "Sambhar", "Chutney", "Milk", "Tea and Coffee Powder", "Sugar", "Bread", "Butter", "Jam"],
      lunch: ["Chhole-Puri", "Rice", "Moong Dal", "Jeera Rice", "Chapati", "Salad", "Achar"],
      snacks: ["Oreo-Biscuits", "Chips", "Cupcake", "Donut", "Tea"],
      dinner: ["Dal Fry", "Paneer Butter Masala", "Chapati", "Salad", "Achar", "Boondi Raita", "Ice Cream/Rasmalai"],
    },
  }

  const mealTimings = {
    breakfast: "7:30 - 9:30",
    lunch: "12:00 - 14:00",
    snacks: "17:30 - 18:30",
    dinner: "19:30 - 21:30",
  }

  if (!isOpen) return null

  const days = Object.keys(messMenu)
  const menu = messMenu[selectedDay as keyof typeof messMenu]

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
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "700px",
          width: "90%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#1a1a1a", margin: 0 }}>Weekly Mess Menu</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ backgroundColor: "#f0f9ff", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#1e40af", fontWeight: "500" }}>
            <strong>Meal Timings:</strong> Breakfast {mealTimings.breakfast} | Lunch {mealTimings.lunch} | Snacks{" "}
            {mealTimings.snacks} | Dinner {mealTimings.dinner}
          </p>
        </div>

        {/* Day Selector */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: selectedDay === day ? "#3b82f6" : "#e5e7eb",
                color: selectedDay === day ? "white" : "#1a1a1a",
                cursor: "pointer",
                fontWeight: selectedDay === day ? "600" : "500",
                fontSize: "14px",
                transition: "all 0.2s ease",
              }}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* Breakfast */}
          <div
            style={{
              backgroundColor: "#fef3c7",
              padding: "16px",
              borderRadius: "8px",
              borderLeft: "4px solid #f59e0b",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "12px", margin: 0 }}>
              Breakfast
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {menu.breakfast.map((item, idx) => (
                <li key={idx} style={{ fontSize: "14px", color: "#4b5563", marginBottom: "6px" }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Lunch */}
          <div
            style={{
              backgroundColor: "#dbeafe",
              padding: "16px",
              borderRadius: "8px",
              borderLeft: "4px solid #3b82f6",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "12px", margin: 0 }}>
              Lunch
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {menu.lunch.map((item, idx) => (
                <li key={idx} style={{ fontSize: "14px", color: "#4b5563", marginBottom: "6px" }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Snacks */}
          <div
            style={{
              backgroundColor: "#fce7f3",
              padding: "16px",
              borderRadius: "8px",
              borderLeft: "4px solid #ec4899",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "12px", margin: 0 }}>
              Snacks
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {menu.snacks.map((item, idx) => (
                <li key={idx} style={{ fontSize: "14px", color: "#4b5563", marginBottom: "6px" }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dinner */}
          <div
            style={{
              backgroundColor: "#d1fae5",
              padding: "16px",
              borderRadius: "8px",
              borderLeft: "4px solid #10b981",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "12px", margin: 0 }}>
              Dinner
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {menu.dinner.map((item, idx) => (
                <li key={idx} style={{ fontSize: "14px", color: "#4b5563", marginBottom: "6px" }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: "20px", padding: "12px 16px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
            <strong>Note:</strong> Coffee is served daily from 5:30 PM - 5:50 PM. Sunday timings: Breakfast 8:00-10:00
            AM, Lunch 12:00-2:00 PM, Snacks 5:30-6:30 PM, Dinner 7:30-9:30 PM
          </p>
        </div>
      </div>
    </div>
  )
}
