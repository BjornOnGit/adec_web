"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { ArrowLeft, Home, Search } from "lucide-react"
import { Link } from "react-router-dom"
import Button from "../components/ui/Button"

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-light rounded-full mb-8">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-4"
        >
          {t("notFound.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          {t("notFound.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <div className="relative max-w-xs mx-auto">
            <input
              type="text"
              placeholder={t("notFound.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button to="/" variant="primary" className="flex items-center justify-center">
            <Home className="mr-2 h-4 w-4" />
            {t("notFound.backHome")}
          </Button>
          <Button onClick={() => window.history.back()} variant="outline" className="flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("notFound.goBack")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>
            {t("notFound.suggestion")}{" "}
            <Link to="/contact" className="text-primary hover:underline">
              {t("notFound.contactUs")}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage
