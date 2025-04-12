"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"
import { Progress } from "@/components/ui/progress"
import { Search, AlertTriangle, CheckCircle, Filter, Download, ArrowRight } from "lucide-react"

// Mock data for issues
const initialIssues = [
  {
    id: "ISS-2025-001",
    drugId: "DRG-2025-003",
    drugName: "Metformin 850mg",
    description: "Packaging defect reported by multiple distributors",
    severity: 4,
    status: "Open",
    reporter: "0x5e2d...78a3",
    dateReported: "2025-10-28",
    resolution: 0,
  },
  {
    id: "ISS-2025-002",
    drugId: "DRG-2025-007",
    drugName: "Atorvastatin 20mg",
    description: "Possible contamination in batch #A2025-45",
    severity: 5,
    status: "Open",
    reporter: "0x1a7b...34c2",
    dateReported: "2025-11-02",
    resolution: 30,
  },
  {
    id: "ISS-2025-003",
    drugId: "DRG-2025-012",
    drugName: "Lisinopril 10mg",
    description: "Labeling error on dosage instructions",
    severity: 3,
    status: "Open",
    reporter: "0x6d4e...90f1",
    dateReported: "2025-11-05",
    resolution: 60,
  },
  {
    id: "ISS-2025-004",
    drugId: "DRG-2025-009",
    drugName: "Amoxicillin 500mg",
    description: "Inconsistent dissolution rate in quality testing",
    severity: 2,
    status: "Resolved",
    reporter: "0x9c4f...12e8",
    dateReported: "2025-10-15",
    resolution: 100,
  },
  {
    id: "ISS-2025-005",
    drugId: "DRG-2025-015",
    drugName: "Ibuprofen 400mg",
    description: "Discoloration reported in several tablets",
    severity: 3,
    status: "Resolved",
    reporter: "0x2b5a...76d9",
    dateReported: "2025-10-20",
    resolution: 100,
  },
]

export default function IssuesPage() {
  const [issues, setIssues] = useState(initialIssues)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Filter issues based on search term and status filter
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.drugId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? issue.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  // Group issues by status
  const openIssues = filteredIssues.filter((issue) => issue.status === "Open")
  const resolvedIssues = filteredIssues.filter((issue) => issue.status === "Resolved")

  // Mark an issue as resolved
  const resolveIssue = (id: string) => {
    setIssues(issues.map((issue) => (issue.id === id ? { ...issue, status: "Resolved", resolution: 100 } : issue)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Issue Tracker</h1>
          <p className="text-slate-300">Monitor and resolve product quality and safety issues</p>
        </div>
        <RoleBadge role="regulator" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            className={`text-slate-300 border-slate-700 ${statusFilter === null ? "bg-slate-700/50" : ""}`}
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`text-slate-300 border-slate-700 ${statusFilter === "Open" ? "bg-slate-700/50" : ""}`}
            onClick={() => setStatusFilter("Open")}
          >
            Open
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`text-slate-300 border-slate-700 ${statusFilter === "Resolved" ? "bg-slate-700/50" : ""}`}
            onClick={() => setStatusFilter("Resolved")}
          >
            Resolved
          </Button>
          <Button variant="outline" size="sm" className="text-slate-300 border-slate-700 ml-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="text-slate-300 border-slate-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Issues */}
        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
              Open Issues
              <Badge className="ml-2 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">{openIssues.length}</Badge>
            </h2>
          </div>

          <div className="space-y-4">
            {openIssues.length === 0 ? (
              <div className="p-6 text-center text-slate-400 border border-dashed border-slate-700 rounded-lg">
                No open issues found
              </div>
            ) : (
              openIssues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white flex items-center">
                        {issue.drugName}
                        <Badge className="ml-2 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">
                          Severity {issue.severity}
                        </Badge>
                      </h3>
                      <p className="text-sm text-slate-400">
                        {issue.drugId} • Reported on {issue.dateReported}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white"
                      onClick={() => resolveIssue(issue.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-slate-300">{issue.description}</p>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Resolution Progress</span>
                      <span className="text-slate-300">{issue.resolution}%</span>
                    </div>
                    <Progress
                      value={issue.resolution}
                      className="h-1.5 bg-slate-700"
                      indicatorClassName="bg-amber-500"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 text-sm">
                    <span className="text-slate-400">
                      ID: <span className="font-mono">{issue.id}</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 -mr-2"
                    >
                      Details
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassContainer>

        {/* Resolved Issues */}
        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              Resolved Issues
              <Badge className="ml-2 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                {resolvedIssues.length}
              </Badge>
            </h2>
          </div>

          <div className="space-y-4">
            {resolvedIssues.length === 0 ? (
              <div className="p-6 text-center text-slate-400 border border-dashed border-slate-700 rounded-lg">
                No resolved issues found
              </div>
            ) : (
              resolvedIssues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white flex items-center">
                        {issue.drugName}
                        <Badge className="ml-2 bg-green-500/20 text-green-400 hover:bg-green-500/30">Resolved</Badge>
                      </h3>
                      <p className="text-sm text-slate-400">
                        {issue.drugId} • Reported on {issue.dateReported}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300">{issue.description}</p>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Resolution Progress</span>
                      <span className="text-slate-300">{issue.resolution}%</span>
                    </div>
                    <Progress
                      value={issue.resolution}
                      className="h-1.5 bg-slate-700"
                      indicatorClassName="bg-green-500"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 text-sm">
                    <span className="text-slate-400">
                      ID: <span className="font-mono">{issue.id}</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 -mr-2"
                    >
                      Details
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassContainer>
      </div>
    </div>
  )
}
