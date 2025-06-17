"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Save, Eye, ArrowLeft, Upload, X } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../lib/supabase"
import Button from "../ui/Button"
import toast from "react-hot-toast"

const BlogEditor = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    tags: [],
    status: "draft", // draft, published
    category: "general",
  })

  const [newTag, setNewTag] = useState("")
  const [imageUploading, setImageUploading] = useState(false)

  // Load existing blog post if editing
  const loadBlogPost = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .eq("author_id", user.id)
        .single()

      if (error) throw error

      setBlogData({
        title: data.title || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        image_url: data.image_url || "",
        tags: data.tags || [],
        status: data.status || "draft",
        category: data.category || "general",
      })
    } catch (error) {
      console.error("Error loading blog post:", error)
      toast.error("Failed to load blog post")
    } finally {
      setLoading(false)
    }
  }, [id, user.id])

  useEffect(() => {
    if (id && id !== "new") {
      loadBlogPost()
    }
  }, [id, loadBlogPost])

  const handleInputChange = (field, value) => {
    setBlogData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      setImageUploading(true)

      // Create a unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage.from("blog-images").upload(fileName, file)

      if (error) throw error

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(fileName)

      handleInputChange("featured_image", publicUrl)
      toast.success("Image uploaded successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    } finally {
      setImageUploading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !blogData.tags.includes(newTag.trim())) {
      handleInputChange("tags", [...blogData.tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    handleInputChange(
      "tags",
      blogData.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const saveBlogPost = async (status = blogData.status) => {
    if (!blogData.title.trim() || !blogData.content.trim()) {
      toast.error("Title and content are required")
      return
    }

    try {
      setSaving(true)

      const blogPost = {
        title: blogData.title,
        content: blogData.content,
        excerpt: blogData.excerpt || blogData.content.substring(0, 200) + "...",
        featured_image: blogData.featured_image,
        tags: blogData.tags,
        status: status,
        category: blogData.category,
        author_id: user.id,
        updated_at: new Date().toISOString(),
      }

      let result
      if (id && id !== "new") {
        // Update existing post
        result = await supabase.from("blog_posts").update(blogPost).eq("id", id).eq("author_id", user.id)
      } else {
        // Create new post
        blogPost.created_at = new Date().toISOString()
        result = await supabase.from("blog_posts").insert([blogPost]).select()
      }

      if (result.error) throw result.error

      toast.success(status === "published" ? "Blog post published!" : "Blog post saved as draft")

      if (id === "new" && result.data?.[0]) {
        navigate(`/members-portal/blog-editor/${result.data[0].id}`)
      }
    } catch (error) {
      console.error("Error saving blog post:", error)
      toast.error("Failed to save blog post")
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = () => {
    saveBlogPost("published")
  }

  const handleSaveDraft = () => {
    saveBlogPost("draft")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="sm" onClick={() => navigate("/members-portal/my-blogs")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Blogs
          </Button>
          <h1 className="text-2xl font-bold">{id === "new" ? "Create New Blog Post" : "Edit Blog Post"}</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? "Edit" : "Preview"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveDraft} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="primary" size="sm" onClick={handlePublish} disabled={saving}>
            {saving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      {isPreview ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-md p-8">
          <div className="prose max-w-none">
            {blogData.featured_image && (
              <img
                src={blogData.featured_image || "/placeholder.svg"}
                alt={blogData.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <h1 className="text-3xl font-bold mb-4">{blogData.title || "Untitled"}</h1>
            {blogData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blogData.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-light text-primary text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: blogData.content.replace(/\n/g, "<br>") }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-md p-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={blogData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter blog post title..."
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <div className="flex items-center space-x-4">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {imageUploading ? "Uploading..." : "Upload Image"}
                </label>
                {blogData.featured_image && (
                  <div className="flex items-center">
                    <img
                      src={blogData.featured_image || "/placeholder.svg"}
                      alt="Featured"
                      className="h-12 w-12 object-cover rounded"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange("featured_image", "")}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={blogData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="general">General</option>
                <option value="business">Business</option>
                <option value="economics">Economics</option>
                <option value="trade">Trade</option>
                <option value="investment">Investment</option>
                <option value="events">Events</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add a tag..."
                />
                <Button variant="outline" size="sm" onClick={addTag}>
                  Add
                </Button>
              </div>
              {blogData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blogData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-primary-light text-primary text-sm rounded-full"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-2 text-primary hover:text-primary-dark">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt (Optional)</label>
              <textarea
                value={blogData.excerpt}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Brief description of your blog post..."
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <textarea
                value={blogData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                rows="15"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your blog post content here..."
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default BlogEditor
