"use client"

import { useState } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlassCard } from "@/components/glass-card"
import { GlassContainer } from "@/components/glass-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"
import { Progress } from "@/components/ui/progress"
import { ClipboardCheck, AlertTriangle, CheckCircle, Search, ArrowRight, Clock, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegulatorDashboard() {
  const [stats] = useState({
    totalProducts: 124,
    verifiedProducts: 118,
    pendingVerification: 6,
    openIssues: 8,
    complianceRate: 95,
    recentVerifications: [
      {
        id: "VER-2025-001",
        drugId: "DRG-2025-001",
        drugName: "Amoxicillin 500mg",
        manufacturer: "PharmaCorp Inc.",
        status: "Verified",
        date: "2025-11-10",
      },
      {
        id: "VER-2025-002",
        drugId: "DRG-2025-007",
        drugName: "Atorvastatin 20mg",
        manufacturer: "HealthGen Pharmaceuticals",
        status: "Pending",
        date: "2025-11-12",
      },
      {
        id: "VER-2025-003",
        drugId: "DRG-2025-012",
        drugName: "Lisinopril 10mg",
        manufacturer: "MediSynth Labs",
        status: "Verified",
        date: "2025-11-08",
      },
    ],
    recentIssues: [
      {
        id: "ISS-2025-001",
        drugId: "DRG-2025-003",
        drugName: "Metformin 850mg",
        description: "Packaging defect reported by multiple distributors",
        severity: 4,
        status: "Open",
        date: "2025-10-28",
      },
      {
        id: "ISS-2025-002",
        drugId: "DRG-2025-007",
        drugName: "Atorvastatin 20mg",
        description: "Possible contamination in batch #A2025-45",
        severity: 5,
        status: "Open",
        date: "2025-11-02",
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Regulator Dashboard</h1>
          <p className="text-slate-300">Monitor compliance and verify pharmaceutical products</p>
        </div>
        <RoleBadge role="regulator" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <ClipboardCheck className="mr-2 h-5 w-5" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
            <p className="text-xs text-slate-400 mt-1">Registered in the system</p>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Verified Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.verifiedProducts}</p>
            <p className="text-xs text-slate-400 mt-1">Approved for distribution</p>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Pending Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pendingVerification}</p>
            <p className="text-xs text-slate-400 mt-1">Awaiting review</p>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Open Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.openIssues}</p>
            <p className="text-xs text-slate-400 mt-1">Requiring attention</p>
          </CardContent>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassContainer className="lg:col-span-2">
          <Tabs defaultValue="verifications" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-slate-800/50">
                <TabsTrigger value="verifications" className="data-[state=active]:bg-slate-700">
                  Recent Verifications
                </TabsTrigger>
                <TabsTrigger value="issues" className="data-[state=active]:bg-slate-700">
                  Recent Issues
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            <TabsContent value="verifications" className="mt-0 space-y-3">
              {stats.recentVerifications.map((verification) => (
                <div
                  key={verification.id}
                  className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-slate-700/50">
                      <ClipboardCheck className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{verification.drugName}</p>
                      <p className="text-sm text-slate-400">
                        {verification.drugId} • {verification.manufacturer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      className={
                        verification.status === "Verified"
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                      }
                    >
                      {verification.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="ml-2 text-slate-400 hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-2 border-slate-700 text-slate-300">
                View All Verifications
              </Button>
            </TabsContent>

            <TabsContent value="issues" className="mt-0 space-y-3">
              {stats.recentIssues.map((issue) => (
                <div key={issue.id} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white flex items-center">
                        {issue.drugName}
                        <Badge className="ml-2 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">
                          Severity {issue.severity}
                        </Badge>
                      </h3>
                      <p className="text-sm text-slate-400">
                        {issue.drugId} • Reported on {issue.date}
                      </p>
                    </div>
                    <Badge
                      className={
                        issue.status === "Open"
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }
                    >
                      {issue.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-300">{issue.description}</p>

                  <div className="flex justify-between items-center pt-1 text-sm">
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
              ))}

              <Button variant="outline" className="w-full mt-2 border-slate-700 text-slate-300">
                View All Issues
              </Button>
            </TabsContent>
          </Tabs>
        </GlassContainer>

        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Compliance Metrics</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-slate-300">Overall Compliance Rate</p>
                <p className="font-medium text-white">{stats.complianceRate}%</p>
              </div>
              <Progress
                value={stats.complianceRate}
                className="h-2 bg-slate-700"
                indicatorClassName="bg-gradient-to-r from-cyan-500 to-blue-600"
              />
              <p className="text-xs text-slate-400">
                {stats.complianceRate}% of products meet all regulatory requirements
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h3 className="font-medium text-white mb-2">Verification Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Verified Products</span>
                  <span className="font-medium text-white">{stats.verifiedProducts}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Pending Verification</span>
                  <span className="font-medium text-white">{stats.pendingVerification}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Verification Rate</span>
                  <span className="font-medium text-white">
                    {Math.round((stats.verifiedProducts / stats.totalProducts) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button className="w-full justify-start bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                <Shield className="mr-2 h-4 w-4" />
                View Compliance Reports
              </Button>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  )
}
