"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Toaster } from "react-hot-toast"

// Layout components
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import LanguageSwitcher from "./components/common/LanguageSwitcher"

// Pages
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import BlogPage from "./pages/BlogPage"
import BlogPostPage from "./pages/BlogPostPage"
import MembershipPage from "./pages/MembershipPage"
import PartnersPage from "./pages/PartnersPage"
import ContactPage from "./pages/ContactPage"
import MembersPortalPage from "./pages/MembersPortalPage"
import LoginPage from "./pages/LoginPage"
import NotFoundPage from "./pages/NotFoundPage"

// Auth context
import { AuthProvider, useAuth } from "./contexts/AuthContext"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppContent() {
  const { i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
        <div className="text-white text-center">
          <div className="loader mb-4"></div>
          <h1 className="text-3xl font-bold">African Diaspora Economic Council</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/members-portal/*"
              element={
                <ProtectedRoute>
                  <MembersPortalPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <LanguageSwitcher className="fixed bottom-4 right-4 z-40" />
      <Footer />
      <Toaster position="top-center" />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
