import { supabase } from "./supabase"

export const messagesService = {
  // Get all conversations for a user
  async getConversations(userId) {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          participant1:profiles!conversations_participant1_fkey(id, first_name, last_name, avatar_url),
          participant2:profiles!conversations_participant2_fkey(id, first_name, last_name, avatar_url),
          last_message:messages(content, created_at, sender_id)
        `)
        .or(`participant1.eq.${userId},participant2.eq.${userId}`)
        .order("updated_at", { ascending: false })

      if (error) throw error

      // Format conversations to show the other participant
      const formattedConversations = data.map((conv) => {
        const otherParticipant = conv.participant1.id === userId ? conv.participant2 : conv.participant1
        return {
          ...conv,
          otherParticipant,
          lastMessage: conv.last_message?.[0] || null,
        }
      })

      return { success: true, data: formattedConversations }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get messages for a specific conversation
  async getMessages(conversationId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(id, first_name, last_name, avatar_url)
        `)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })
        .limit(limit)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Send a message
  async sendMessage(conversationId, senderId, content) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            conversation_id: conversationId,
            sender_id: senderId,
            content: content.trim(),
          },
        ])
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(id, first_name, last_name, avatar_url)
        `)

      if (error) throw error

      // Update conversation's updated_at timestamp
      await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId)

      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create or get existing conversation between two users
  async createOrGetConversation(user1Id, user2Id) {
    try {
      // Check if conversation already exists
      const { data: existing, error: _searchError } = await supabase
        .from("conversations")
        .select("*")
        .or(
          `and(participant1.eq.${user1Id},participant2.eq.${user2Id}),and(participant1.eq.${user2Id},participant2.eq.${user1Id})`,
        )
        .single()

      if (existing) {
        return { success: true, data: existing }
      }

      // Create new conversation if it doesn't exist
      const { data, error } = await supabase
        .from("conversations")
        .insert([
          {
            participant1: user1Id,
            participant2: user2Id,
          },
        ])
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Search for users to start new conversations
  async searchUsers(query, currentUserId) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url")
        .neq("id", currentUserId)
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
        .limit(10)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Mark messages as read
  async markMessagesAsRead(conversationId, userId) {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", userId)
        .eq("read", false)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Subscribe to real-time messages for a conversation
  subscribeToMessages(conversationId, callback) {
    const subscription = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          // Fetch the complete message with sender info
          const { data } = await supabase
            .from("messages")
            .select(`
              *,
              sender:profiles!messages_sender_id_fkey(id, first_name, last_name, avatar_url)
            `)
            .eq("id", payload.new.id)
            .single()

          if (data) {
            callback(data)
          }
        },
      )
      .subscribe()

    return subscription
  },

  // Subscribe to conversation updates
  subscribeToConversations(userId, callback) {
    const subscription = supabase
      .channel(`conversations:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `or(participant1.eq.${userId},participant2.eq.${userId})`,
        },
        callback,
      )
      .subscribe()

    return subscription
  },
}
