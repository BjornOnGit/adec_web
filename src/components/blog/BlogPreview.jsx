"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { ArrowLeft, Edit, Calendar, Tag, User } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../lib/supabase"
import Button from "../ui/Button"
import toast from "react-hot-toast"

const BlogPreview = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlogPost()
  }, [id])

  const loadBlogPost = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .eq("author_id", user.id)
        .single()

      if (error) throw error
      setBlog(data)
    } catch (error) {
      console.error("Error loading blog post:", error)
      toast.error("Failed to load blog post")
      navigate("/members-portal/my-blogs")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Blog post not found</h2>
        <Button onClick={() => navigate("/members-portal/my-blogs")}>Back to My Blogs</Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate("/members-portal/my-blogs")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Blogs
        </Button>

        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              blog.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {blog.status}
          </span>
          <Button variant="primary" size="sm" onClick={() => navigate(`/members-portal/blog-editor/${blog.id}`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Post
          </Button>
        </div>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        {blog.featured_image && (
          <img
            src={blog.featured_image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        )}

        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              {blog.updated_at !== blog.created_at && (
                <div className="flex items-center">
                  <span className="text-gray-400">Updated: {formatDate(blog.updated_at)}</span>
                </div>
              )}
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-primary-light text-primary text-sm rounded-full"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {blog.excerpt && (
              <div className="bg-gray-50 border-l-4 border-primary p-4 mb-6">
                <p className="text-gray-700 italic">{blog.excerpt}</p>
              </div>
            )}
          </header>

          <div className="prose max-w-none">
            <div className="text-gray-800 leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
              {blog.content}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default BlogPreview
