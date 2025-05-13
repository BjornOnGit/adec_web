"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import Button from "../ui/Button"
import Logo from "../common/Logo"

const Navbar = () => {
  const { t } = useTranslation()
  const { isAuthenticated, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.membership"), path: "/membership" },
    { name: t("nav.partners"), path: "/partners" },
    { name: t("nav.contact"), path: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-10 w-auto" />
          <span
            className={`ml-2 font-bold text-lg transition-colors duration-300 ${
              scrolled ? "text-primary" : "text-white"
            }`}
          >
            ADEC
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? "text-gray-800" : "text-white"
              } ${location.pathname === link.path ? "text-primary" : ""}`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="relative group">
              <button
                className={`flex items-center font-medium transition-colors duration-300 hover:text-primary ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                <User className="mr-1 h-4 w-4" />
                {t("nav.account")}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                <Link to="/members-portal" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {t("nav.membersPortal")}
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t("nav.logout")}
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary">{t("nav.login")}</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden z-50 transition-colors duration-300 ${
            isOpen ? "text-white" : scrolled ? "text-gray-800" : "text-white"
          }`}
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-primary flex flex-col justify-center items-center lg:hidden z-40"
            >
              <div className="flex flex-col items-center space-y-6 text-white">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-xl font-medium hover:text-secondary"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                ))}

                {isAuthenticated ? (
                  <>
                    <Link to="/members-portal" className="text-xl font-medium hover:text-secondary" onClick={closeMenu}>
                      {t("nav.membersPortal")}
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        closeMenu()
                      }}
                      className="text-xl font-medium hover:text-secondary"
                    >
                      {t("nav.logout")}
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="text-xl font-medium hover:text-secondary" onClick={closeMenu}>
                    {t("nav.login")}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navbar
