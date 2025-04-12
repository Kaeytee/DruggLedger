"use client"

import { useState } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlassCard } from "@/components/glass-card"
import { GlassContainer } from "@/components/glass-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"
import { Progress } from "@/components/ui/progress"
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  RefreshCw,
  ArrowRight,
  Calendar,
} from "lucide-react"

export default function DistributorDashboard() {
  const [stats] = useState({
    activeShipments: 18,
    completedShipments: 124,
    pendingShipments: 7,
    delayedShipments: 2,
    onTimeRate: 96,
    recentShipments: [
      {
        id: "SHP-2025-001",
        drugId: "DRG-2025-001",
        drugName: "Amoxicillin 500mg",
        destination: "Central Hospital, New York",
        status: "In Transit",
        progress: 65,
        eta: "2025-11-15",
      },
      {
        id: "SHP-2025-002",
        drugId: "DRG-2025-007",
        drugName: "Atorvastatin 20mg",
        destination: "MedPharm Distributor, Chicago",
        status: "Delivered",
        progress: 100,
        eta: "2025-11-10",
      },
      {
        id: "SHP-2025-003",
        drugId: "DRG-2025-012",
        drugName: "Lisinopril 10mg",
        destination: "County Medical Center, Los Angeles",
        status: "Preparing",
        progress: 15,
        eta: "2025-11-20",
      },
      {
        id: "SHP-2025-004",
        drugId: "DRG-2025-003",
        drugName: "Metformin 850mg",
        destination: "Regional Health Clinic, Miami",
        status: "Delayed",
        progress: 40,
        eta: "2025-11-18",
      },
    ],
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Distributor Dashboard</h1>
          <p className="text-slate-300">Track shipments and manage pharmaceutical distribution</p>
        </div>
        <RoleBadge role="distributor" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Active Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeShipments}</p>
            <p className="text-xs text-slate-400 mt-1">Currently in transit</p>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.completedShipments}</p>
            <p className="text-xs text-slate-400 mt-1">Successfully delivered</p>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pendingShipments}</p>
            <p className="text-xs text-slate-400 mt-1">Awaiting processing</p>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Delayed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.delayedShipments}</p>
            <p className="text-xs text-slate-400 mt-1">Requires attention</p>
          </CardContent>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassContainer className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Shipments</h2>
            <Button
              variant="outline"
              size="sm"
              className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
          <div className="space-y-3">
            {stats.recentShipments.map((shipment) => (
              <div key={shipment.id} className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white flex items-center">
                      {shipment.drugName}
                      <Badge
                        className={
                          shipment.status === "Delivered"
                            ? "ml-2 bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : shipment.status === "In Transit"
                              ? "ml-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              : shipment.status === "Delayed"
                                ? "ml-2 bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                : "ml-2 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                        }
                      >
                        {shipment.status}
                      </Badge>
                    </h3>
                    <p className="text-sm text-slate-400">
                      {shipment.drugId} • Shipment ID: {shipment.id}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center text-sm text-slate-300">
                  <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                  Destination: {shipment.destination}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Shipment Progress</span>
                    <span className="text-slate-300">{shipment.progress}%</span>
                  </div>
                  <Progress
                    value={shipment.progress}
                    className="h-1.5 bg-slate-700"
                    indicatorClassName={
                      shipment.status === "Delayed"
                        ? "bg-red-500"
                        : shipment.status === "Delivered"
                          ? "bg-green-500"
                          : "bg-gradient-to-r from-cyan-500 to-blue-600"
                    }
                  />
                </div>

                <div className="flex justify-between items-center pt-1 text-xs text-slate-400">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    ETA: {shipment.eta}
                  </span>
                  {shipment.status === "In Transit" && (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Tracking updates every 30 min
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassContainer>

        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Distribution Metrics</h2>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-slate-300">On-Time Delivery Rate</p>
                <p className="font-medium text-white">{stats.onTimeRate}%</p>
              </div>
              <Progress
                value={stats.onTimeRate}
                className="h-2 bg-slate-700"
                indicatorClassName="bg-gradient-to-r from-cyan-500 to-blue-600"
              />
              <p className="text-xs text-slate-400">{stats.onTimeRate}% of shipments delivered on schedule</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h3 className="font-medium text-white mb-2">Upcoming Deliveries</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Today</span>
                  <span className="font-medium text-white">3</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Tomorrow</span>
                  <span className="font-medium text-white">5</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">This Week</span>
                  <span className="font-medium text-white">12</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button className="w-full justify-start bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Button>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  )
}
