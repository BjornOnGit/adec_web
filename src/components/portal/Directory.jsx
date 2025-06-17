"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MapPin, Building, Briefcase, MessageCircle, User, Users, Globe, X } from "lucide-react"
import { directoryService } from "../../lib/directoryService"
import { useAuth } from "../../contexts/AuthContext"
import MemberProfileModal from "./MemberProfileModal"
import Button from "../ui/Button"

const Directory = () => {
  const { user } = useAuth()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    company: "",
    jobTitle: "",
    skills: "",
  })
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalCompanies: 0,
    totalLocations: 0,
  })
  const [selectedMember, setSelectedMember] = useState(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Fetch directory stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await directoryService.getMemberStats()
        if (result.success) {
          setStats(result.data)
        }
      } catch (err) {
        console.error("Error fetching directory stats:", err)
      }
    }
    fetchStats()
  }, [])

  // Fetch members with search and filters
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await directoryService.getMembers(searchTerm)
        if (result.success) {
          setMembers(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError("Failed to load members. Please try again.")
        console.error("Error fetching members:", err)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchMembers, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm, filters])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      company: "",
      jobTitle: "",
      skills: "",
    })
    setSearchTerm("")
  }

  const openProfileModal = (member) => {
    setSelectedMember(member)
    setShowProfileModal(true)
  }

  const closeProfileModal = () => {
    setShowProfileModal(false)
    setSelectedMember(null)
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
  }

  const hasActiveFilters = searchTerm || Object.values(filters).some((filter) => filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Member Directory</h1>
          <p className="text-gray-600">Connect with fellow ADEC members</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="h-4 w-4" />
            <span>{stats.totalMembers} Members</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Building className="h-4 w-4" />
            <span>{stats.totalCompanies} Companies</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Globe className="h-4 w-4" />
            <span>{stats.totalLocations} Locations</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search members by name, company, or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
          </button>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm">
              <X className="h-4 w-4" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                placeholder="Enter company"
                value={filters.company}
                onChange={(e) => handleFilterChange("company", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                placeholder="Enter job title"
                value={filters.jobTitle}
                onChange={(e) => handleFilterChange("jobTitle", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <input
                type="text"
                placeholder="Enter skills"
                value={filters.skills}
                onChange={(e) => handleFilterChange("skills", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-sm border">
        {loading ? (
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-600 mb-2">Error</div>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : members.length === 0 ? (
          <div className="p-8 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-600">
              {hasActiveFilters
                ? "Try adjusting your search criteria or clearing filters."
                : "No members are currently available in the directory."}
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="mb-4 text-sm text-gray-600">
              Showing {members.length} member{members.length !== 1 ? "s" : ""}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div key={member.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  {/* Avatar */}
                  <div className="flex items-center mb-4">
                    {member.avatar_url ? (
                      <img
                        src={member.avatar_url || "/placeholder.svg"}
                        alt={`${member.first_name} ${member.last_name}`}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        {getInitials(member.first_name, member.last_name)}
                      </div>
                    )}
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">
                        {member.first_name} {member.last_name}
                      </h3>
                      {member.job_title && <p className="text-sm text-gray-600">{member.job_title}</p>}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {member.company && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-2" />
                        <span>{member.company}</span>
                      </div>
                    )}

                    {member.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{member.location}</span>
                      </div>
                    )}

                    {member.experience_years && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{member.experience_years} years experience</span>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  {member.skills && member.skills.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{member.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openProfileModal(member)} className="flex-1">
                      View Profile
                    </Button>

                    {member.id !== user?.id && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          // This will be handled by the MemberProfileModal
                          openProfileModal(member)
                        }}
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Message
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Member Profile Modal */}
      {showProfileModal && selectedMember && (
        <MemberProfileModal member={selectedMember} onClose={closeProfileModal} currentUserId={user?.id} />
      )}
    </div>
  )
}

export default Directory
