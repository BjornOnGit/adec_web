"use client"

import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { motion, useInView } from "framer-motion"
import { Globe, Users, TrendingUp, Award, Target, CheckCircle, ArrowRight, Linkedin, Twitter, Mail } from "lucide-react"
import Button from "../components/ui/Button"

const AboutPage = () => {
  const { t } = useTranslation()

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

  // Refs for sections
  const missionRef = useRef(null)
  const historyRef = useRef(null)
  const valuesRef = useRef(null)
  const teamRef = useRef(null)
  const achievementsRef = useRef(null)

  // Check if sections are in view
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 })
  const historyInView = useInView(historyRef, { once: true, amount: 0.3 })
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 })
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 })
  const achievementsInView = useInView(achievementsRef, { once: true, amount: 0.3 })

  // Core values
  const coreValues = [
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: t("about.values.global.title"),
      description: t("about.values.global.description"),
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t("about.values.collaboration.title"),
      description: t("about.values.collaboration.description"),
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: t("about.values.excellence.title"),
      description: t("about.values.excellence.description"),
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: t("about.values.impact.title"),
      description: t("about.values.impact.description"),
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: t("about.values.integrity.title"),
      description: t("about.values.integrity.description"),
    },
  ]

  // Team members
  const teamMembers = [
    {
      name: "John Monteiro",
      title: t("about.team.president"),
      image: "/images/john_rodrigues_monteiro.jpg?height=300&width=300",
      bio: t("about.team.presidentBio"),
      social: {
        linkedin: "https://www.linkedin.com/in/john-monteiro-0427096/",
        twitter: "https://twitter.com",
        email: "mailto:gw2energy@gmail.com,",
      },
    },
    {
      name: "Obi Ibeto",
      title: t("about.team.vicePresident"),
      image: "/images/obi_ibeto.jpg?height=300&width=300",
      bio: t("about.team.obiDirectorBio"),
      social: {
        linkedin: "https://www.linkedin.com/in/obi-ibeto-39925714/",
        twitter: "https://twitter.com",
        email: "mailto:obiibeto@epinec.us",
      },
    },
    {
      name: "Adesuyi Doris",
      title: t("about.team.director"),
      image: "/images/doris_adesuyi_adec.jpg?height=300&width=300",
      bio: t("about.team.dorisDirectorBio"),
      social: {
        linkedin: "https://www.linkedin.com/in/dorisadesuyi/",
        twitter: "https://twitter.com",
        email: "mailto:michael@adec.org",
      },
    },
    {
      name: "Abdul Yassin",
      title: t("about.team.secretary"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("about.team.secretaryBio"),
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:abdulyassin444@gmail.com",
      },
    },
    {
      name: "Chris Jackson",
      title: t("about.team.treasurer"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("about.team.treasurerBio"),
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:chris.d.jackson@comcast.net",
      },
    },
    {
      name: "Fal Diabate",
      title: t("about.team.communications"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("about.team.communicationsBio"),
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:fdiabate@gmail.com",
      },
    },
    {
      name: "Victoria Makumbi",
      title: t("about.team.director"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("about.team.directorBio"),
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:vicky7m7@gmail.com",
      },
    },
    {
      name: "Dan Rivers",
      title: t("about.team.director"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("about.team.directorBio"),
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:dr1vers1367@gmail.com",
      },
    },
    {
      name: "Christine Tangishaka",
      title: t("about.team.director"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("about.team.directorBio"),
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:christine@yourgriefspecialist.com",
      },
    },
    {
      name: "Troy DePiza",
      title: t("about.team.director"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("about.team.directorBio"),
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:tdepeiza@dreamcollaborative.com",
      },
    },
    {
      name: "Curtis Jones",
      title: t("about.team.director"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("about.team.directorBio"),
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:curtisj@ggleafrica.com",
      },
    },
    {
      name: "Sulie Wanntani",
      title: t("about.team.director"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("about.team.directorBio"),
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:swanntani@gmail.com",
      },
    }
  ]

  // Milestones
  const milestones = [
    {
      year: "2010",
      title: t("about.milestones.founding.title"),
      description: t("about.milestones.founding.description"),
    },
    {
      year: "2012",
      title: t("about.milestones.expansion.title"),
      description: t("about.milestones.expansion.description"),
    },
    {
      year: "2015",
      title: t("about.milestones.partnership.title"),
      description: t("about.milestones.partnership.description"),
    },
    {
      year: "2018",
      title: t("about.milestones.summit.title"),
      description: t("about.milestones.summit.description"),
    },
    {
      year: "2020",
      title: t("about.milestones.digital.title"),
      description: t("about.milestones.digital.description"),
    },
    {
      year: "2023",
      title: t("about.milestones.present.title"),
      description: t("about.milestones.present.description"),
    },
  ]

  // Achievements
  const achievements = [
    {
      stat: "50+",
      label: t("about.achievements.countries"),
      description: t("about.achievements.countriesDesc"),
    },
    {
      stat: "5000+",
      label: t("about.achievements.members"),
      description: t("about.achievements.membersDesc"),
    },
    {
      stat: "$25M+",
      label: t("about.achievements.investments"),
      description: t("about.achievements.investmentsDesc"),
    },
    {
      stat: "120+",
      label: t("about.achievements.partners"),
      description: t("about.achievements.partnersDesc"),
    },
  ]

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/images/about_hero.jpg?height=1080&width=1920")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {t("about.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 mb-8"
            >
              {t("about.subtitle")}
            </motion.p>
          </div>
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

      {/* Mission and Vision Section */}
      <section ref={missionRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate={missionInView ? "visible" : "hidden"}
                variants={fadeIn}
                className="order-2 lg:order-1"
              >
                <h2 className="text-3xl font-bold mb-6">{t("about.mission.title")}</h2>
                <p className="text-gray-600 mb-6">{t("about.mission.description")}</p>
                <h2 className="text-3xl font-bold mb-6">{t("about.vision.title")}</h2>
                <p className="text-gray-600 mb-6">{t("about.vision.description")}</p>
                <Button to="/membership" variant="primary" className="group">
                  {t("about.joinUs")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div
                initial="hidden"
                animate={missionInView ? "visible" : "hidden"}
                variants={fadeIn}
                className="order-1 lg:order-2"
              >
                <img
                  src="/images/mission_vision_img.jpg?height=600&width=800"
                  alt="Mission and Vision"
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">{t("about.values.title")}</h2>
            <p className="text-gray-600 text-lg">{t("about.values.subtitle")}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* History and Milestones Section */}
      <section ref={historyRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={historyInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">{t("about.history.title")}</h2>
            <p className="text-gray-600 text-lg">{t("about.history.subtitle")}</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary"></div>

              {/* Timeline items */}
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={historyInView ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: index * 0.2 },
                    },
                  }}
                  className={`relative flex flex-col md:flex-row items-center mb-12 last:mb-0 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 md:pl-0 pl-12 pb-8 md:pb-0">
                    <div className="bg-white p-6 rounded-xl shadow-md max-w-sm">
                      <div className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary border-4 border-white"></div>
                  </div>
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">{t("about.team.title")}</h2>
            <p className="text-gray-600 text-lg">{t("about.team.subtitle")}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600 mb-4 text-sm">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4 text-gray-700" />
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter className="h-4 w-4 text-gray-700" />
                    </a>
                    <a
                      href={member.social.email}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4 text-gray-700" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button to="/contact" variant="outline">
              {t("about.contactTeam")}
            </Button>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achievementsRef} className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={achievementsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">{t("about.achievements.title")}</h2>
            <p className="text-gray-200 text-lg">{t("about.achievements.subtitle")}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={achievementsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center"
              >
                <p className="text-5xl font-bold text-white mb-2">{achievement.stat}</p>
                <h3 className="text-xl font-semibold mb-3 text-white">{achievement.label}</h3>
                <p className="text-gray-200">{achievement.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t("about.cta.title")}</h2>
            <p className="text-xl text-gray-600 mb-8">{t("about.cta.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/membership" variant="primary" size="lg" className="group">
                {t("about.cta.joinButton")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                {t("about.cta.contactButton")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
