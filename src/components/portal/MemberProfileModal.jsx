"use client"

import { useState } from "react"
import { X, MapPin, Building, Briefcase, Globe, Linkedin, MessageCircle, Calendar } from "lucide-react"
import { messagesService } from "../../lib/messagesService"
import Button from "../ui/Button"

const MemberProfileModal = ({ member, onClose, currentUserId, onStartConversation }) => {
  const [loading, setLoading] = useState(false)

  const handleStartConversation = async () => {
    if (!member || !currentUserId || member.id === currentUserId) return

    setLoading(true)
    try {
      const result = await messagesService.createOrGetConversation(currentUserId, member.id)
      if (result.success) {
        const conversation = result.data
        if (onStartConversation) {
          onStartConversation(conversation, member)
        }
        onClose()
      } else {
        console.error("Error starting conversation:", result.error)
      }
    } catch (error) {
      console.error("Error starting conversation:", error)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
  }

  const formatMemberSince = (date) => {
    if (!date) return "Recently joined"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Member Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="flex items-start gap-6 mb-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {member.avatar_url ? (
                <img
                  src={member.avatar_url || "/placeholder.svg"}
                  alt={`${member.first_name} ${member.last_name}`}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-medium">
                  {getInitials(member.first_name, member.last_name)}
                </div>
              )}
            </div>

            {/* Name and Title */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {member.first_name} {member.last_name}
              </h3>

              {member.job_title && <p className="text-lg text-gray-600 mb-2">{member.job_title}</p>}

              {member.company && (
                <div className="flex items-center text-gray-600 mb-2">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{member.company}</span>
                </div>
              )}

              {member.location && (
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{member.location}</span>
                </div>
              )}

              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Member since {formatMemberSince(member.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {member.bio && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">About</h4>
              <p className="text-gray-600 leading-relaxed">{member.bio}</p>
            </div>
          )}

          {/* Professional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Experience */}
            {member.experience_years && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Experience</h4>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>{member.experience_years} years of experience</span>
                </div>
              </div>
            )}

            {/* Contact Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Links</h4>
              <div className="space-y-2">
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>Website</span>
                  </a>
                )}

                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          {member.skills && member.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {member.interests && member.interests.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {member.interests.map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {member.id !== currentUserId && (
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="primary"
                onClick={handleStartConversation}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                {loading ? "Starting..." : "Start Conversation"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemberProfileModal
