"use client"

import { useState, useEffect } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlassCard } from "@/components/glass-card"
import { GlassContainer } from "@/components/glass-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  ShieldAlert,
  Activity,
  BarChart3,
  Clock,
  AlertTriangle,
  Gauge,
  Zap,
  Database,
  RefreshCw,
  Info,
  Bell,
} from "lucide-react"
import { RoleBadge } from "@/components/role-badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n"

// Import React components for charts
import { Line, Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

// Mock dynamic data for real-time displays
const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function AdminDashboard() {
  const router = useRouter()
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("daily")
  const [stats, setStats] = useState({
    totalUsers: 124,
    pendingApprovals: 7,
    systemVersion: "1.2.3",
    activeManufacturers: 18,
    activeRegulators: 12,
    activeDistributors: 32,
    systemLoad: 42,
    databaseSize: 128,
    apiRequests: 1243,
    blockchainNodes: 15,
    uptime: "99.98%",
    lastBackup: "2 hours ago",
    recentActivities: [
      { id: 1, action: "Role Assigned", user: "0x7a3b...21f4", role: "Manufacturer", time: "2 hours ago" },
      { id: 2, action: "Role Revoked", user: "0x3f1c...9e82", role: "Distributor", time: "5 hours ago" },
      { id: 3, action: "System Upgrade", user: "0x8d2e...45c7", role: "Admin", time: "1 day ago" },
      { id: 4, action: "Role Assigned", user: "0x2b5a...76d9", role: "Regulator", time: "2 days ago" },
    ],
    alerts: [
      {
        id: 1,
        title: "Unusual API Activity",
        description: "Detected high volume of API requests from IP 192.168.1.45",
        level: "warning",
        time: "30 minutes ago",
      },
      {
        id: 2,
        title: "Database Backup Scheduled",
        description: "Automatic backup scheduled for tonight at 02:00 UTC",
        level: "info",
        time: "1 hour ago",
      },
      {
        id: 3,
        title: "Node Synchronization Issue",
        description: "Blockchain node #5 is out of sync. Automatic resync initiated.",
        level: "error",
        time: "3 hours ago",
      },
    ],
  })

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [chartData, setChartData] = useState({
    userGrowth: {
      labels: [] as string[],
      datasets: [
        {
          label: "User Growth",
          data: [] as number[],
          borderColor: "rgba(0, 194, 255, 1)",
          backgroundColor: "rgba(0, 194, 255, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    roleDistribution: {
      labels: ["Manufacturers", "Distributors", "Regulators", "Public", "Admins"],
      datasets: [
        {
          data: [18, 32, 12, 56, 6],
          backgroundColor: [
            "rgba(0, 194, 255, 0.8)",
            "rgba(128, 0, 255, 0.8)",
            "rgba(0, 255, 128, 0.8)",
            "rgba(255, 200, 0, 0.8)",
            "rgba(255, 0, 128, 0.8)",
          ],
          borderColor: [
            "rgba(0, 194, 255, 1)",
            "rgba(128, 0, 255, 1)",
            "rgba(0, 255, 128, 1)",
            "rgba(255, 200, 0, 1)",
            "rgba(255, 0, 128, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    systemMetrics: {
      labels: [] as string[],
      datasets: [
        {
          label: "API Requests (K)",
          data: [] as number[],
          backgroundColor: "rgba(0, 194, 255, 0.6)",
        },
        {
          label: "Database Queries (K)",
          data: [] as number[],
          backgroundColor: "rgba(128, 0, 255, 0.6)",
        },
        {
          label: "Blockchain Ops (K)",
          data: [] as number[],
          backgroundColor: "rgba(0, 255, 128, 0.6)",
        },
      ],
    },
  })

  // Generate chart data based on time range
  useEffect(() => {
    generateChartData(timeRange)
  }, [timeRange])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => ({
        ...prevStats,
        systemLoad: getRandomValue(30, 70),
        apiRequests: prevStats.apiRequests + getRandomValue(1, 5),
        blockchainNodes: getRandomValue(14, 16),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Generate chart data based on selected time range
  const generateChartData = (range: "daily" | "weekly" | "monthly") => {
    let userLabels: string[] = []
    let userData: number[] = []
    let systemLabels: string[] = []
    let apiData: number[] = []
    let dbData: number[] = []
    let blockchainData: number[] = []

    // Generate appropriate labels and data based on time range
    if (range === "daily") {
      userLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      userData = [65, 72, 86, 95, 103, 111, 122, 129, 140, 155, 165, 178]

      systemLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      apiData = [12, 19, 15, 17, 14, 10, 12]
      dbData = [8, 15, 12, 14, 10, 7, 9]
      blockchainData = [5, 8, 7, 9, 6, 4, 5]
    } else if (range === "weekly") {
      userLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"]
      userData = [60, 75, 90, 105, 120, 135, 150, 165]

      systemLabels = ["Week 1", "Week 2", "Week 3", "Week 4"]
      apiData = [45, 60, 52, 70]
      dbData = [30, 42, 38, 55]
      blockchainData = [20, 25, 22, 30]
    } else if (range === "monthly") {
      userLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      userData = [100, 130, 150, 180, 210, 240]

      systemLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      apiData = [150, 180, 210, 240, 270, 300]
      dbData = [100, 120, 140, 160, 180, 200]
      blockchainData = [50, 60, 70, 80, 90, 100]
    }

    setChartData({
      userGrowth: {
        labels: userLabels,
        datasets: [
          {
            label: t("userGrowth"),
            data: userData,
            borderColor: "rgba(0, 194, 255, 1)",
            backgroundColor: "rgba(0, 194, 255, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      roleDistribution: {
        labels: [t("manufacturers"), t("distributors"), t("regulators"), t("public"), t("admins")],
        datasets: chartData.roleDistribution.datasets,
      },
      systemMetrics: {
        labels: systemLabels,
        datasets: [
          {
            label: t("apiRequests"),
            data: apiData,
            backgroundColor: "rgba(0, 194, 255, 0.6)",
          },
          {
            label: t("databaseQueries"),
            data: dbData,
            backgroundColor: "rgba(128, 0, 255, 0.6)",
          },
          {
            label: t("blockchainOps"),
            data: blockchainData,
            backgroundColor: "rgba(0, 255, 128, 0.6)",
          },
        ],
      },
    })
  }

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#94a3b8",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "#94a3b8",
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "#94a3b8",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    animation: {
      duration: 1000,
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#94a3b8",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "#94a3b8",
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "#94a3b8",
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "#94a3b8",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  }

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate data fetching
    setTimeout(() => {
      // Regenerate chart data based on current time range
      generateChartData(timeRange)
      setIsRefreshing(false)
    }, 1000)
  }

  const handleTimeRangeChange = (range: "daily" | "weekly" | "monthly") => {
    setTimeRange(range)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{t("adminDashboard")}</h1>
          <p className="text-slate-300">{t("adminDashboardDescription")}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? t("refreshing") : t("refreshData")}
          </Button>
          <RoleBadge role="admin" />
        </div>
      </div>

      {/* Admin Navigation Links - Always visible */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-auto py-3 flex flex-col items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 border-slate-700"
          onClick={() => router.push("/admin/roles")}
        >
          <Users className="h-5 w-5 text-cyan-400" />
          <span>{t("roleManagement")}</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-3 flex flex-col items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 border-slate-700"
          onClick={() => router.push("/admin/upgrades")}
        >
          <ShieldAlert className="h-5 w-5 text-cyan-400" />
          <span>{t("systemUpgrades")}</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-3 flex flex-col items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 border-slate-700"
          onClick={() => router.push("/admin/analytics")}
        >
          <BarChart3 className="h-5 w-5 text-cyan-400" />
          <span>{t("analytics")}</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-3 flex flex-col items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 border-slate-700"
          onClick={() => router.push("/admin/database")}
        >
          <Database className="h-5 w-5 text-cyan-400" />
          <span>{t("database")}</span>
        </Button>
      </div>

      {/* Real-time metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,194,214,0.2)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              {t("totalUsers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">+4.2%</Badge>
            </div>
            <div className="mt-2">
              <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  style={{ width: "70%", transition: "width 1s ease-in-out" }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-1">{t("targetReached", { percent: "70%" })}</p>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard
          className="transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,194,214,0.2)] cursor-pointer"
          onClick={() => router.push("/admin/roles")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <ShieldAlert className="mr-2 h-5 w-5" />
              {t("pendingApprovals")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
              <div className="flex items-center text-amber-400 text-sm">
                <div className="animate-pulse mr-1 h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                {t("needsAttention")}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">{t("awaitingReview")}</p>
          </CardContent>
        </GlassCard>

        <GlassCard className="transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,194,214,0.2)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              {t("systemLoad")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{stats.systemLoad}%</p>
              <Badge
                className={
                  stats.systemLoad < 50
                    ? "bg-green-500/20 text-green-400"
                    : stats.systemLoad < 80
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-red-500/20 text-red-400"
                }
              >
                <div className="animate-pulse mr-1 h-1.5 w-1.5 rounded-full bg-current"></div>
                {t("live")}
              </Badge>
            </div>
            <div className="mt-2">
              <Progress
                value={stats.systemLoad}
                className="h-1 bg-slate-700"
                indicatorClassName={
                  stats.systemLoad < 50 ? "bg-green-500" : stats.systemLoad < 80 ? "bg-amber-500" : "bg-red-500"
                }
              />
              <p className="text-xs text-slate-400 mt-1">{t("systemPerformanceNormal")}</p>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard
          className="transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,194,214,0.2)] cursor-pointer"
          onClick={() => router.push("/admin/analytics")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              {t("activeEntities")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {stats.activeManufacturers + stats.activeRegulators + stats.activeDistributors}
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                M: {stats.activeManufacturers}
              </Badge>
              <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                R: {stats.activeRegulators}
              </Badge>
              <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">
                D: {stats.activeDistributors}
              </Badge>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassContainer className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">{t("systemAnalytics")}</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={
                  timeRange === "daily"
                    ? "text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10"
                    : "text-slate-400 border-slate-700 hover:bg-slate-700/50"
                }
                onClick={() => handleTimeRangeChange("daily")}
              >
                {t("daily")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={
                  timeRange === "weekly"
                    ? "text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10"
                    : "text-slate-400 border-slate-700 hover:bg-slate-700/50"
                }
                onClick={() => handleTimeRangeChange("weekly")}
              >
                {t("weekly")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={
                  timeRange === "monthly"
                    ? "text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10"
                    : "text-slate-400 border-slate-700 hover:bg-slate-700/50"
                }
                onClick={() => handleTimeRangeChange("monthly")}
              >
                {t("monthly")}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-[300px] p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">{t("userGrowthTrend")}</h3>
              <Line data={chartData.userGrowth} options={lineOptions} height={250} />
            </div>

            <div className="h-[300px] p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">{t("systemPerformanceMetrics")}</h3>
              <Bar data={chartData.systemMetrics} options={barOptions} height={250} />
            </div>
          </div>
        </GlassContainer>

        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{t("systemStatus")}</h2>
          </div>

          <div className="space-y-6">
            <div className="h-[250px] p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">{t("userDistribution")}</h3>
              <Doughnut data={chartData.roleDistribution} options={doughnutOptions} height={200} />
            </div>

            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <h3 className="text-white font-medium mb-3">{t("systemMetrics")}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-slate-300 flex items-center">
                      <Gauge className="h-4 w-4 mr-1 text-cyan-400" />
                      {t("uptime")}
                    </span>
                    <span className="text-green-400">{stats.uptime}</span>
                  </div>
                  <Progress value={99.98} className="h-1 bg-slate-700" indicatorClassName="bg-green-500" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-slate-300 flex items-center">
                      <Zap className="h-4 w-4 mr-1 text-cyan-400" />
                      {t("apiRequestsToday")}
                    </span>
                    <span className="text-blue-400">{stats.apiRequests.toLocaleString()}</span>
                  </div>
                  <Progress value={75} className="h-1 bg-slate-700" indicatorClassName="bg-blue-500" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-slate-300 flex items-center">
                      <Database className="h-4 w-4 mr-1 text-cyan-400" />
                      {t("databaseSize")}
                    </span>
                    <span className="text-purple-400">{stats.databaseSize} MB</span>
                  </div>
                  <Progress value={60} className="h-1 bg-slate-700" indicatorClassName="bg-purple-500" />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">{t("lastBackup")}</span>
                  <span className="text-slate-300">{stats.lastBackup}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">{t("activeBlockchainNodes")}</span>
                  <span className="text-slate-300">{stats.blockchainNodes}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full justify-start bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
                onClick={() => router.push("/admin/analytics")}
              >
                <Activity className="mr-2 h-4 w-4" />
                {t("viewSystemHealth")}
              </Button>

              <Button
                className="w-full justify-start bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
                onClick={() => router.push("/admin/database")}
              >
                <Database className="mr-2 h-4 w-4" />
                {t("databaseManagement")}
              </Button>
            </div>
          </div>
        </GlassContainer>
      </div>

      {/* Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{t("recentActivity")}</h2>
            <Button
              variant="outline"
              size="sm"
              className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10"
              onClick={() => router.push("/admin/analytics")}
            >
              {t("viewAll")}
            </Button>
          </div>

          <div className="space-y-3">
            {stats.recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-slate-700/50">
                    {activity.action.includes("Role") ? (
                      <Users className="h-4 w-4 text-cyan-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{t(activity.action.replace(/\s+/g, ""))}</p>
                    <p className="text-sm text-slate-400">
                      {activity.user} • {t(activity.role.toLowerCase())}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </GlassContainer>

        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{t("systemAlerts")}</h2>
            <Badge className="bg-amber-500/20 text-amber-400">
              {stats.alerts.length} {t("active")}
            </Badge>
          </div>

          <div className="space-y-3">
            {stats.alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border flex items-start gap-3 ${
                  alert.level === "error"
                    ? "bg-red-500/10 border-red-500/30"
                    : alert.level === "warning"
                      ? "bg-amber-500/10 border-amber-500/30"
                      : "bg-blue-500/10 border-blue-500/30"
                }`}
              >
                <div
                  className={`p-2 rounded-full flex-shrink-0 ${
                    alert.level === "error"
                      ? "bg-red-500/20"
                      : alert.level === "warning"
                        ? "bg-amber-500/20"
                        : "bg-blue-500/20"
                  }`}
                >
                  {alert.level === "error" ? (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  ) : alert.level === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Info className="h-4 w-4 text-blue-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3
                      className={`font-medium ${
                        alert.level === "error"
                          ? "text-red-400"
                          : alert.level === "warning"
                            ? "text-amber-400"
                            : "text-blue-400"
                      }`}
                    >
                      {t(alert.title.replace(/\s+/g, ""))}
                    </h3>
                    <span className="text-xs text-slate-400">{alert.time}</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">{t(alert.description.replace(/\s+/g, ""))}</p>
                </div>
              </div>
            ))}

            <Button
              className="w-full justify-start bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
              onClick={() => router.push("/notifications")}
            >
              <Bell className="mr-2 h-4 w-4" />
              {t("manageAlertSettings")}
            </Button>
          </div>
        </GlassContainer>
      </div>

      {/* Quick Actions */}
      <GlassContainer>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{t("quickActions")}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
            onClick={() => router.push("/admin/roles")}
          >
            <Users className="h-5 w-5" />
            <span>{t("manageRoles")}</span>
          </Button>

          <Button
            className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
            onClick={() => router.push("/admin/upgrades")}
          >
            <ShieldAlert className="h-5 w-5" />
            <span>{t("systemUpgrades")}</span>
          </Button>

          <Button
            className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
            onClick={() => router.push("/admin/analytics")}
          >
            <Activity className="h-5 w-5" />
            <span>{t("viewAuditLogs")}</span>
          </Button>

          <Button
            className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
            onClick={() => router.push("/admin/database")}
          >
            <Database className="h-5 w-5" />
            <span>{t("backupSystem")}</span>
          </Button>
        </div>
      </GlassContainer>
    </div>
  )
}
