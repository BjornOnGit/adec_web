"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Calendar, ArrowLeft, MessageSquare, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react"
import Button from "../components/ui/Button"

const BlogPostPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [showShareOptions, setShowShareOptions] = useState(false)

  useEffect(() => {
    // In a real application, fetch the post from your API or Supabase
    // For demo purposes, we'll simulate fetching a post
    const fetchPost = async () => {
      setLoading(true)
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock post data
          const mockPost = {
            id: Number.parseInt(id),
            title: "Economic Growth Opportunities in African Markets",
            content: `
              <p class="mb-4">Africa's economic landscape is evolving rapidly, presenting numerous opportunities for investors, businesses, and entrepreneurs. With a growing middle class, increasing urbanization, and technological advancements, the continent is poised for significant economic growth in the coming decades.</p>
              
              <h2 class="text-2xl font-bold mt-8 mb-4">Key Growth Sectors</h2>
              
              <p class="mb-4">Several sectors are driving economic growth across African markets:</p>
              
              <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Technology and Innovation:</strong> Africa's tech ecosystem is flourishing, with hubs in Lagos, Nairobi, Cape Town, and Cairo leading the way. Fintech, agritech, and healthtech startups are attracting significant investment.</li>
                <li><strong>Agriculture:</strong> With 60% of the world's uncultivated arable land, Africa has immense agricultural potential. Modern farming techniques and value chain development are creating opportunities for increased productivity and profitability.</li>
                <li><strong>Infrastructure:</strong> There's a growing focus on infrastructure development, including transportation networks, energy systems, and telecommunications, creating opportunities for public-private partnerships.</li>
                <li><strong>Renewable Energy:</strong> Africa's abundant renewable resources (solar, wind, hydro) are attracting investment as the continent leapfrogs traditional energy development paths.</li>
                <li><strong>Manufacturing:</strong> As labor costs rise in Asia, Africa is positioning itself as the next manufacturing hub, with countries like Ethiopia, Morocco, and South Africa leading the way.</li>
              </ul>
              
              <h2 class="text-2xl font-bold mt-8 mb-4">Regional Economic Communities</h2>
              
              <p class="mb-4">Regional integration is accelerating through economic communities such as:</p>
              
              <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>African Continental Free Trade Area (AfCFTA):</strong> The world's largest free trade area by number of participating countries, aiming to create a single market for goods and services.</li>
                <li><strong>East African Community (EAC):</strong> One of the fastest-growing regional economic blocs globally.</li>
                <li><strong>Economic Community of West African States (ECOWAS):</strong> Promoting economic integration across all fields of economic activity.</li>
              </ul>
              
              <h2 class="text-2xl font-bold mt-8 mb-4">Challenges and Considerations</h2>
              
              <p class="mb-4">Despite the opportunities, investors should be aware of challenges including:</p>
              
              <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Regulatory environments that vary significantly between countries</li>
                <li>Infrastructure gaps that can impact business operations</li>
                <li>Political stability concerns in certain regions</li>
                <li>Currency volatility and foreign exchange risks</li>
              </ul>
              
              <h2 class="text-2xl font-bold mt-8 mb-4">The Role of the Diaspora</h2>
              
              <p class="mb-4">The African diaspora plays a crucial role in economic development through:</p>
              
              <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Remittances, which exceed foreign direct investment in many countries</li>
                <li>Knowledge transfer and skills development</li>
                <li>Direct investment in businesses and startups</li>
                <li>Building bridges between African markets and global opportunities</li>
              </ul>
              
              <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
              
              <p class="mb-4">Africa's economic potential is vast and largely untapped. For investors willing to navigate the complexities of these diverse markets, the opportunities for growth and impact are significant. The African Diaspora Economic Council remains committed to facilitating connections, providing insights, and supporting initiatives that drive sustainable economic development across the continent.</p>
            `,
            excerpt: "Exploring the untapped potential and emerging trends in various African economies.",
            category: "economics",
            author: "Dr. Amara Nwosu",
            authorTitle: "Chief Economist, Pan-African Development Bank",
            authorBio:
              "Dr. Amara Nwosu has over 15 years of experience in economic development across Africa. She holds a Ph.D. in Economics from the London School of Economics and has published extensively on African economic growth strategies.",
            date: "2023-05-15",
            readTime: "8 min read",
            image: "/placeholder.svg?height=600&width=1200",
            tags: ["Economics", "Investment", "Growth", "Markets", "Development"],
          }
          setPost(mockPost)

          // Mock related posts
          const mockRelatedPosts = [
            {
              id: 2,
              title: "Diaspora Investment Strategies for 2023",
              excerpt: "How members of the African diaspora can effectively invest in their home countries.",
              category: "investment",
              author: "Michael Okonkwo",
              date: "2023-04-22",
              image: "/placeholder.svg?height=400&width=600",
            },
            {
              id: 3,
              title: "Tech Innovation Hubs Across Africa",
              excerpt: "A comprehensive look at the growing tech ecosystem in major African cities.",
              category: "technology",
              author: "Sarah Johnson",
              date: "2023-03-10",
              image: "/placeholder.svg?height=400&width=600",
            },
            {
              id: 4,
              title: "Sustainable Development Projects in East Africa",
              excerpt: "Case studies of successful sustainable development initiatives and their economic impact.",
              category: "development",
              author: "David Mwangi",
              date: "2023-02-28",
              image: "/placeholder.svg?height=400&width=600",
            },
          ]
          setRelatedPosts(mockRelatedPosts)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching post:", error)
        setLoading(false)
      }
    }

    fetchPost()
    // Scroll to top when navigating to a new post
    window.scrollTo(0, 0)
  }, [id])

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions)
  }

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="loader"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">{t("blog.postNotFound")}</h1>
            <p className="text-gray-600 mb-8">{t("blog.postNotFoundDesc")}</p>
            <Button to="/blog" variant="primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("blog.backToBlog")}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back to blog link */}
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("blog.backToBlog")}
            </Link>
          </div>

          {/* Post header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center mb-4">
              <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium capitalize">
                {post.category}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.date)}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-gray-600">{post.authorTitle}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleShareOptions}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  aria-label="Share post"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                  {showShareOptions && (
                    <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-2 z-10 flex space-x-2">
                      <a
                        href="#"
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label="Share on Facebook"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </a>
                      <a
                        href="#"
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label="Share on Twitter"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Twitter className="h-5 w-5 text-blue-400" />
                      </a>
                      <a
                        href="#"
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label="Share on LinkedIn"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Linkedin className="h-5 w-5 text-blue-700" />
                      </a>
                    </div>
                  )}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Save post">
                  <Bookmark className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Featured image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-auto rounded-xl object-cover"
              style={{ maxHeight: "500px" }}
            />
          </motion.div>

          {/* Post content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></motion.div>

          {/* Tags */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author bio */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-12">
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <h3 className="font-bold text-lg mb-2">{post.author}</h3>
                <p className="text-gray-600 mb-2">{post.authorTitle}</p>
                <p className="text-gray-600">{post.authorBio}</p>
              </div>
            </div>
          </div>

          {/* Comments section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">
              {t("blog.comments")} <span className="text-gray-500">(3)</span>
            </h3>

            <div className="space-y-6">
              {/* Comment form */}
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h4 className="font-bold mb-4">{t("blog.leaveComment")}</h4>
                <form>
                  <div className="mb-4">
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows="4"
                      placeholder={t("blog.commentPlaceholder")}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="primary">{t("blog.submitComment")}</Button>
                  </div>
                </form>
              </div>

              {/* Comments */}
              {[1, 2, 3].map((comment) => (
                <div key={comment} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <div className="flex items-center">
                        <h5 className="font-bold">{t(`blog.comment${comment}.author`)}</h5>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{t(`blog.comment${comment}.date`)}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{t(`blog.comment${comment}.content`)}</p>
                      <button className="text-primary text-sm mt-2 flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {t("blog.reply")}
                      </button>
                    </div>
                  </div>

                  {/* Nested reply for the first comment */}
                  {comment === 1 && (
                    <div className="ml-12 mt-4 pl-4 border-l-2 border-gray-100">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                        <div>
                          <div className="flex items-center">
                            <h5 className="font-bold">{t("blog.comment1.replyAuthor")}</h5>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{t("blog.comment1.replyDate")}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{t("blog.comment1.replyContent")}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Related posts */}
          <div>
            <h3 className="text-2xl font-bold mb-6">{t("blog.relatedPosts")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="bg-primary-light text-primary px-2 py-1 rounded-full text-xs font-medium capitalize">
                        {relatedPost.category}
                      </span>
                      <h4 className="font-bold mt-2 mb-1 group-hover:text-primary transition-colors duration-300">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostPage
