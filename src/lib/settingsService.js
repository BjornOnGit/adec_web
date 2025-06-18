import { supabase } from "./supabase"

export const settingsService = {
  // Get current user's profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle()

      if (error) throw error

      // If no profile exists, create one first
      if (!data) {
        const createResult = await this.createProfile(userId)
        if (createResult.success) {
          return { success: true, data: createResult.data }
        } else {
          // Return default profile structure if creation fails
          return {
            success: true,
            data: {
              id: userId,
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
              experience_years: null,
              is_public: true,
              avatar_url: null,
            },
          }
        }
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create a new profile
  async createProfile(userId) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          id: userId,
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
          experience_years: null,
          is_public: true,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Update user profile
  async updateProfile(userId, profileData) {
    try {
      // First ensure profile exists
      const profileCheck = await this.getUserProfile(userId)
      if (!profileCheck.success) {
        throw new Error("Failed to get user profile")
      }

      // Update the profile
      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Upload avatar image
  async uploadAvatar(userId, file) {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath)

      // Ensure profile exists first
      await this.getUserProfile(userId)

      // Update profile with new avatar URL
      const { data, error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single()

      if (updateError) throw updateError

      return { success: true, data: { avatar_url: publicUrl } }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get notification preferences
  async getNotificationPreferences(userId) {
    try {
      const { data, error } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle()

      if (error && error.code !== "PGRST116") throw error

      // Return default preferences if none exist
      if (!data) {
        return {
          success: true,
          data: {
            email_notifications: true,
            event_reminders: true,
            message_notifications: true,
            newsletter: true,
            marketing_emails: false,
          },
        }
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Update notification preferences
  async updateNotificationPreferences(userId, preferences) {
    try {
      const { data, error } = await supabase
        .from("notification_preferences")
        .upsert({
          user_id: userId,
          ...preferences,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Delete avatar
  async deleteAvatar(userId) {
    try {
      // Get current avatar URL first
      const profileResult = await this.getUserProfile(userId)
      if (profileResult.success && profileResult.data.avatar_url) {
        // Extract file path from URL
        const avatarUrl = profileResult.data.avatar_url
        const urlParts = avatarUrl.split("/")
        const fileName = urlParts[urlParts.length - 1]

        const { error: deleteError } = await supabase.storage.from("avatars").remove([fileName])

        if (deleteError) console.warn("Failed to delete avatar file:", deleteError)
      }

      const { data, error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single()

      if (updateError) throw updateError
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get available skills for autocomplete
  async getAvailableSkills() {
    try {
      const { data, error } = await supabase.from("profiles").select("skills").not("skills", "is", null)

      if (error) throw error

      // Flatten and deduplicate skills
      const allSkills = data.reduce((acc, profile) => {
        if (profile.skills && Array.isArray(profile.skills)) {
          acc.push(...profile.skills)
        }
        return acc
      }, [])

      const uniqueSkills = [...new Set(allSkills)].sort()
      return { success: true, data: uniqueSkills }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },
}
