"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { RoleBadge } from "@/components/role-badge"
import { AlertTriangle, Search, CheckCircle } from "lucide-react"

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    drugId: "",
    category: "",
    description: "",
    severity: "",
    contactEmail: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [drugFound, setDrugFound] = useState<boolean | null>(null)
  const [drugDetails, setDrugDetails] = useState<any>(null)
  const { toast } = useToast()

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Simulate searching for a drug by ID
  const searchDrug = () => {
    if (!formData.drugId) return

    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, we'll pretend any ID that starts with "DRG-" is valid
      if (formData.drugId.startsWith("DRG-")) {
        setDrugFound(true)
        setDrugDetails({
          id: formData.drugId,
          name: "Amoxicillin 500mg",
          manufacturer: "PharmaCorp Inc.",
          status: "Active",
        })
      } else {
        setDrugFound(false)
        setDrugDetails(null)
      }
    }, 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a random issue ID
    const issueId = `ISS-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`

    toast({
      title: "Issue Reported Successfully",
      description: `Your issue has been reported with ID: ${issueId}`,
    })

    // Reset form
    setFormData({
      drugId: "",
      category: "",
      description: "",
      severity: "",
      contactEmail: "",
    })
    setDrugFound(null)
    setDrugDetails(null)

    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Report an Issue</h1>
          <p className="text-slate-300">Report quality or safety concerns about pharmaceutical products</p>
        </div>
        <RoleBadge role="public" />
      </div>

      <GlassContainer className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Product ID</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter product ID (e.g., DRG-2025-001)"
                  value={formData.drugId}
                  onChange={(e) => handleChange("drugId", e.target.value)}
                  required
                  className="bg-slate-800/50 border-slate-700"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={searchDrug}
                  className="border-slate-700 text-slate-300"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <p className="text-xs text-slate-400">Enter the product ID found on the packaging or scan the QR code</p>
            </div>

            {drugFound === true && drugDetails && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                <div>
                  <p className="text-white font-medium">{drugDetails.name}</p>
                  <p className="text-sm text-slate-300">
                    Manufacturer: {drugDetails.manufacturer} • Status: {drugDetails.status}
                  </p>
                </div>
              </div>
            )}

            {drugFound === false && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
                <div>
                  <p className="text-white font-medium">Product Not Found</p>
                  <p className="text-sm text-slate-300">
                    Please check the ID and try again, or contact support for assistance
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Issue Category</label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
                <SelectTrigger className="bg-slate-800/50 border-slate-700">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="quality">Product Quality</SelectItem>
                  <SelectItem value="packaging">Packaging Issue</SelectItem>
                  <SelectItem value="sideEffect">Unexpected Side Effect</SelectItem>
                  <SelectItem value="efficacy">Efficacy Concern</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Issue Severity</label>
              <Select value={formData.severity} onValueChange={(value) => handleChange("severity", value)} required>
                <SelectTrigger className="bg-slate-800/50 border-slate-700">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="1">1 - Minor</SelectItem>
                  <SelectItem value="2">2 - Low</SelectItem>
                  <SelectItem value="3">3 - Moderate</SelectItem>
                  <SelectItem value="4">4 - High</SelectItem>
                  <SelectItem value="5">5 - Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Issue Description</label>
              <Textarea
                placeholder="Please describe the issue in detail..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
                className="min-h-[120px] bg-slate-800/50 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Contact Email (Optional)</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="bg-slate-800/50 border-slate-700"
              />
              <p className="text-xs text-slate-400">
                Provide your email if you'd like to be contacted about this issue
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting || drugFound === false}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </GlassContainer>
    </div>
  )
}
