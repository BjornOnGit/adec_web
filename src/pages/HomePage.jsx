"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useInView, useAnimation, motion } from "framer-motion"
import { ArrowRight, Globe, Users, TrendingUp, Shield, BookOpen, Award } from "lucide-react"
import Button from "../components/ui/Button"

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

const HomePage = () => {
  const { t } = useTranslation()
  const controls = useAnimation()

  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (featuresInView) {
      controls.start("visible")
    }
  }, [controls, featuresInView])

  const features = [
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: t("home.features.global.title"),
      description: t("home.features.global.description"),
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t("home.features.network.title"),
      description: t("home.features.network.description"),
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: t("home.features.growth.title"),
      description: t("home.features.growth.description"),
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: t("home.features.support.title"),
      description: t("home.features.support.description"),
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: t("home.features.resources.title"),
      description: t("home.features.resources.description"),
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: t("home.features.recognition.title"),
      description: t("home.features.recognition.description"),
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-primary-dark to-primary overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-70">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/images/hero.jpg?height=1080&width=1920")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t("home.hero.title")}</h1>
            <p className="text-xl text-dark-700 mb-8">{t("home.hero.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/membership" variant="secondary" size="lg" className="group">
                {t("home.hero.joinButton")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                to="/about"
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                {t("home.hero.learnButton")}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("home.features.title")}</h2>
            <p className="text-xl text-gray-600">{t("home.features.subtitle")}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("home.stats.title")}</h2>
            <p className="text-xl text-gray-600">{t("home.stats.subtitle")}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-5xl font-bold text-primary mb-2">50+</p>
              <p className="text-gray-600">{t("home.stats.countries")}</p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-5xl font-bold text-primary mb-2">5000+</p>
              <p className="text-gray-600">{t("home.stats.members")}</p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-5xl font-bold text-primary mb-2">120+</p>
              <p className="text-gray-600">{t("home.stats.partners")}</p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-5xl font-bold text-primary mb-2">$25M+</p>
              <p className="text-gray-600">{t("home.stats.investments")}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("home.cta.title")}</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{t("home.cta.description")}</p>
            <Button to="/membership" variant="secondary" size="lg" className="group">
              {t("home.cta.button")}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default HomePage
