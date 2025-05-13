"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import Button from "../components/ui/Button"

const BlogPage = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])

  // Mock blog posts data
  useEffect(() => {
    // In a real application, this would be fetched from an API
    const mockPosts = [
      {
        id: 1,
        title: "Economic Growth Opportunities in African Markets",
        excerpt: "Exploring the untapped potential and emerging trends in various African economies.",
        category: "economics",
        author: "Dr. Amara Nwosu",
        date: "2023-05-15",
        image: "/placeholder.svg?height=400&width=600",
        featured: true,
      },
      {
        id: 2,
        title: "Diaspora Investment Strategies for 2023",
        excerpt: "How members of the African diaspora can effectively invest in their home countries.",
        category: "investment",
        author: "Michael Okonkwo",
        date: "2023-04-22",
        image: "/placeholder.svg?height=400&width=600",
        featured: false,
      },
      {
        id: 3,
        title: "Tech Innovation Hubs Across Africa",
        excerpt: "A comprehensive look at the growing tech ecosystem in major African cities.",
        category: "technology",
        author: "Sarah Johnson",
        date: "2023-03-10",
        image: "/placeholder.svg?height=400&width=600",
        featured: false,
      },
      {
        id: 4,
        title: "Sustainable Development Projects in East Africa",
        excerpt: "Case studies of successful sustainable development initiatives and their economic impact.",
        category: "development",
        author: "David Mwangi",
        date: "2023-02-28",
        image: "/placeholder.svg?height=400&width=600",
        featured: false,
      },
      {
        id: 5,
        title: "Cross-Border Trade Agreements: What You Need to Know",
        excerpt: "Analysis of recent trade agreements and their implications for African businesses.",
        category: "policy",
        author: "Fatima Diallo",
        date: "2023-01-15",
        image: "/placeholder.svg?height=400&width=600",
        featured: false,
      },
      {
        id: 6,
        title: "Women Entrepreneurs Shaping African Economies",
        excerpt: "Profiles of influential women entrepreneurs and their contributions to economic growth.",
        category: "entrepreneurship",
        author: "Grace Okafor",
        date: "2022-12-05",
        image: "/placeholder.svg?height=400&width=600",
        featured: false,
      },
    ]

    setPosts(mockPosts)
    setFilteredPosts(mockPosts)
  }, [])

  // Filter posts based on search term and category
  useEffect(() => {
    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, posts])

  // Get unique categories from posts
  const categories = ["all", ...new Set(posts.map((post) => post.category))]

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Featured post (first post)
  const featuredPost = posts.find((post) => post.featured)

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("blog.title")}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("blog.subtitle")}</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder={t("blog.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category === "all" ? t("blog.allCategories") : category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-auto">
                    <img
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {featuredPost.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(featuredPost.date)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-500">{featuredPost.author}</span>
                      </div>
                      <Link to={`/blog/${featuredPost.id}`}>
                        <Button variant="primary" className="group">
                          {t("blog.readMore")}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {post.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-500">{post.author}</span>
                      </div>
                      <Link to={`/blog/${post.id}`}>
                        <Button variant="link" className="group">
                          {t("blog.readMore")}
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">{t("blog.noResults")}</h3>
              <p className="text-gray-600 mb-4">{t("blog.tryDifferent")}</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                {t("blog.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
