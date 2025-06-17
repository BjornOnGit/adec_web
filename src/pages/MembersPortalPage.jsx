"use client"

import { useState } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import {
  Home,
  FileText,
  Users,
  Calendar,
  MessageSquare,
  SettingsIcon,
  LogOut,
  Menu,
  X,
  Bell,
  PenTool,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import Button from "../components/ui/Button"

// Import the blog components
import BlogEditor from "../components/blog/BlogEditor"
import MyBlogs from "../components/blog/MyBlogs"
import BlogPreview from "../components/blog/BlogPreview"

// Import the updated portal components
import Events from "../components/portal/Events"
import Documents from "../components/portal/Documents"
import Messages from "../components/portal/Messages"
import Directory from "../components/portal/Directory"
import Settings from "../components/portal/Settings"

// Portal Dashboard Components
const Dashboard = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t("membersPortal.dashboard.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">{t("membersPortal.dashboard.upcomingEvents")}</h3>
          <p className="text-gray-600">{t("membersPortal.dashboard.eventsCount", { count: 3 })}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">{t("membersPortal.dashboard.newMessages")}</h3>
          <p className="text-gray-600">{t("membersPortal.dashboard.messagesCount", { count: 5 })}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">{t("membersPortal.dashboard.membershipStatus")}</h3>
          <p className="text-green-600 font-medium">{t("membersPortal.dashboard.active")}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-lg font-medium mb-4">{t("membersPortal.dashboard.recentActivity")}</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-4">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t(`membersPortal.dashboard.activity${item}.title`)}</p>
                <p className="text-sm text-gray-600">{t(`membersPortal.dashboard.activity${item}.time`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-4">{t("membersPortal.dashboard.upcomingEvents")}</h3>
          <div className="space-y-4">
            {[1, 2].map((event) => (
              <div key={event} className="flex items-start pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-lg bg-primary-light flex flex-col items-center justify-center mr-4 text-primary">
                  <span className="text-xs font-medium">{t(`membersPortal.dashboard.event${event}.month`)}</span>
                  <span className="text-lg font-bold">{t(`membersPortal.dashboard.event${event}.day`)}</span>
                </div>
                <div>
                  <p className="font-medium">{t(`membersPortal.dashboard.event${event}.title`)}</p>
                  <p className="text-sm text-gray-600">{t(`membersPortal.dashboard.event${event}.time`)}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="mt-2">
            {t("membersPortal.dashboard.viewAllEvents")}
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-4">{t("membersPortal.dashboard.resources")}</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((resource) => (
              <div key={resource} className="flex items-start pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">{t(`membersPortal.dashboard.resource${resource}.title`)}</p>
                  <p className="text-sm text-gray-600">{t(`membersPortal.dashboard.resource${resource}.type`)}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="mt-2">
            {t("membersPortal.dashboard.viewAllResources")}
          </Button>
        </div>
      </div>
    </div>
  )
}

const MembersPortalPage = () => {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  const navItems = [
    { path: "/members-portal", icon: <Home size={20} />, label: t("membersPortal.nav.dashboard") },
    { path: "/members-portal/documents", icon: <FileText size={20} />, label: "Documents" },
    { path: "/members-portal/directory", icon: <Users size={20} />, label: "Directory" },
    { path: "/members-portal/events", icon: <Calendar size={20} />, label: "Events" },
    { path: "/members-portal/messages", icon: <MessageSquare size={20} />, label: "Messages" },
    { path: "/members-portal/settings", icon: <SettingsIcon size={20} />, label: t("membersPortal.nav.settings") },
    { path: "/members-portal/blog-editor", icon: <PenTool size={20} />, label: "Blog Editor" },
    { path: "/members-portal/my-blogs", icon: <FileText size={20} />, label: "My Blogs" },
  ]

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 bg-white shadow-md h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t("membersPortal.title")}</h2>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <button
                onClick={logout}
                className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
              >
                <LogOut size={20} className="mr-3" />
                {t("membersPortal.nav.logout")}
              </button>
            </nav>
          </div>
        </aside>

        {/* Mobile sidebar */}
        <div className="md:hidden">
          <button
            onClick={toggleSidebar}
            className="fixed bottom-4 left-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isSidebarOpen ? 0 : "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl pt-20 overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t("membersPortal.title")}</h2>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={closeSidebar}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout()
                    closeSidebar()
                  }}
                  className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
                >
                  <LogOut size={20} className="mr-3" />
                  {t("membersPortal.nav.logout")}
                </button>
              </nav>
            </div>
          </motion.div>

          {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={closeSidebar}></div>}
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {navItems.find((item) => item.path === location.pathname)?.label || t("membersPortal.title")}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-primary transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <span className="hidden sm:inline-block font-medium">John Doe</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                    <Link
                      to="/members-portal/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("membersPortal.nav.settings")}
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("membersPortal.nav.logout")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/events" element={<Events />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/blog-editor" element={<BlogEditor />} />
              <Route path="/blog-editor/:id" element={<BlogEditor />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/blog-preview/:id" element={<BlogPreview />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MembersPortalPage
