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
  Search,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import Button from "../components/ui/Button"

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

const Documents = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t("membersPortal.documents.title")}</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">{t("membersPortal.documents.allDocuments")}</h3>
            <Button variant="outline" size="sm">
              {t("membersPortal.documents.upload")}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("membersPortal.documents.name")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("membersPortal.documents.type")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("membersPortal.documents.size")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("membersPortal.documents.date")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("membersPortal.documents.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((doc) => (
                  <tr key={doc}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div className="text-sm font-medium text-gray-900">
                          {t(`membersPortal.documents.doc${doc}.name`)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{t(`membersPortal.documents.doc${doc}.type`)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{t(`membersPortal.documents.doc${doc}.size`)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{t(`membersPortal.documents.doc${doc}.date`)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="link" size="sm">
                        {t("membersPortal.documents.download")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const Directory = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t("membersPortal.directory.title")}</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">{t("membersPortal.directory.members")}</h3>
          <div className="relative">
            <input
              type="text"
              placeholder={t("membersPortal.directory.search")}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((member) => (
            <div key={member} className="border border-gray-200 rounded-lg p-4 flex items-start">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium">{t(`membersPortal.directory.member${member}.name`)}</h4>
                <p className="text-sm text-gray-600">{t(`membersPortal.directory.member${member}.title`)}</p>
                <p className="text-sm text-gray-600">{t(`membersPortal.directory.member${member}.company`)}</p>
                <div className="mt-2">
                  <Button variant="link" size="sm" className="p-0">
                    {t("membersPortal.directory.viewProfile")}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Events = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t("membersPortal.events.title")}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-medium mb-4">{t("membersPortal.events.upcoming")}</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((event) => (
                <div key={event} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-lg bg-primary-light flex flex-col items-center justify-center mr-4 text-primary">
                      <span className="text-xs font-medium">{t(`membersPortal.events.event${event}.month`)}</span>
                      <span className="text-2xl font-bold">{t(`membersPortal.events.event${event}.day`)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">{t(`membersPortal.events.event${event}.title`)}</h4>
                      <p className="text-sm text-gray-600 mb-2">{t(`membersPortal.events.event${event}.time`)}</p>
                      <p className="text-sm text-gray-600 mb-3">{t(`membersPortal.events.event${event}.location`)}</p>
                      <Button variant="outline" size="sm">
                        {t("membersPortal.events.register")}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-medium mb-4">{t("membersPortal.events.calendar")}</h3>
            <div className="text-center mb-4">
              <h4 className="font-medium">{t("membersPortal.events.month")}</h4>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              <div className="text-gray-500">{t("membersPortal.events.sun")}</div>
              <div className="text-gray-500">{t("membersPortal.events.mon")}</div>
              <div className="text-gray-500">{t("membersPortal.events.tue")}</div>
              <div className="text-gray-500">{t("membersPortal.events.wed")}</div>
              <div className="text-gray-500">{t("membersPortal.events.thu")}</div>
              <div className="text-gray-500">{t("membersPortal.events.fri")}</div>
              <div className="text-gray-500">{t("membersPortal.events.sat")}</div>

              {/* Calendar days */}
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-full ${[5, 12, 19].includes(i + 1) ? "bg-primary text-white" : ""}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Messages = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t("membersPortal.messages.title")}</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <input
                type="text"
                placeholder={t("membersPortal.messages.search")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="overflow-y-auto h-[500px]">
              {[1, 2, 3, 4, 5].map((conversation) => (
                <div
                  key={conversation}
                  className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                    conversation === 1 ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{t(`membersPortal.messages.conversation${conversation}.name`)}</h4>
                        <span className="text-xs text-gray-500">
                          {t(`membersPortal.messages.conversation${conversation}.time`)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {t(`membersPortal.messages.conversation${conversation}.preview`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <h4 className="font-medium">{t("membersPortal.messages.conversation1.name")}</h4>
                <p className="text-xs text-gray-500">{t("membersPortal.messages.online")}</p>
              </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto h-[400px] space-y-4">
              {[1, 2, 3, 4].map((message) => (
                <div key={message} className={`flex ${message % 2 === 0 ? "justify-end" : ""}`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message % 2 === 0 ? "bg-primary text-white rounded-tr-none" : "bg-gray-100 rounded-tl-none"
                    }`}
                  >
                    <p>{t(`membersPortal.messages.message${message}`)}</p>
                    <p className={`text-xs mt-1 ${message % 2 === 0 ? "text-primary-light" : "text-gray-500"}`}>
                      {t(`membersPortal.messages.messageTime${message}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  placeholder={t("membersPortal.messages.typeMessage")}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="rounded-l-none">{t("membersPortal.messages.send")}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Settings = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t("membersPortal.settings.title")}</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">{t("membersPortal.settings.profile")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4"></div>
                <Button variant="outline" size="sm">
                  {t("membersPortal.settings.changePhoto")}
                </Button>
              </div>
            </div>
            <div className="md:col-span-2">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("membersPortal.settings.firstName")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("membersPortal.settings.lastName")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("membersPortal.settings.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("membersPortal.settings.company")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="Acme Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("membersPortal.settings.bio")}
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="Business professional with over 10 years of experience in international trade."
                  ></textarea>
                </div>
                <div>
                  <Button variant="primary">{t("membersPortal.settings.saveChanges")}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <h3 className="text-lg font-medium mb-4">{t("membersPortal.settings.password")}</h3>
          <form className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("membersPortal.settings.currentPassword")}
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("membersPortal.settings.newPassword")}
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("membersPortal.settings.confirmPassword")}
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <Button variant="primary">{t("membersPortal.settings.updatePassword")}</Button>
            </div>
          </form>
        </div>

        <div className="border-t border-gray-200 p-6">
          <h3 className="text-lg font-medium mb-4">{t("membersPortal.settings.notifications")}</h3>
          <div className="space-y-4 max-w-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t("membersPortal.settings.emailNotifications")}</p>
                <p className="text-sm text-gray-600">{t("membersPortal.settings.emailDesc")}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t("membersPortal.settings.eventReminders")}</p>
                <p className="text-sm text-gray-600">{t("membersPortal.settings.eventDesc")}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t("membersPortal.settings.messageNotifications")}</p>
                <p className="text-sm text-gray-600">{t("membersPortal.settings.messageDesc")}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
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
    { path: "/members-portal/documents", icon: <FileText size={20} />, label: t("membersPortal.nav.documents") },
    { path: "/members-portal/directory", icon: <Users size={20} />, label: t("membersPortal.nav.directory") },
    { path: "/members-portal/events", icon: <Calendar size={20} />, label: t("membersPortal.nav.events") },
    { path: "/members-portal/messages", icon: <MessageSquare size={20} />, label: t("membersPortal.nav.messages") },
    { path: "/members-portal/settings", icon: <SettingsIcon size={20} />, label: t("membersPortal.nav.settings") },
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
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MembersPortalPage
