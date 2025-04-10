"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import {
  HelpCircle,
  Search,
  Book,
  FileText,
  Video,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  User,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/i18n"
import { useRouter } from "next/navigation"

export default function HelpPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  // Frequently Asked Questions
  const faqs = [
    {
      question: "How do I register a new pharmaceutical product?",
      answer:
        "To register a new product, navigate to the Manufacturer dashboard and click on 'Register Product'. Fill in all required details about your product including name, description, and dosage. You'll also need to provide an IPFS Content Identifier (CID) for storing the product metadata on the blockchain.",
    },
    {
      question: "How do I track a shipment?",
      answer:
        "Distributors can track shipments by navigating to the 'Shipment Tracking' page in the Distributor dashboard. You can search for specific shipments using the shipment ID, product name, or destination. The system provides real-time updates on the location, status, and estimated time of arrival (ETA) for each shipment. You can also view detailed information about each shipment including temperature monitoring data and chain of custody records.",
    },
    {
      question: "What should I do if I discover a quality issue with a pharmaceutical product?",
      answer:
        "If you discover a quality issue, you should report it immediately using the 'Report Issue' feature in the Public dashboard. Provide all relevant details including the product ID, batch number if available, and a detailed description of the issue. Regulators will review your report and take appropriate action if necessary.",
    },
    {
      question: "How does the blockchain verification system work?",
      answer:
        "DrugLedger uses blockchain technology to create an immutable record of all transactions in the pharmaceutical supply chain. Each product has a unique identifier that can be verified on the blockchain. When a product is scanned, the system checks its authenticity against the blockchain record. This ensures that counterfeit products can be easily identified.",
    },
    {
      question: "How do I change my account settings or password?",
      answer:
        "You can change your account settings by clicking on the 'Settings' link in the sidebar navigation. From there, you can update your profile information, change your password, configure notification preferences, and adjust other account settings. Make sure to click 'Save' after making any changes.",
    },
  ]

  // Popular topics
  const popularTopics = [
    { title: "Getting Started Guide", icon: <Book className="h-5 w-5" />, color: "blue" },
    { title: "Product Registration", icon: <FileText className="h-5 w-5" />, color: "green" },
    { title: "Shipment Tracking", icon: <Search className="h-5 w-5" />, color: "purple" },
    { title: "Blockchain Verification", icon: <HelpCircle className="h-5 w-5" />, color: "amber" },
    { title: "Regulatory Compliance", icon: <FileText className="h-5 w-5" />, color: "red" },
    { title: "Data Security", icon: <HelpCircle className="h-5 w-5" />, color: "cyan" },
  ]

  // Video tutorials
  const videoTutorials = [
    {
      title: "Introduction to DrugLedger",
      duration: "4:32",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: "1.2K",
    },
    {
      title: "How to Register Products",
      duration: "6:45",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: "843",
    },
    {
      title: "Tracking Shipments",
      duration: "5:18",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: "956",
    },
    {
      title: "Regulatory Features Overview",
      duration: "8:21",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: "721",
    },
  ]

  // Handle search query
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  // Handle feedback submission
  const submitFeedback = (helpful: boolean) => {
    console.log("Feedback submitted:", helpful ? "Helpful" : "Not helpful")
    setFeedbackSubmitted(true)
  }

  // Navigate to contact support
  const contactSupport = () => {
    // In a real app, would navigate to a support page or open a modal
    console.log("Contacting support")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-8 w-8 text-cyan-400" />
            {t("help")}
          </h1>
          <p className="text-slate-300">Find answers, tutorials, and support for DrugLedger</p>
        </div>
      </div>

      {/* Search Bar */}
      <GlassContainer>
        <div className="text-center max-w-2xl mx-auto py-4">
          <h2 className="text-xl font-semibold text-white mb-4">How can we help you today?</h2>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 h-12 text-white"
            />
            <Button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Search
            </Button>
          </form>
        </div>
      </GlassContainer>

      {/* Popular Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {popularTopics.map((topic, index) => (
          <GlassContainer
            key={index}
            className="p-4 text-center cursor-pointer hover:shadow-[0_0_15px_rgba(0,194,214,0.2)] transition-all"
          >
            <div
              className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-3 
                ${
                  topic.color === "blue"
                    ? "bg-blue-500/20 text-blue-400"
                    : topic.color === "green"
                      ? "bg-green-500/20 text-green-400"
                      : topic.color === "purple"
                        ? "bg-purple-500/20 text-purple-400"
                        : topic.color === "amber"
                          ? "bg-amber-500/20 text-amber-400"
                          : topic.color === "red"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-cyan-500/20 text-cyan-400"
                }`}
            >
              {topic.icon}
            </div>
            <h3 className="font-medium text-white">{topic.title}</h3>
          </GlassContainer>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="bg-slate-800/50 mb-6">
          <TabsTrigger value="faq" className="data-[state=active]:bg-slate-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-slate-700">
            <Video className="h-4 w-4 mr-2" />
            Video Tutorials
          </TabsTrigger>
          <TabsTrigger value="documentation" className="data-[state=active]:bg-slate-700">
            <Book className="h-4 w-4 mr-2" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-slate-700">
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </TabsTrigger>
        </TabsList>

        {/* FAQs Section */}
        <TabsContent value="faq" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassContainer className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border-slate-700">
                    <AccordionTrigger className="text-white hover:no-underline hover:text-cyan-400 py-4">
                      <div className="flex items-center text-left">
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300">
                      <div className="pb-4">
                        <p>{faq.answer}</p>

                        {/* Feedback section */}
                        <div className="mt-4 pt-4 border-t border-slate-700">
                          <p className="text-sm text-slate-400 mb-2">Was this answer helpful?</p>

                          {feedbackSubmitted ? (
                            <p className="text-sm text-green-400">Thank you for your feedback!</p>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                                onClick={() => submitFeedback(true)}
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Yes
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                onClick={() => submitFeedback(false)}
                              >
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                No
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </GlassContainer>

            <GlassContainer>
              <h2 className="text-xl font-semibold text-white mb-4">Related Resources</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 cursor-pointer hover:bg-slate-800/50">
                  <div className="flex items-center mb-2">
                    <Book className="h-5 w-5 text-cyan-400 mr-2" />
                    <h3 className="font-medium text-white">User Guide</h3>
                  </div>
                  <p className="text-sm text-slate-300">Complete guide to using the DrugLedger platform</p>
                  <div className="flex items-center mt-2 text-xs text-slate-400">
                    <FileText className="h-3.5 w-3.5 mr-1" />
                    PDF • 3.2 MB
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 cursor-pointer hover:bg-slate-800/50">
                  <div className="flex items-center mb-2">
                    <Video className="h-5 w-5 text-cyan-400 mr-2" />
                    <h3 className="font-medium text-white">Getting Started Video</h3>
                  </div>
                  <p className="text-sm text-slate-300">Step-by-step video tutorial for new users</p>
                  <div className="flex items-center mt-2 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    10:23 • 720p
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 cursor-pointer hover:bg-slate-800/50">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-cyan-400 mr-2" />
                    <h3 className="font-medium text-white">API Documentation</h3>
                  </div>
                  <p className="text-sm text-slate-300">Technical documentation for developers</p>
                  <div className="flex items-center mt-2 text-xs text-slate-400">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                    Web Documentation
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className="w-full justify-start bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
                  onClick={contactSupport}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Still Need Help? Contact Support
                </Button>
              </div>
            </GlassContainer>
          </div>
        </TabsContent>

        {/* Video Tutorials Section */}
        <TabsContent value="videos" className="mt-0">
          <GlassContainer>
            <h2 className="text-xl font-semibold text-white mb-4">Video Tutorials</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {videoTutorials.map((video, index) => (
                <div
                  key={index}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-lg overflow-hidden cursor-pointer hover:border-cyan-500/30 transition-all"
                >
                  <div className="relative">
                    <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-auto" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/80 flex items-center justify-center">
                        <Video className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-white">{video.title}</h3>
                    <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                View All Tutorials
              </Button>
            </div>
          </GlassContainer>
        </TabsContent>

        {/* Documentation Section */}
        <TabsContent value="documentation" className="mt-0">
          <GlassContainer>
            <h2 className="text-xl font-semibold text-white mb-4">Documentation</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                  <Book className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">User Guide</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Complete guide to using the DrugLedger platform for all user roles.
                </p>
                <Button className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Read User Guide
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                  <FileText className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">API Reference</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Technical documentation for developers integrating with DrugLedger.
                </p>
                <Button className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  View API Docs
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                  <HelpCircle className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Knowledge Base</h3>
                <p className="text-sm text-slate-300 mb-4">
                  In-depth articles on features, troubleshooting, and best practices.
                </p>
                <Button className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  Browse Articles
                </Button>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        {/* Contact Support Section */}
        <TabsContent value="contact" className="mt-0">
          <GlassContainer>
            <h2 className="text-xl font-semibold text-white mb-4">Contact Support</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Get in Touch</h3>

                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Your Name</label>
                    <Input className="bg-slate-800/50 border-slate-700" placeholder="John Doe" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email Address</label>
                    <Input
                      className="bg-slate-800/50 border-slate-700"
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Subject</label>
                    <Input className="bg-slate-800/50 border-slate-700" placeholder="Help with product registration" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Message</label>
                    <textarea
                      className="w-full min-h-[150px] rounded-md bg-slate-800/50 border border-slate-700 p-3 text-slate-300"
                      placeholder="Please describe your issue in detail..."
                    ></textarea>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    onClick={() => router.push("/help")}
                  >
                    Submit Request
                  </Button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">Other Ways to Reach Us</h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <div className="flex items-center mb-2">
                      <Mail className="h-5 w-5 text-cyan-400 mr-2" />
                      <h4 className="font-medium text-white">Email Support</h4>
                    </div>
                    <p className="text-sm text-slate-300">For general inquiries and non-urgent issues</p>
                    <p className="text-cyan-400 mt-1">support@drugledger.com</p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <div className="flex items-center mb-2">
                      <Phone className="h-5 w-5 text-cyan-400 mr-2" />
                      <h4 className="font-medium text-white">Phone Support</h4>
                    </div>
                    <p className="text-sm text-slate-300">Available Monday-Friday, 9am-5pm EST</p>
                    <p className="text-cyan-400 mt-1">+1 (555) 123-4567</p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <div className="flex items-center mb-2">
                      <MessageCircle className="h-5 w-5 text-cyan-400 mr-2" />
                      <h4 className="font-medium text-white">Live Chat</h4>
                    </div>
                    <p className="text-sm text-slate-300">Chat with a support representative in real-time</p>
                    <Button className="mt-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                      Start Live Chat
                    </Button>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-amber-400 font-medium">Dedicated Support</h4>
                      <p className="text-sm text-slate-300 mt-1">
                        Enterprise customers have access to a dedicated support representative. Contact your account
                        manager for details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
