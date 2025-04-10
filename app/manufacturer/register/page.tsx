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
import { FlaskRoundIcon as Flask, Upload, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react"

export default function RegisterProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dosage: "",
    ipfsCid: "",
    status: "Draft",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Generate a random drug ID for preview
  const drugId = `DRG-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate IPFS CID format (simplified for demo)
    const ipfsCidRegex = /^Qm[1-9A-Za-z]{44}$/
    if (formData.ipfsCid && !ipfsCidRegex.test(formData.ipfsCid)) {
      toast({
        title: "Invalid IPFS CID",
        description: "Please enter a valid IPFS CID starting with 'Qm' followed by 44 characters.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Product Registered Successfully",
      description: `Product ${formData.name} has been registered with ID: ${drugId}`,
    })

    // Reset form
    setFormData({
      name: "",
      description: "",
      dosage: "",
      ipfsCid: "",
      status: "Draft",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Register New Product</h1>
          <p className="text-slate-300">Add a new pharmaceutical product to the blockchain</p>
        </div>
        <RoleBadge role="manufacturer" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassContainer className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Product Name</label>
                  <Input
                    placeholder="e.g., Amoxicillin 500mg"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="bg-slate-800/50 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Dosage</label>
                  <Input
                    placeholder="e.g., 500mg"
                    value={formData.dosage}
                    onChange={(e) => handleChange("dosage", e.target.value)}
                    required
                    className="bg-slate-800/50 border-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Description</label>
                <Textarea
                  placeholder="Enter product description and details..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                  className="min-h-[100px] bg-slate-800/50 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">IPFS CID (Content Identifier)</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Qm..."
                    value={formData.ipfsCid}
                    onChange={(e) => handleChange("ipfsCid", e.target.value)}
                    required
                    className="bg-slate-800/50 border-slate-700"
                  />
                  <Button type="button" variant="outline" className="border-slate-700 text-slate-300">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-slate-400">Enter the IPFS Content Identifier for the product metadata</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Initial Status</label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="Draft">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-amber-400" />
                        Draft
                      </div>
                    </SelectItem>
                    <SelectItem value="Active">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value="Recalled">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-400" />
                        Recalled
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" className="border-slate-700 text-slate-300">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {isSubmitting ? "Registering..." : "Register Product"}
              </Button>
            </div>
          </form>
        </GlassContainer>

        <GlassContainer>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Product Preview</h2>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-4">
                <div className="flex items-center justify-center h-32 bg-slate-700/30 rounded-lg">
                  <Flask className="h-16 w-16 text-cyan-400/50" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">
                    {formData.name || "Product Name"}
                    {formData.dosage && ` (${formData.dosage})`}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-3">
                    {formData.description || "Product description will appear here..."}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-slate-400">
                      <FileText className="h-4 w-4 mr-1" />
                      ID: <span className="font-mono ml-1 text-cyan-400">{drugId}</span>
                    </div>
                    <div>
                      {formData.status === "Draft" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400">Draft</span>
                      )}
                      {formData.status === "Active" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Active</span>
                      )}
                      {formData.status === "Recalled" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">Recalled</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-white">Registration Information</h3>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-slate-400">Created By:</span>
                  <span className="font-mono text-slate-300">0x7a3b...21f4</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="text-slate-300">{new Date().toLocaleDateString()}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">IPFS:</span>
                  <span className="font-mono text-cyan-400 truncate max-w-[150px]">
                    {formData.ipfsCid || "Not provided"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  )
}
