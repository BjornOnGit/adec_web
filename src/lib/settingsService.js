import { supabase } from "./supabase"

export const settingsService = {
  // Get current user's profile
  async getCurrentProfile(userId) {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Update user profile
  async updateProfile(userId, profileData) {
    try {
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
      const fileName = `${userId}-${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath)

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
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
      const { data, error } = await supabase.from("notification_preferences").select("*").eq("user_id", userId).single()

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
  async deleteAvatar(userId, avatarPath) {
    try {
      if (avatarPath) {
        const { error: deleteError } = await supabase.storage.from("avatars").remove([avatarPath])

        if (deleteError) throw deleteError
      }

      const { data, error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
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
        if (profile.skills) {
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
