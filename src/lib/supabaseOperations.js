import { supabase } from "./supabase"

// Events Operations
export const eventsService = {
  // Get all events
  async getEvents() {
    try {
      const { data, error } = await supabase.from("events").select("*").order("event_date", { ascending: true })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create a new event
  async createEvent(eventData) {
    try {
      const { data, error } = await supabase.from("events").insert([eventData]).select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Update an event
  async updateEvent(eventId, eventData) {
    try {
      const { data, error } = await supabase.from("events").update(eventData).eq("id", eventId).select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Delete an event
  async deleteEvent(eventId) {
    try {
      const { error } = await supabase.from("events").delete().eq("id", eventId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get user's registered events
  async getUserEvents(userId) {
    try {
      const { data, error } = await supabase
        .from("event_registrations")
        .select(`
          *,
          events (*)
        `)
        .eq("user_id", userId)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Register for an event
  async registerForEvent(eventId, userId) {
    try {
      const { data, error } = await supabase
        .from("event_registrations")
        .insert([{ event_id: eventId, user_id: userId }])

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Unregister from an event
  async unregisterFromEvent(eventId, userId) {
    try {
      const { error } = await supabase
        .from("event_registrations")
        .delete()
        .eq("event_id", eventId)
        .eq("user_id", userId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get events created by a user
  async getEventsByCreator(userId) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("created_by", userId)
        .order("event_date", { ascending: true })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },
}

// Documents Operations
export const documentsService = {
  // Get user's documents
  async getUserDocuments(userId) {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Upload a document
  async uploadDocument(file, userId, metadata = {}) {
    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("documents").upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(fileName)

      // Save document metadata to database
      const { data, error } = await supabase
        .from("documents")
        .insert([
          {
            name: file.name,
            file_path: fileName,
            file_url: publicUrl,
            file_size: file.size,
            file_type: file.type,
            user_id: userId,
            ...metadata,
          },
        ])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Delete a document
  async deleteDocument(documentId, filePath) {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage.from("documents").remove([filePath])

      if (storageError) throw storageError

      // Delete from database
      const { error } = await supabase.from("documents").delete().eq("id", documentId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Download a document
  async downloadDocument(filePath) {
    try {
      const { data, error } = await supabase.storage.from("documents").download(filePath)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },
}
