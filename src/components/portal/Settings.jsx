"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Camera, Lock, Bell, Save, Upload, Trash2, Eye, EyeOff, Plus, X, Check, AlertCircle } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { settingsService } from "../../lib/settingsService"
import Button from "../ui/Button"

const Settings = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  // Helper function to ensure we have arrays
  const ensureArray = (value) => {
    if (Array.isArray(value)) return value
    if (typeof value === "string" && value.trim()) {
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      }
    }
    return []
  }

  // Profile state
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    company: "",
    job_title: "",
    location: "",
    website: "",
    linkedin_url: "",
    phone: "",
    skills: [],
    interests: [],
    experience_years: "",
    is_public: true,
  })

  // Avatar state
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email_notifications: true,
    event_reminders: true,
    message_notifications: true,
    newsletter: true,
    marketing_emails: false,
  })

  // Skill/Interest input states
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")

  useEffect(() => {
    loadUserData()
  }, [user])

  const loadUserData = async () => {
    if (!user) return

    setLoading(true)
    try {
      // Load profile
      const profileResult = await settingsService.getUserProfile(user.id)
      if (profileResult.success) {
        const profileData = profileResult.data

        // Ensure skills and interests are arrays
        if (profileData.skills && !Array.isArray(profileData.skills)) {
          profileData.skills = []
        }
        if (profileData.interests && !Array.isArray(profileData.interests)) {
          profileData.interests = []
        }

        setProfile((prev) => ({
          ...prev,
          ...profileData,
          skills: profileData.skills || [],
          interests: profileData.interests || [],
        }))
        setAvatar(profileData.avatar_url)
      }

      // Load notification preferences
      const notifResult = await settingsService.getNotificationPreferences(user.id)
      if (notifResult.success) {
        setNotifications((prev) => ({ ...prev, ...notifResult.data }))
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load user data" })
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async () => {
    setLoading(true)
    try {
      const result = await settingsService.updateProfile(user.id, profile)
      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" })
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update profile" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile" })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = async () => {
    if (!avatarFile) return

    setLoading(true)
    try {
      const result = await settingsService.uploadAvatar(user.id, avatarFile)
      if (result.success) {
        setAvatar(result.data.avatar_url)
        setAvatarPreview(null)
        setAvatarFile(null)
        setMessage({ type: "success", text: "Avatar updated successfully!" })
      } else {
        setMessage({ type: "error", text: result.error || "Failed to upload avatar" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to upload avatar" })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarDelete = async () => {
    setLoading(true)
    try {
      const result = await settingsService.deleteAvatar(user.id)
      if (result.success) {
        setAvatar(null)
        setMessage({ type: "success", text: "Avatar removed successfully!" })
      } else {
        setMessage({ type: "error", text: result.error || "Failed to remove avatar" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to remove avatar" })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" })
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters long" })
      return
    }

    setLoading(true)
    try {
      const result = await settingsService.changePassword(passwordData.currentPassword, passwordData.newPassword)
      if (result.success) {
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
        setMessage({ type: "success", text: "Password changed successfully!" })
      } else {
        setMessage({ type: "error", text: result.error || "Failed to change password" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to change password" })
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationUpdate = async () => {
    setLoading(true)
    try {
      const result = await settingsService.updateNotificationPreferences(user.id, notifications)
      if (result.success) {
        setMessage({ type: "success", text: "Notification preferences updated!" })
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update preferences" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update preferences" })
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setMessage({ type: "error", text: "File size must be less than 5MB" })
        return
      }

      if (!file.type.startsWith("image/")) {
        setMessage({ type: "error", text: "Please select an image file" })
        return
      }

      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setAvatarPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !ensureArray(profile.skills).includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...ensureArray(prev.skills), newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: ensureArray(prev.skills).filter((skill) => skill !== skillToRemove),
    }))
  }

  const addInterest = () => {
    if (newInterest.trim() && !ensureArray(profile.interests).includes(newInterest.trim())) {
      setProfile((prev) => ({
        ...prev,
        interests: [...ensureArray(prev.interests), newInterest.trim()],
      }))
      setNewInterest("")
    }
  }

  const removeInterest = (interestToRemove) => {
    setProfile((prev) => ({
      ...prev,
      interests: ensureArray(prev.interests).filter((interest) => interest !== interestToRemove),
    }))
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "avatar", label: "Avatar", icon: Camera },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  const renderMessage = () => {
    if (!message.text) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`mb-6 p-4 rounded-lg flex items-center ${
          message.type === "success"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}
      >
        {message.type === "success" ? <Check className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />}
        {message.text}
      </motion.div>
    )
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={profile.first_name}
            onChange={(e) => setProfile((prev) => ({ ...prev, first_name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={profile.last_name}
            onChange={(e) => setProfile((prev) => ({ ...prev, last_name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <input
            type="text"
            value={profile.company}
            onChange={(e) => setProfile((prev) => ({ ...prev, company: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            value={profile.job_title}
            onChange={(e) => setProfile((prev) => ({ ...prev, job_title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
          <input
            type="number"
            value={profile.experience_years}
            onChange={(e) => setProfile((prev) => ({ ...prev, experience_years: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={profile.website}
            onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={profile.linkedin_url}
            onChange={(e) => setProfile((prev) => ({ ...prev, linkedin_url: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          value={profile.phone}
          onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Skills Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {ensureArray(profile.skills).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-light text-primary"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="ml-2 text-primary hover:text-primary-dark">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Add a skill..."
          />
          <Button onClick={addSkill} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Interests Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {ensureArray(profile.interests).map((interest, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
            >
              {interest}
              <button onClick={() => removeInterest(interest)} className="ml-2 text-gray-500 hover:text-gray-700">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addInterest()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Add an interest..."
          />
          <Button onClick={addInterest} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Profile Visibility</h3>
            <p className="text-sm text-gray-500">Control whether your profile is visible to other members</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile.is_public}
              onChange={(e) => setProfile((prev) => ({ ...prev, is_public: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleProfileUpdate} disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const renderAvatarTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-block relative">
          {avatar || avatarPreview ? (
            <img
              src={avatarPreview || avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-gray-500 mt-1">Maximum file size: 5MB. Supported formats: JPG, PNG, GIF</p>
      </div>

      {avatarPreview && (
        <div className="flex justify-center gap-4">
          <Button onClick={handleAvatarUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload Avatar"}
            <Upload className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={() => {
              setAvatarPreview(null)
              setAvatarFile(null)
            }}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      )}

      {avatar && !avatarPreview && (
        <div className="flex justify-center">
          <Button onClick={handleAvatarDelete} variant="outline" disabled={loading}>
            {loading ? "Removing..." : "Remove Avatar"}
            <Trash2 className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
        <div className="relative">
          <input
            type={showPasswords.current ? "text" : "password"}
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPasswords.current ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
        <div className="relative">
          <input
            type={showPasswords.new ? "text" : "password"}
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPasswords.new ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
        <div className="relative">
          <input
            type={showPasswords.confirm ? "text" : "password"}
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPasswords.confirm ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handlePasswordChange} disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
          <Lock className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6 max-w-md mx-auto">
      {Object.entries(notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </h3>
            <p className="text-xs text-gray-500">
              {key === "email_notifications" && "Receive general email notifications"}
              {key === "event_reminders" && "Get reminders about upcoming events"}
              {key === "message_notifications" && "Notifications for new messages"}
              {key === "newsletter" && "Receive our regular newsletter"}
              {key === "marketing_emails" && "Promotional and marketing emails"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setNotifications((prev) => ({ ...prev, [key]: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      ))}

      <div className="flex justify-end pt-6">
        <Button onClick={handleNotificationUpdate} disabled={loading}>
          {loading ? "Saving..." : "Save Preferences"}
          <Bell className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {renderMessage()}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "avatar" && renderAvatarTab()}
        {activeTab === "security" && renderSecurityTab()}
        {activeTab === "notifications" && renderNotificationsTab()}
      </motion.div>
    </div>
  )
}

export default Settings
