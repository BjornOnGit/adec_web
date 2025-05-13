"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Send } from "lucide-react"
import Button from "../ui/Button"

const NewsletterForm = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) return

    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setEmail("")

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus(null)
      }, 3000)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("footer.emailPlaceholder")}
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          required
          disabled={status === "loading"}
        />
        <Button
          type="submit"
          variant="primary"
          size="icon"
          className="absolute right-1 top-1 rounded-md"
          disabled={status === "loading"}
        >
          <Send size={16} />
        </Button>
      </div>

      {status === "success" && <p className="text-green-400 text-sm">{t("footer.subscribeSuccess")}</p>}
    </form>
  )
}

export default NewsletterForm
