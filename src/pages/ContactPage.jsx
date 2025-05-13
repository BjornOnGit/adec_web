"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from "lucide-react"
import Button from "../components/ui/Button"

const ContactPage = () => {
  const { t } = useTranslation()
  const [formStatus, setFormStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus(null)
      }, 5000)
    }, 1500)
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  // FAQ items
  const faqItems = [
    {
      question: "How can I become a member of the African Diaspora Economic Council?",
      answer:
        "You can become a member by visiting our Membership page and completing the application form. We offer different membership tiers for individuals and organizations.",
    },
    {
      question: "What benefits do members receive?",
      answer:
        "Members receive access to our global network, exclusive events, business opportunities, educational resources, and more. Benefits vary depending on your membership tier.",
    },
    {
      question: "How can my organization partner with ADEC?",
      answer:
        "We offer various partnership opportunities for organizations. Please visit our Partners page or contact us directly to discuss potential collaboration.",
    },
    {
      question: "Does ADEC offer consulting services?",
      answer:
        "Yes, we provide consulting services in areas such as market entry strategy, investment advisory, and economic development. Please contact us for more information.",
    },
    {
      question: "How can I stay updated on ADEC's activities?",
      answer:
        "You can subscribe to our newsletter, follow us on social media, or become a member to receive regular updates on our activities and events.",
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
              {t("contact.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-200"
            >
              {t("contact.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-6">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("contact.email")}</h3>
                <p className="text-gray-600 mb-4">{t("contact.emailDesc")}</p>
                <a href="mailto:info@adec.org" className="text-primary hover:underline">
                  info@adec.org
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-6">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("contact.phone")}</h3>
                <p className="text-gray-600 mb-4">{t("contact.phoneDesc")}</p>
                <a href="tel:+12345678901" className="text-primary hover:underline">
                  +1 (234) 567-8901
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-6">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("contact.location")}</h3>
                <p className="text-gray-600 mb-4">{t("contact.locationDesc")}</p>
                <address className="not-italic text-primary">
                  123 Economic Way
                  <br />
                  Global City, Country
                </address>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-lg self-start"
              >
                <div className="flex items-center mb-6">
                  <MessageSquare className="h-6 w-6 text-primary mr-2" />
                  <h2 className="text-2xl font-bold">{t("contact.sendMessage")}</h2>
                </div>

                {formStatus === "success" ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <div className="flex">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                      <p className="text-green-700">{t("contact.messageSent")}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.form.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.form.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.form.subject")}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.form.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" variant="primary" className="group" disabled={formStatus === "submitting"}>
                      {formStatus === "submitting" ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {t("contact.form.sending")}
                        </span>
                      ) : (
                        <>
                          {t("contact.form.send")}
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Office Hours and FAQ */}
              <div className="space-y-8 self-start">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="bg-white p-8 rounded-xl shadow-md"
                >
                  <div className="flex items-center mb-6">
                    <Clock className="h-6 w-6 text-primary mr-2" />
                    <h2 className="text-2xl font-bold">{t("contact.officeHours")}</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium">{t("contact.monday")}</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium">{t("contact.tuesday")}</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium">{t("contact.wednesday")}</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium">{t("contact.thursday")}</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium">{t("contact.friday")}</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium">{t("contact.saturday")}</span>
                      <span>{t("contact.closed")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t("contact.sunday")}</span>
                      <span>{t("contact.closed")}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="bg-white p-8 rounded-xl shadow-md"
                >
                  <h2 className="text-2xl font-bold mb-6">{t("contact.faq")}</h2>
                  <div className="space-y-6">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-bold mb-2">{item.question}</h3>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("contact.findUs")}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t("contact.mapDescription")}</p>
            </div>
            <div className="h-96 bg-gray-200 rounded-xl overflow-hidden">
              {/* In a real application, you would embed a Google Map or other map service here */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <MapPin className="h-12 w-12 text-gray-500" />
                <span className="ml-2 text-lg font-medium text-gray-600">{t("contact.mapPlaceholder")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
