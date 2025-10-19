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
      breakfast: ["Idli", "Sambar", "Chutney", "Tea", "Coffee", "Milk", "Juice"],
      lunch: ["Rice", "Dal Fry", "Chicken Curry", "Salad", "Lassi", "Buttermilk"],
      snacks: ["Pakora", "Tea", "Coffee", "Biscuits", "Lemonade"],
      dinner: ["Roti", "Paneer Butter Masala", "Rice", "Pickle", "Buttermilk", "Lassi"],
    },
    Tuesday: {
      breakfast: ["Dosa", "Sambar", "Chutney", "Tea", "Coffee", "Milk", "Juice"],
      lunch: ["Rice", "Rajma", "Aloo Gobi", "Salad", "Lassi", "Buttermilk"],
      snacks: ["Vada", "Tea", "Coffee", "Biscuits", "Lemonade"],
      dinner: ["Roti", "Chole Bhature", "Salad", "Pickle", "Buttermilk", "Lassi"],
    },
    Wednesday: {
      breakfast: ["Poha", "Jalebi", "Tea", "Coffee", "Milk", "Juice"],
      lunch: ["Rice", "Sambar", "Vegetable Curry", "Salad", "Lassi", "Buttermilk"],
      snacks: ["Chikhalwali", "Tea", "Coffee", "Biscuits", "Lemonade"],
      dinner: ["Roti", "Egg Curry", "Rice", "Pickle", "Buttermilk", "Lassi"],
    },
    Thursday: {
      breakfast: ["Upma", "Chutney", "Tea", "Coffee", "Milk", "Juice"],
      lunch: ["Rice", "Lentil Soup", "Fish Curry", "Salad", "Lassi", "Buttermilk"],
      snacks: ["Murukku", "Tea", "Coffee", "Biscuits", "Lemonade"],
      dinner: ["Roti", "Mutton Curry", "Rice", "Pickle", "Buttermilk", "Lassi"],
    },
    Friday: {
      breakfast: ["Puri", "Aloo Sabzi", "Tea", "Coffee", "Milk", "Juice"],
      lunch: ["Rice", "Dal Makhani", "Paneer Tikka", "Salad", "Lassi", "Buttermilk"],
      snacks: ["Samosa", "Tea", "Coffee", "Biscuits", "Lemonade"],
      dinner: ["Roti", "Biryani", "Raita", "Pickle", "Buttermilk", "Lassi"],
    },
    Saturday: {
      breakfast: ["Paratha", "Pickle", "Tea", "Coffee", "Milk", "Juice"],
      lunch: ["Rice", "Chole", "Aloo Curry", "Salad", "Lassi", "Buttermilk"],
      snacks: ["Jalebi", "Tea", "Coffee", "Biscuits", "Lemonade"],
      dinner: ["Roti", "Tandoori Chicken", "Rice", "Pickle", "Buttermilk", "Lassi"],
    },
    Sunday: {
      breakfast: ["Pancake", "Syrup", "Tea", "Coffee", "Milk", "Juice"],
      lunch: ["Rice", "Sambar", "Vegetable Fry", "Salad", "Lassi", "Buttermilk"],
      snacks: ["Cake", "Tea", "Coffee", "Biscuits", "Lemonade"],
      dinner: ["Roti", "Butter Chicken", "Rice", "Pickle", "Buttermilk", "Lassi"],
    },
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
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
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
      </div>
    </div>
  )
}
