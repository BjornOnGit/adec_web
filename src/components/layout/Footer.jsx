import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Logo from "../common/Logo"
import NewsletterForm from "../forms/NewsletterForm"

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Facebook size={20} />, url: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter size={20} />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram size={20} />, url: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com", label: "LinkedIn" },
  ]

  const quickLinks = [
    { name: t("footer.home"), path: "/" },
    { name: t("footer.about"), path: "/about" },
    { name: t("footer.blog"), path: "/blog" },
    { name: t("footer.membership"), path: "/membership" },
    { name: t("footer.partners"), path: "/partners" },
    { name: t("footer.contact"), path: "/contact" },
  ]

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <Logo className="h-10 w-auto" />
              <span className="ml-2 font-bold text-lg">ADEC</span>
            </div>
            <p className="text-gray-400 mb-6">{t("footer.description")}</p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-primary transition-colors duration-300 p-2 rounded-full"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-primary transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">{t("footer.contactUs")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Economic Way, Global City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-400">+1 (234) 567-8901</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@adec.org"
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  info@adec.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">{t("footer.newsletter")}</h3>
            <p className="text-gray-400 mb-4">{t("footer.newsletterDesc")}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>
            &copy; {currentYear} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
