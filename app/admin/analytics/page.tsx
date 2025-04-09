"use client"

import { useState, useEffect } from "react"
import { GlassContainer } from "@/components/glass-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  BarChart3,
  LineChart,
  Users,
  FileText,
  ShieldAlert,
  Download,
  FileDown,
  Share2,
  RefreshCw,
  CheckCircle,
  Gauge,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Import React components for charts
import { Line, Bar, Pie, Scatter, Radar } from "react-chartjs-2"
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
  RadialLinearScale,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
)

// Mock data generator for different time periods
const generateTimeData = (period: string) => {
  const getRandomValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // Generate data based on the selected time period
  if (period === "day") {
    // 24 hours data
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
    return {
      labels: hours,
      userActivity: {
        active: Array.from({ length: 24 }, () => getRandomValue(20, 100)),
        new: Array.from({ length: 24 }, () => getRandomValue(1, 15)),
      },
      operations: {
        registrations: Array.from({ length: 24 }, () => getRandomValue(0, 5)),
        shipments: Array.from({ length: 24 }, () => getRandomValue(0, 8)),
        verifications: Array.from({ length: 24 }, () => getRandomValue(0, 6)),
      },
    }
  } else if (period === "week") {
    // 7 days data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return {
      labels: days,
      userActivity: {
        active: Array.from({ length: 7 }, () => getRandomValue(50, 150)),
        new: Array.from({ length: 7 }, () => getRandomValue(5, 25)),
      },
      operations: {
        registrations: Array.from({ length: 7 }, () => getRandomValue(5, 20)),
        shipments: Array.from({ length: 7 }, () => getRandomValue(8, 25)),
        verifications: Array.from({ length: 7 }, () => getRandomValue(3, 15)),
      },
    }
  } else {
    // 30 days/month data
    const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
    return {
      labels: days,
      userActivity: {
        active: Array.from({ length: 30 }, () => getRandomValue(80, 200)),
        new: Array.from({ length: 30 }, () => getRandomValue(10, 40)),
      },
      operations: {
        registrations: Array.from({ length: 30 }, () => getRandomValue(15, 50)),
        shipments: Array.from({ length: 30 }, () => getRandomValue(20, 60)),
        verifications: Array.from({ length: 30 }, () => getRandomValue(10, 40)),
      },
    }
  }
}

// Calculate summary statistics based on the current time period
const calculateSummaryStats = (
  data = {
    labels: [],
    userActivity: { active: [], new: [] },
    operations: { registrations: [], shipments: [], verifications: [] },
  },
) => {
  const activeUsers = data.userActivity.active
  const newUsers = data.userActivity.new
  const registrations = data.operations.registrations

  return {
    totalActiveUsers: activeUsers.reduce((sum, val) => sum + val, 0),
    avgActiveUsers: Math.round(activeUsers.reduce((sum, val) => sum + val, 0) / activeUsers.length),
    totalNewUsers: newUsers.reduce((sum, val) => sum + val, 0),
    growthRate: Math.round(((newUsers[newUsers.length - 1] - newUsers[0]) / Math.max(1, newUsers[0])) * 100 * 10) / 10,
    totalRegistrations: registrations.reduce((sum, val) => sum + val, 0),
    peakUsage: Math.max(...activeUsers),
    peakTime: data.labels[activeUsers.indexOf(Math.max(...activeUsers))],
  }
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [periodData, setPeriodData] = useState(generateTimeData(timeRange))
  const { toast } = useToast()
  const [summaryStats, setSummaryStats] = useState(calculateSummaryStats(periodData))

  // Update data when time range changes
  useEffect(() => {
    // Generate new data when time range changes
    const newData = generateTimeData(timeRange)
    setPeriodData(newData)

    // Update summary statistics based on new data
    const stats = calculateSummaryStats(newData)
    setSummaryStats(stats)
  }, [timeRange])

  // Mock chart data
  const userActivityData = {
    labels: periodData.labels,
    datasets: [
      {
        label: "Active Users",
        data: periodData.userActivity.active,
        borderColor: "rgba(0, 194, 255, 1)",
        backgroundColor: "rgba(0, 194, 255, 0.5)",
        tension: 0.4,
      },
      {
        label: "New Users",
        data: periodData.userActivity.new,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  }

  const operationsData = {
    labels: periodData.labels,
    datasets: [
      {
        label: "Registrations",
        data: periodData.operations.registrations,
        backgroundColor: "rgba(0, 194, 255, 0.6)",
      },
      {
        label: "Shipments",
        data: periodData.operations.shipments,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Verifications",
        data: periodData.operations.verifications,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  const roleDistributionData = {
    labels: ["Manufacturers", "Distributors", "Regulators", "Public", "Admins"],
    datasets: [
      {
        data: [18, 32, 12, 56, 6],
        backgroundColor: [
          "rgba(0, 194, 255, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(255, 99, 132, 0.8)",
        ],
        borderColor: [
          "rgba(0, 194, 255, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const systemPerformanceData = {
    labels: ["API Response", "Database Query", "Blockchain Ops", "Authentication", "Data Processing", "File Handling"],
    datasets: [
      {
        label: "Current",
        data: [85, 90, 78, 88, 82, 92],
        backgroundColor: "rgba(0, 194, 255, 0.5)",
        borderColor: "rgba(0, 194, 255, 1)",
        pointBackgroundColor: "rgba(0, 194, 255, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(0, 194, 255, 1)",
      },
      {
        label: "Previous",
        data: [78, 85, 70, 80, 75, 85],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  }

  const geographicDistributionData = {
    datasets: [
      {
        label: "User Distribution",
        data: [
          { x: 30, y: 40, r: 10 }, // North America
          { x: 60, y: 30, r: 15 }, // Europe
          { x: 80, y: 50, r: 8 }, // Asia
          { x: 20, y: 80, r: 5 }, // South America
          { x: 70, y: 70, r: 7 }, // Australia
          { x: 50, y: 60, r: 3 }, // Africa
        ],
        backgroundColor: [
          "rgba(0, 194, 255, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
      },
    ],
  }

  // Chart options
  const lineOptions = {
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
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
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
        mode: "index" as const,
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

  const pieOptions = {
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
        callbacks: {
          label: (context: any) => {
            const label = context.label || ""
            const value = context.raw || 0
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = Math.round((value / total) * 100)
            return `${label}: ${value} (${percentage}%)`
          },
        },
      },
    },
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#94a3b8",
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: "rgba(148, 163, 184, 0.2)",
        },
        grid: {
          color: "rgba(148, 163, 184, 0.2)",
        },
        pointLabels: {
          color: "#94a3b8",
        },
        ticks: {
          backdropColor: "transparent",
          color: "#94a3b8",
        },
      },
    },
  }

  const scatterOptions = {
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
        callbacks: {
          label: (context: any) => `Region ${context.dataIndex + 1}: ${context.raw.r} users`,
        },
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
        title: {
          display: true,
          text: "Longitude",
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
        title: {
          display: true,
          text: "Latitude",
          color: "#94a3b8",
        },
      },
    },
  }

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate API call delay
    setTimeout(() => {
      // Generate new data for the current time range
      const newData = generateTimeData(timeRange)
      setPeriodData(newData)

      // Update summary statistics
      setSummaryStats(calculateSummaryStats(newData))

      toast({
        title: "Analytics Refreshed",
        description: `Data updated for ${timeRange === "day" ? "daily" : timeRange === "week" ? "weekly" : "monthly"} view.`,
      })

      setIsRefreshing(false)
    }, 1000)
  }

  // Remove this line:
  // const summaryStats = calculateSummaryStats()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-slate-300">Comprehensive platform analytics and data visualization</p>
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
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
          <RoleBadge role="admin" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-800/50 w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-700">
              <Users className="h-4 w-4 mr-2" />
              User Analytics
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-slate-700">
              <FileText className="h-4 w-4 mr-2" />
              Operations
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-slate-700">
              <ShieldAlert className="h-4 w-4 mr-2" />
              System Performance
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Calendar className="h-4 w-4 text-slate-400" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px] bg-slate-800/50 border-slate-700 h-9">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Time Period Summary Stats */}
      <GlassContainer className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {timeRange === "day" ? "Daily" : timeRange === "week" ? "Weekly" : "Monthly"} Summary
          </h2>
          <Badge className="bg-cyan-500/20 text-cyan-400">
            {timeRange === "day" ? "Last 24 Hours" : timeRange === "week" ? "Last 7 Days" : "Last 30 Days"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <Users className="h-4 w-4 text-cyan-400" />
              Total Active Users
            </div>
            <p className="text-2xl font-bold text-white">{summaryStats.totalActiveUsers.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">
              Avg: {summaryStats.avgActiveUsers} per{" "}
              {timeRange === "day" ? "hour" : timeRange === "week" ? "day" : "day"}
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <LineChart className="h-4 w-4 text-green-400" />
              New Users
            </div>
            <p className="text-2xl font-bold text-white">{summaryStats.totalNewUsers.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <Badge
                className={`text-xs ${summaryStats.growthRate >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
              >
                {summaryStats.growthRate >= 0 ? "+" : ""}
                {summaryStats.growthRate}%
              </Badge>
              <span className="text-xs text-slate-400">growth rate</span>
            </div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <FileText className="h-4 w-4 text-purple-400" />
              Total Registrations
            </div>
            <p className="text-2xl font-bold text-white">{summaryStats.totalRegistrations.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">
              {Math.round(
                (summaryStats.totalRegistrations / (timeRange === "day" ? 24 : timeRange === "week" ? 7 : 30)) * 10,
              ) / 10}{" "}
              per {timeRange === "day" ? "hour" : "day"}
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <Gauge className="h-4 w-4 text-amber-400" />
              Peak Usage
            </div>
            <p className="text-2xl font-bold text-white">{summaryStats.peakUsage.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">at {summaryStats.peakTime}</p>
          </div>
        </div>
      </GlassContainer>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassContainer className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Users</p>
              <p className="text-2xl font-bold text-white">124</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Users className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">+4.6%</Badge>
            <span className="text-slate-400 ml-2">vs. last period</span>
          </div>
        </GlassContainer>

        <GlassContainer className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Products</p>
              <p className="text-2xl font-bold text-white">56</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center">
              <FileText className="h-5 w-5 text-purple-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">+2.8%</Badge>
            <span className="text-slate-400 ml-2">vs. last period</span>
          </div>
        </GlassContainer>

        <GlassContainer className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Verification Rate</p>
              <p className="text-2xl font-bold text-white">95%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">+1.2%</Badge>
            <span className="text-slate-400 ml-2">vs. last period</span>
          </div>
        </GlassContainer>

        <GlassContainer className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Avg. Response Time</p>
              <p className="text-2xl font-bold text-white">240ms</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">+8ms</Badge>
            <span className="text-slate-400 ml-2">vs. last period</span>
          </div>
        </GlassContainer>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">User Activity</h2>
            <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="h-[300px]">
            <Line data={userActivityData} options={lineOptions} />
          </div>
        </GlassContainer>

        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Operations Overview</h2>
            <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="h-[300px]">
            <Bar data={operationsData} options={barOptions} />
          </div>
        </GlassContainer>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Role Distribution</h2>
          </div>
          <div className="h-[300px]">
            <Pie data={roleDistributionData} options={pieOptions} />
          </div>
        </GlassContainer>

        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">System Performance</h2>
          </div>
          <div className="h-[300px]">
            <Radar data={systemPerformanceData} options={radarOptions} />
          </div>
        </GlassContainer>

        <GlassContainer>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Geographic Distribution</h2>
          </div>
          <div className="h-[300px]">
            <Scatter data={geographicDistributionData} options={scatterOptions} />
          </div>
        </GlassContainer>
      </div>

      {/* Reports & Export */}
      <GlassContainer>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Analytics Reports</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
            <FileDown className="h-6 w-6" />
            <span>User Activity Report</span>
          </Button>

          <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
            <FileDown className="h-6 w-6" />
            <span>Operations Report</span>
          </Button>

          <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
            <FileDown className="h-6 w-6" />
            <span>System Performance</span>
          </Button>

          <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
            <Share2 className="h-6 w-6" />
            <span>Custom Report Builder</span>
          </Button>
        </div>
      </GlassContainer>
    </div>
  )
}

