"use client"

// Auth context for managing authentication state across the app
import { createContext, useContext } from "react"

export interface AuthContextType {
  isAuthenticated: boolean
  email: string | null
  btId: string | null
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
