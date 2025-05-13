"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    async function getSession() {
      const { data, error } = await supabase.auth.getSession()

      if (data && data.session) {
        setUser(data.session.user)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }

      setLoading(false)
    }

    getSession()

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsAuthenticated(!!session?.user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Login function
  async function login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Signup function
  async function signup(email, password) {
    try {
      // Check password length
      if (password.length < 6) {
        return {
          success: false,
          error: "Password should be at least 6 characters long",
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      // Check if user is created but confirmation is required
      if (data?.user && data?.session === null) {
        return {
          success: true,
          requiresEmailConfirmation: true,
          data,
        }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Signup error:", error)

      // Provide more specific error messages based on the error code
      if (error.message.includes("already registered")) {
        return {
          success: false,
          error: "This email is already registered. Please try logging in instead.",
        }
      }

      return { success: false, error: error.message }
    }
  }

  // Logout function
  async function logout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
