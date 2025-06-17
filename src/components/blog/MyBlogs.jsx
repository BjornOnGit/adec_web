"use client"

import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Eye, Calendar, Tag } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../lib/supabase"
import Button from "../ui/Button"
import toast from "react-hot-toast"

const MyBlogs = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all") // all, published, draft

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true)
      let query = supabase
        .from("blog_posts")
        .select("*")
        .eq("author_id", user.id)
        .order("updated_at", { ascending: false })

      if (filter !== "all") {
        query = query.eq("status", filter)
      }

      const { data, error } = await query

      if (error) throw error
      setBlogs(data || [])
    } catch (error) {
      console.error("Error loading blogs:", error)
      toast.error("Failed to load blog posts")
    } finally {
      setLoading(false)
    }
  }, [user.id, filter])

  useEffect(() => {
    loadBlogs()
  }, [filter, loadBlogs])

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id).eq("author_id", user.id)

      if (error) throw error

      setBlogs(blogs.filter((blog) => blog.id !== id))
      toast.success("Blog post deleted successfully")
    } catch (error) {
      console.error("Error deleting blog:", error)
      toast.error("Failed to delete blog post")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Blog Posts</h1>
        <Button variant="primary" onClick={() => navigate("/members-portal/blog-editor/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: "all", label: "All Posts" },
          { key: "published", label: "Published" },
          { key: "draft", label: "Drafts" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {blogs.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Edit className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === "all" ? "No blog posts yet" : `No ${filter} posts`}
          </h3>
          <p className="text-gray-600 mb-6">
            {filter === "all"
              ? "Start writing your first blog post to share your thoughts with the community."
              : `You don't have any ${filter} posts yet.`}
          </p>
          <Button variant="primary" onClick={() => navigate("/members-portal/blog-editor/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Post
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {blog.featured_image && (
                <img
                  src={blog.featured_image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      blog.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {blog.status}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(blog.updated_at)}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h3>

                {blog.excerpt && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>}

                {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{blog.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/members-portal/blog-editor/${blog.id}`)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/members-portal/blog-preview/${blog.id}`)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBlogs
