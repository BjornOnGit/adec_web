"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, Send, Plus, MoreVertical, Phone, Video, Paperclip, MessageSquare } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { messagesService } from "../../lib/messagesService"
import Button from "../ui/Button"

const Messages = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showNewChat, setShowNewChat] = useState(false)
  const messagesEndRef = useRef(null)
  const messageSubscription = useRef(null)
  const conversationSubscription = useRef(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!user) return

    const result = await messagesService.getConversations(user.id)
    if (result.success) {
      setConversations(result.data)
    }
    setLoading(false)
  }, [user])

  // Load messages for selected conversation
  const loadMessages = async (conversationId) => {
    const result = await messagesService.getMessages(conversationId)
    if (result.success) {
      setMessages(result.data)
      // Mark messages as read
      await messagesService.markMessagesAsRead(conversationId, user.id)
    }
  }

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation || sending) return

    setSending(true)
    const result = await messagesService.sendMessage(selectedConversation.id, user.id, newMessage)

    if (result.success) {
      setNewMessage("")
      // Message will be added via real-time subscription
    }
    setSending(false)
  }

  // Select conversation
  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation)
    await loadMessages(conversation.id)

    // Unsubscribe from previous conversation
    if (messageSubscription.current) {
      messageSubscription.current.unsubscribe()
    }

    // Subscribe to new conversation messages
    messageSubscription.current = messagesService.subscribeToMessages(conversation.id, (newMessage) => {
      setMessages((prev) => [...prev, newMessage])
    })
  }

  // Search users
  const handleSearchUsers = async (query) => {
    setSearchQuery(query)
    if (query.trim().length > 2) {
      const result = await messagesService.searchUsers(query, user.id)
      if (result.success) {
        setSearchResults(result.data)
      }
    } else {
      setSearchResults([])
    }
  }

  // Start new conversation
  const handleStartConversation = async (otherUser) => {
    const result = await messagesService.createOrGetConversation(user.id, otherUser.id)
    if (result.success) {
      setShowNewChat(false)
      setSearchQuery("")
      setSearchResults([])
      await loadConversations()

      // Find and select the conversation
      const conversations = await messagesService.getConversations(user.id)
      if (conversations.success) {
        const conversation = conversations.data.find((conv) => conv.id === result.data.id)
        if (conversation) {
          handleSelectConversation(conversation)
        }
      }
    }
  }

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  // Get user display name
  const getUserDisplayName = (user) => {
    return `${user.first_name || ""} ${user.last_name || ""}`.trim() || "Unknown User"
  }

  useEffect(() => {
    if (user) {
      loadConversations()

      // Subscribe to conversation updates
      conversationSubscription.current = messagesService.subscribeToConversations(user.id, () => {
        loadConversations()
      })
    }

    return () => {
      if (messageSubscription.current) {
        messageSubscription.current.unsubscribe()
      }
      if (conversationSubscription.current) {
        conversationSubscription.current.unsubscribe()
      }
    }
  }, [user, loadConversations])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-[600px]">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {/* Conversations List */}
        <div className="border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Messages</h3>
              <button
                onClick={() => setShowNewChat(!showNewChat)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Search */}
            {showNewChat ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => handleSearchUsers(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {searchResults.length > 0 && (
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md">
                    {searchResults.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleStartConversation(user)}
                        className="w-full p-3 text-left hover:bg-gray-50 flex items-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                          {getUserDisplayName(user).charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{getUserDisplayName(user)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            )}
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No conversations yet</p>
                <p className="text-sm">Start a new chat to get started</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 flex-shrink-0 flex items-center justify-center">
                      {conversation.otherParticipant.avatar_url ? (
                        <img
                          src={conversation.otherParticipant.avatar_url || "/placeholder.svg"}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-medium">
                          {getUserDisplayName(conversation.otherParticipant).charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium truncate">{getUserDisplayName(conversation.otherParticipant)}</h4>
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessage && formatTime(conversation.lastMessage.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage?.content || "No messages yet"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0 flex items-center justify-center">
                    {selectedConversation.otherParticipant.avatar_url ? (
                      <img
                        src={selectedConversation.otherParticipant.avatar_url || "/placeholder.svg"}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="font-medium">
                        {getUserDisplayName(selectedConversation.otherParticipant).charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{getUserDisplayName(selectedConversation.otherParticipant)}</h4>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Video size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user.id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender_id === user.id
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-gray-100 rounded-tl-none"
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender_id === user.id ? "text-primary-light" : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button type="button" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Paperclip size={18} />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={sending}
                  />
                  <Button type="submit" disabled={!newMessage.trim() || sending} className="rounded-full p-2">
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
