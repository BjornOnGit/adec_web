"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { ExternalLink, ArrowRight, Globe, Building, Users, Handshake, Award, Check } from "lucide-react"
import Button from "../components/ui/Button"

const PartnersPage = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("partners")

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Mock partners data
  const partners = [
    {
      id: 1,
      name: "Global Waste 2 Energy",
      logo: "/images/gw2energy.png?height=150&width=150",
      description:
        "Global Waste 2 Energy is a globally renowned waste management consultation company, working to bring a comprehensive solution to waste management",
      website: "https://www.gw2energy.com/copy-of-about",
      category: "business",
    },
    {
      id: 2,
      name: "ShieldForce Corporation",
      logo: "/images/ShieldForce_Logo.png?height=150&width=150",
      description:
        "Cybersecurity services company protecting businesses from financial losses and reputational damage.",
      website: "https://shieldforce.io/about",
      category: "business",
    },
    {
      id: 3,
      name: "Diversity Business Exhibit",
      logo: "/images/diversity_business_exhibit.png?height=150&width=150",
      description:
        "Northeast Regional BIPOC/Minority Business & Nonprofit Conference, Trade Show & Networking Events.",
      website: "https://example.com",
      category: "network",
    },
    {
      id: 4,
      name: "African Innovation Foundation",
      logo: "/placeholder.svg?height=150&width=150",
      description:
        "A foundation supporting innovative solutions to Africa's most pressing challenges through grants and mentorship.",
      website: "https://example.com",
      category: "innovation",
    },
    {
      id: 5,
      name: "East African Business Council",
      logo: "/placeholder.svg?height=150&width=150",
      description:
        "A regional apex body of private sector associations and corporates in East Africa with a focus on regional integration.",
      website: "https://example.com",
      category: "business",
    },
    {
      id: 6,
      name: "African Women's Development Fund",
      logo: "/placeholder.svg?height=150&width=150",
      description:
        "A grant-making foundation supporting local, national, and regional women's organizations working towards women's empowerment.",
      website: "https://example.com",
      category: "development",
    },
    {
      id: 7,
      name: "Tech Hub Africa",
      logo: "/placeholder.svg?height=150&width=150",
      description:
        "A network of technology innovation hubs across Africa, providing support to tech entrepreneurs and startups.",
      website: "https://example.com",
      category: "innovation",
    },
    {
      id: 8,
      name: "African Trade Association",
      logo: "/placeholder.svg?height=150&width=150",
      description: "An organization promoting intra-African trade and economic cooperation between African nations.",
      website: "https://example.com",
      category: "business",
    },
  ]

  // Partnership benefits
  const partnershipBenefits = [
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Global Visibility",
      description: "Showcase your organization to our international network of members and stakeholders.",
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Co-Branding Opportunities",
      description: "Collaborate on events, publications, and initiatives with the African Diaspora Economic Council.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Network Access",
      description: "Connect with influential leaders, investors, and decision-makers across Africa and its diaspora.",
    },
    {
      icon: <Handshake className="h-10 w-10 text-primary" />,
      title: "Strategic Partnerships",
      description: "Develop meaningful partnerships that advance your organization's goals in African markets.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Recognition & Credibility",
      description: "Enhance your organization's reputation through association with a respected international council.",
    },
  ]

  // Partnership tiers
  const partnershipTiers = [
    {
      name: "Strategic Partner",
      price: "$10,000",
      period: "per year",
      description: "For organizations seeking deep, strategic collaboration with significant visibility and influence.",
      features: [
        "Featured placement on website and all publications",
        "Speaking opportunities at all major events",
        "Co-branded research and publications",
        "Dedicated relationship manager",
        "Access to exclusive networking events",
        "Priority participation in trade missions",
        "Custom partnership benefits package",
      ],
      buttonText: "Become a Strategic Partner",
      highlighted: true,
    },
    {
      name: "Corporate Partner",
      price: "$5,000",
      period: "per year",
      description: "For businesses looking to establish a strong presence within the African diaspora community.",
      features: [
        "Logo placement on website and select publications",
        "Speaking opportunities at select events",
        "Participation in research initiatives",
        "Regular networking opportunities",
        "Participation in trade missions",
        "Quarterly partnership review meetings",
      ],
      buttonText: "Become a Corporate Partner",
      highlighted: false,
    },
    {
      name: "Institutional Partner",
      price: "$2,500",
      period: "per year",
      description: "For non-profit organizations, academic institutions, and government agencies.",
      features: [
        "Logo placement on website",
        "Participation in annual conference",
        "Collaboration on educational initiatives",
        "Access to networking events",
        "Knowledge sharing opportunities",
        "Annual partnership review meeting",
      ],
      buttonText: "Become an Institutional Partner",
      highlighted: false,
    },
  ]

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {t("partners.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-200 mb-8"
            >
              {t("partners.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                variant={activeTab === "partners" ? "secondary" : "outline"}
                className={activeTab !== "partners" ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : ""}
                onClick={() => setActiveTab("partners")}
              >
                {t("partners.viewPartners")}
              </Button>
              <Button
                variant={activeTab === "become" ? "secondary" : "outline"}
                className={activeTab !== "become" ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : ""}
                onClick={() => setActiveTab("become")}
              >
                {t("partners.becomePartner")}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Tab */}
      {activeTab === "partners" && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t("partners.ourPartners")}</h2>
              <p className="text-gray-600 text-lg">{t("partners.partnersDescription")}</p>
            </motion.div>

            {/* Filter by category */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium">
                {t("partners.allPartners")}
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium">
                {t("partners.financial")}
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium">
                {t("partners.business")}
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium">
                {t("partners.innovation")}
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium">
                {t("partners.development")}
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium">
                {t("partners.network")}
              </button>
            </div>

            {/* Partners Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    <div className="w-24 h-24 mb-4 flex items-center justify-center">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="max-w-full max-h-full"
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{partner.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                    <div className="mt-auto">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        {t("partners.visitWebsite")}
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonials */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-center mb-12">{t("partners.testimonials")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((testimonial) => (
                  <motion.div
                    key={testimonial}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-xl shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                      <div>
                        <h4 className="font-bold">{t(`partners.testimonial${testimonial}.name`)}</h4>
                        <p className="text-sm text-gray-600">{t(`partners.testimonial${testimonial}.title`)}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{t(`partners.testimonial${testimonial}.quote`)}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Become a Partner Tab */}
      {activeTab === "become" && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t("partners.becomePartnerTitle")}</h2>
              <p className="text-gray-600 text-lg">{t("partners.becomePartnerDescription")}</p>
            </motion.div>

            {/* Partnership Benefits */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-center mb-12">{t("partners.benefits")}</h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {partnershipBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="mb-4">{benefit.icon}</div>
                    <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Partnership Tiers */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-center mb-12">{t("partners.partnershipTiers")}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {partnershipTiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                      tier.highlighted ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {tier.highlighted && (
                      <div className="bg-primary text-white py-2 text-center font-medium">
                        {t("partners.recommended")}
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">{tier.name}</h4>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{tier.price}</span>
                        <span className="text-gray-500">/{tier.period}</span>
                      </div>
                      <p className="text-gray-600 mb-6">{tier.description}</p>
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant={tier.highlighted ? "primary" : "outline"} fullWidth={true} className="group">
                        {tier.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">{t("partners.contactUs")}</h3>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <p className="text-gray-600 mb-6 text-center">{t("partners.contactDescription")}</p>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("partners.form.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("partners.form.organization")}
                      </label>
                      <input
                        type="text"
                        id="organization"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("partners.form.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("partners.form.phone")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("partners.form.partnershipType")}
                    </label>
                    <select
                      id="partnershipType"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">{t("partners.form.selectType")}</option>
                      <option value="strategic">{t("partners.form.strategic")}</option>
                      <option value="corporate">{t("partners.form.corporate")}</option>
                      <option value="institutional">{t("partners.form.institutional")}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("partners.form.message")}
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    <Button variant="primary" size="lg" className="group">
                      {t("partners.form.submit")}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default PartnersPage
