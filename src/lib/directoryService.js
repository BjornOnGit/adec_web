import { supabase } from "./supabase"

export const directoryService = {
  // Get all members with pagination and search
  async getMembers(searchQuery = "", page = 1, limit = 12) {
    try {
      let query = supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          avatar_url,
          company,
          job_title,
          bio,
          location,
          website,
          linkedin_url,
          created_at,
          is_public
        `)
        .eq("is_public", true)
        .order("created_at", { ascending: false })

      // Add search filter if provided
      if (searchQuery.trim()) {
        query = query.or(
          `first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%,job_title.ilike.%${searchQuery}%`,
        )
      }

      // Add pagination
      const from = (page - 1) * limit
      const to = from + limit - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      return {
        success: true,
        data,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get member profile by ID
  async getMemberProfile(memberId) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          avatar_url,
          company,
          job_title,
          bio,
          location,
          website,
          linkedin_url,
          phone,
          created_at,
          is_public,
          skills,
          interests,
          experience_years
        `)
        .eq("id", memberId)
        .eq("is_public", true)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Update user's own profile
  async updateProfile(userId, profileData) {
    try {
      const { data, error } = await supabase.from("profiles").update(profileData).eq("id", userId).select().single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get current user's profile
  async getCurrentUserProfile(userId) {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Search members by various criteria
  async searchMembers(filters = {}) {
    try {
      let query = supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          avatar_url,
          company,
          job_title,
          bio,
          location,
          skills,
          created_at
        `)
        .eq("is_public", true)

      // Apply filters
      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`)
      }

      if (filters.company) {
        query = query.ilike("company", `%${filters.company}%`)
      }

      if (filters.skills && filters.skills.length > 0) {
        query = query.overlaps("skills", filters.skills)
      }

      if (filters.jobTitle) {
        query = query.ilike("job_title", `%${filters.jobTitle}%`)
      }

      const { data, error } = await query.order("created_at", { ascending: false }).limit(50)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get member statistics
  async getMemberStats() {
    try {
      const { count: totalMembers, error: membersError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("is_public", true)

      if (membersError) throw membersError

      const { data: companies, error: companiesError } = await supabase
        .from("profiles")
        .select("company")
        .eq("is_public", true)
        .not("company", "is", null)

      if (companiesError) throw companiesError

      const uniqueCompanies = new Set(companies.map((c) => c.company)).size

      const { data: locations, error: locationsError } = await supabase
        .from("profiles")
        .select("location")
        .eq("is_public", true)
        .not("location", "is", null)

      if (locationsError) throw locationsError

      const uniqueLocations = new Set(locations.map((l) => l.location)).size

      return {
        success: true,
        data: {
          totalMembers,
          uniqueCompanies,
          uniqueLocations,
        },
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },
}
