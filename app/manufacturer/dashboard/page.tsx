"use client"

import { useState } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlassCard } from "@/components/glass-card"
import { GlassContainer } from "@/components/glass-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FlaskRoundIcon as Flask, AlertCircle, CheckCircle, Clock, Plus, ArrowRight } from "lucide-react"
import { RoleBadge } from "@/components/role-badge"
import { Progress } from "@/components/ui/progress"

export default function ManufacturerDashboard() {
  const [stats] = useState({
    totalDrugs: 42,
    activeDrugs: 36,
    recalledDrugs: 3,
    draftDrugs: 3,
    verificationRate: 92,
    recentDrugs: [
      { id: "DRG-2023-001", name: "Amoxicillin 500mg", status: "Active", date: "2023-11-10" },
      { id: "DRG-2023-002", name: "Lisinopril 10mg", status: "Active", date: "2023-11-05" },
      { id: "DRG-2023-003", name: "Metformin 850mg", status: "Recalled", date: "2023-10-28" },
      { id: "DRG-2023-004", name: "Atorvastatin 20mg", status: "Draft", date: "2023-11-12" },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manufacturer Dashboard</h1>
          <p className="text-slate-300">Manage your pharmaceutical products and track their status</p>
        </div>
        <RoleBadge role="manufacturer" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <Flask className="mr-2 h-5 w-5" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalDrugs}</p>
            <p className="text-xs text-slate-400 mt-1">Registered products</p>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Active Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeDrugs}</p>
            <p className="text-xs text-slate-400 mt-1">In distribution</p>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Recalled Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.recalledDrugs}</p>
            <p className="text-xs text-slate-400 mt-1">Safety concerns</p>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Draft Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.draftDrugs}</p>
            <p className="text-xs text-slate-400 mt-1">Pending submission</p>
          </CardContent>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassContainer className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Products</h2>
            <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {stats.recentDrugs.map((drug) => (
              <div
                key={drug.id}
                className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-slate-700/50">
                    <Flask className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{drug.name}</p>
                    <p className="text-sm text-slate-400">
                      {drug.id} • {drug.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge
                    className={
                      drug.status === "Active"
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : drug.status === "Recalled"
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                    }
                  >
                    {drug.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="ml-2 text-slate-400 hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </GlassContainer>

        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Verification Status</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-slate-300">Verification Rate</p>
                <p className="font-medium text-white">{stats.verificationRate}%</p>
              </div>
              <Progress
                value={stats.verificationRate}
                className="h-2 bg-slate-700"
                indicatorClassName="bg-gradient-to-r from-cyan-500 to-blue-600"
              />
              <p className="text-xs text-slate-400">
                {stats.verificationRate}% of your products have been verified by regulators
              </p>
            </div>

            <div className="pt-4">
              <Button className="w-full justify-start bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                <Plus className="mr-2 h-4 w-4" />
                Register New Product
              </Button>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  )
}

