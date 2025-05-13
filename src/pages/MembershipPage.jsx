"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Check, X, CreditCard, Download, Upload } from "lucide-react"
import { motion } from "framer-motion"
import Button from "../components/ui/Button"
import { loadStripe } from "@stripe/stripe-js"

// Initialize Stripe
const STRIPE_PROMISE = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const MembershipPage = () => {
  const { t } = useTranslation()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    country: "",
    membershipType: "",
    resume: null,
    additionalInfo: "",
  })

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    setFormData({
      ...formData,
      membershipType: plan.type,
    })
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // In a real application, you would send the form data to your server
    // and handle the payment process with Stripe

    // Simulate form submission
    setStep(3)
  }

  const handlePayment = async () => {
    // In a real application, you would create a Stripe Checkout session
    // and redirect the user to the Stripe Checkout page

    // Simulate payment process
    setTimeout(() => {
      setStep(4)
    }, 2000)
  }

  const membershipPlans = [
    {
      type: "individual",
      title: t("membership.plans.individual.title"),
      price: "$40",
      period: t("membership.plans.individual.period"),
      features: [
        t("membership.plans.individual.features.f1"),
        t("membership.plans.individual.features.f2"),
        t("membership.plans.individual.features.f3"),
        t("membership.plans.individual.features.f4"),
      ],
      notIncluded: [t("membership.plans.individual.notIncluded.n1"), t("membership.plans.individual.notIncluded.n2")],
    },
    {
      type: "business",
      title: t("membership.plans.business.title"),
      price: "$250",
      period: t("membership.plans.business.period"),
      features: [
        t("membership.plans.business.features.f1"),
        t("membership.plans.business.features.f2"),
        t("membership.plans.business.features.f3"),
        t("membership.plans.business.features.f4"),
        t("membership.plans.business.features.f5"),
      ],
      notIncluded: [t("membership.plans.business.notIncluded.n1")],
      recommended: true,
    },
    {
      type: "board",
      title: t("membership.plans.board.title"),
      price: "$500",
      period: t("membership.plans.board.period"),
      features: [
        t("membership.plans.board.features.f1"),
        t("membership.plans.board.features.f2"),
        t("membership.plans.board.features.f3"),
        t("membership.plans.board.features.f4"),
        t("membership.plans.board.features.f5"),
      ],
      notIncluded: [t("membership.plans.board.notIncluded.n1")],
      recommended: false,
    },
    
  ]

  const corporationMembershipPlans = [
    {
      type: "smallCorp",
      title: t("membership.plans.smallCorp.title"),
      price: "$500",
      period: t("membership.plans.smallCorp.period"),
      features: [
        t("membership.plans.smallCorp.features.f1"),
        t("membership.plans.smallCorp.features.f2"),
        t("membership.plans.smallCorp.features.f3"),
        t("membership.plans.smallCorp.features.f4"),
        t("membership.plans.smallCorp.features.f5"),
        t("membership.plans.smallCorp.features.f6"),
      ],
      notIncluded: [],
    },
    {
      type: "midsizeCorp",
      title: t("membership.plans.midsizeCorp.title"),
      price: "$1000",
      period: t("membership.plans.midsizeCorp.period"),
      features: [
        t("membership.plans.midsizeCorp.features.f1"),
        t("membership.plans.midsizeCorp.features.f2"),
        t("membership.plans.midsizeCorp.features.f3"),
        t("membership.plans.midsizeCorp.features.f4"),
        t("membership.plans.midsizeCorp.features.f5"),
        t("membership.plans.midsizeCorp.features.f6"),
      ],
      notIncluded: [],
    },
    {
      type: "LargeCorp",
      title: t("membership.plans.LargeCorp.title"),
      price: "$2500",
      period: t("membership.plans.LargeCorp.period"),
      features: [
        t("membership.plans.LargeCorp.features.f1"),
        t("membership.plans.LargeCorp.features.f2"),
        t("membership.plans.LargeCorp.features.f3"),
        t("membership.plans.LargeCorp.features.f4"),
        t("membership.plans.LargeCorp.features.f5"),
        t("membership.plans.LargeCorp.features.f6"),
      ],
      notIncluded: [],
    },
  ]

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("membership.title")}</h1>
            <p className="text-xl text-gray-600">{t("membership.subtitle")}</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      s === step
                        ? "bg-primary text-white"
                        : s < step
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {s < step ? <Check size={20} /> : s}
                  </div>
                  <span className="text-sm mt-2 text-gray-600">{t(`membership.steps.step${s}`)}</span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500"
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Choose Plan */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {membershipPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden relative ${
                      plan.recommended ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                        {t("membership.recommended")}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-gray-500">/{plan.period}</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.notIncluded.map((feature, i) => (
                          <li key={i} className="flex items-start text-gray-500">
                            <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant={plan.recommended ? "primary" : "outline"}
                        fullWidth={true}
                        onClick={() => handlePlanSelect(plan)}
                      >
                        {t("membership.selectPlan")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* The Business Plans */}
          <div className="mt-12"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t("membership.corporationMembershipPlansTitle")}
            </h2>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {corporationMembershipPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden relative ${
                      plan.recommended ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                        {t("membership.recommended")}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-gray-500">/{plan.period}</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.notIncluded.map((feature, i) => (
                          <li key={i} className="flex items-start text-gray-500">
                            <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant={plan.recommended ? "primary" : "outline"}
                        fullWidth={true}
                        onClick={() => handlePlanSelect(plan)}
                      >
                        {t("membership.selectPlan")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Application Form */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold mb-6">{t("membership.applicationForm.title")}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("membership.applicationForm.firstName")}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("membership.applicationForm.lastName")}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("membership.applicationForm.email")}
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
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("membership.applicationForm.organization")}
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("membership.applicationForm.country")}
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">{t("membership.applicationForm.selectCountry")}</option>
                    <option value="us">United States</option>
                    <option value="ng">Nigeria</option>
                    <option value="gh">Ghana</option>
                    <option value="ke">Kenya</option>
                    <option value="za">South Africa</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("membership.applicationForm.resume")}
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="resume"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">{t("membership.applicationForm.clickToUpload")}</span>
                        </p>
                        <p className="text-xs text-gray-500">{t("membership.applicationForm.fileTypes")}</p>
                      </div>
                      <input
                        id="resume"
                        type="file"
                        name="resume"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                  </div>
                  {formData.resume && (
                    <p className="mt-2 text-sm text-gray-600">
                      {t("membership.applicationForm.fileSelected")}: {formData.resume.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("membership.applicationForm.additionalInfo")}
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    {t("membership.back")}
                  </Button>
                  <Button type="submit" variant="primary">
                    {t("membership.continue")}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold mb-6">{t("membership.payment.title")}</h2>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{t("membership.payment.summary")}</h3>
                <div className="flex justify-between mb-2">
                  <span>{t("membership.payment.plan")}</span>
                  <span>{selectedPlan?.title}</span>
                </div>
                <div className="flex justify-between font-medium text-lg border-t border-gray-200 pt-2 mt-2">
                  <span>{t("membership.payment.total")}</span>
                  <span className="text-primary">{selectedPlan?.price}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">{t("membership.payment.methods")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      className="h-4 w-4 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="card" className="ml-3 flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                      {t("membership.payment.creditCard")}
                    </label>
                  </div>

                  <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <input
                      type="radio"
                      id="stripe"
                      name="paymentMethod"
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <label htmlFor="stripe" className="ml-3">
                      {t("membership.payment.stripe")}
                    </label>
                  </div>

                  <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <input
                      type="radio"
                      id="paychex"
                      name="paymentMethod"
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <label htmlFor="paychex" className="ml-3">
                      {t("membership.payment.paychex")}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  {t("membership.back")}
                </Button>
                <Button type="button" variant="primary" onClick={handlePayment}>
                  {t("membership.payment.payNow")}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">{t("membership.confirmation.title")}</h2>
              <p className="text-gray-600 mb-6">{t("membership.confirmation.message")}</p>
              <div className="mb-8 p-4 bg-gray-50 rounded-lg text-left">
                <h3 className="font-medium text-gray-900 mb-2">{t("membership.confirmation.details")}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("membership.confirmation.name")}</span>
                    <span>
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("membership.confirmation.email")}</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("membership.confirmation.plan")}</span>
                    <span>{selectedPlan?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("membership.confirmation.amount")}</span>
                    <span className="text-primary font-medium">{selectedPlan?.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="flex items-center justify-center" onClick={() => window.print()}>
                  <Download className="mr-2 h-4 w-4" />
                  {t("membership.confirmation.download")}
                </Button>
                <Button to="/members-portal" variant="primary">
                  {t("membership.confirmation.goToPortal")}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MembershipPage
