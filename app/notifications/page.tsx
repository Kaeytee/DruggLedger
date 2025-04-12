"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  ShieldAlert,
  Clock,
  CheckCheck,
  BarChart3,
  RefreshCw,
  Truck,
  FileText,
  FlaskRoundIcon as Flask,
  Package,
  Trash2,
  Settings,
  Eye,
  Users,
  ArrowRight,
  User,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Define notification types
type NotificationType = "all" | "alerts" | "updates" | "system" | "shipments"
type NotificationPriority = "high" | "medium" | "low"
type NotificationStatus = "unread" | "read"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  type: NotificationType
  priority: NotificationPriority
  status: NotificationStatus
  icon?: JSX.Element
  user?: {
    name: string
    avatar?: string
    role?: string
  }
  action?: {
    label: string
    link: string
  }
}

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<NotificationType>("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-001",
      title: "New Shipment Assigned",
      message: "Shipment SHP-2025-007 has been assigned to your account.",
      timestamp: "2 hours ago",
      type: "shipments",
      priority: "medium",
      status: "unread",
      icon: <Truck className="h-4 w-4 text-blue-400" />,
      action: {
        label: "View Shipment",
        link: "/distributor/track",
      },
    },
    {
      id: "notif-002",
      title: "Product Verification Complete",
      message: "Amoxicillin 500mg (DRG-2025-001) has been verified by a regulator.",
      timestamp: "5 hours ago",
      type: "updates",
      priority: "medium",
      status: "unread",
      icon: <CheckCircle className="h-4 w-4 text-green-400" />,
      action: {
        label: "View Product",
        link: "/manufacturer/products",
      },
    },
    {
      id: "notif-003",
      title: "System Maintenance",
      message:
        "The system will undergo maintenance on Nov 20, 2025 from 2:00 AM to 4:00 AM UTC. Service may be temporarily unavailable during this period.",
      timestamp: "1 day ago",
      type: "system",
      priority: "high",
      status: "read",
      icon: <AlertTriangle className="h-4 w-4 text-amber-400" />,
    },
    {
      id: "notif-004",
      title: "Security Alert",
      message:
        "A new device was used to sign in to your account. If this wasn't you, please secure your account immediately.",
      timestamp: "2 days ago",
      type: "alerts",
      priority: "high",
      status: "read",
      icon: <ShieldAlert className="h-4 w-4 text-red-400" />,
      action: {
        label: "Secure Account",
        link: "/settings/security",
      },
    },
    {
      id: "notif-005",
      title: "Product Added to Watchlist",
      message: "Lisinopril 10mg (DRG-2025-012) has been added to your watchlist.",
      timestamp: "3 days ago",
      type: "updates",
      priority: "low",
      status: "read",
      icon: <Eye className="h-4 w-4 text-purple-400" />,
    },
    {
      id: "notif-006",
      title: "Shipment Delivered",
      message: "Shipment SHP-2025-002 has been successfully delivered to its destination.",
      timestamp: "4 days ago",
      type: "shipments",
      priority: "medium",
      status: "read",
      icon: <Package className="h-4 w-4 text-green-400" />,
    },
    {
      id: "notif-007",
      title: "Quality Inspection Required",
      message: "Batch #A2025-45 of Atorvastatin 20mg requires quality inspection before distribution.",
      timestamp: "5 days ago",
      type: "alerts",
      priority: "high",
      status: "read",
      icon: <FileText className="h-4 w-4 text-amber-400" />,
      action: {
        label: "View Details",
        link: "/manufacturer/products",
      },
    },
    {
      id: "notif-008",
      title: "Analytics Report Ready",
      message: "Your monthly analytics report for October 2025 is now available for review.",
      timestamp: "1 week ago",
      type: "updates",
      priority: "low",
      status: "read",
      icon: <BarChart3 className="h-4 w-4 text-cyan-400" />,
      action: {
        label: "View Report",
        link: "/analytics",
      },
    },
    {
      id: "notif-009",
      title: "New Role Assignment",
      message: "User 0x3f1c...9e82 has been assigned the Distributor role by an administrator.",
      timestamp: "1 week ago",
      type: "system",
      priority: "medium",
      status: "read",
      icon: <Users className="h-4 w-4 text-blue-400" />,
      user: {
        name: "System Admin",
        role: "Admin",
      },
    },
    {
      id: "notif-010",
      title: "Product Registration Successful",
      message: "Your product Metformin 850mg has been successfully registered with ID: DRG-2025-003.",
      timestamp: "2 weeks ago",
      type: "updates",
      priority: "medium",
      status: "read",
      icon: <Flask className="h-4 w-4 text-cyan-400" />,
    },
  ])

  // Filter notifications based on selected type
  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((notif) => notif.type === filter)

  // Count unread notifications
  const unreadCount = notifications.filter((notif) => notif.status === "unread").length

  // Refresh notifications
  const refreshNotifications = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({
        ...notif,
        status: "read",
      })),
    )
  }

  // Mark single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, status: "read" } : notif)))
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Get notification badge color based on priority
  const getPriorityBadgeClass = (priority: NotificationPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
    }
  }

  // Get notification container class based on status
  const getNotificationClass = (status: NotificationStatus) => {
    return status === "unread" ? "bg-slate-800/50 border-slate-700/50" : "bg-slate-800/30 border-slate-700/30"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Bell className="h-8 w-8 text-cyan-400" />
            Notifications
          </h1>
          <p className="text-slate-300">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "No new notifications"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300"
            onClick={refreshNotifications}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            variant="outline"
            className="border-slate-700 text-slate-300"
            onClick={() => markAllAsRead()}
            disabled={!notifications.some((n) => n.status === "unread")}
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>

          <Button
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            onClick={() => clearAllNotifications()}
            disabled={notifications.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <GlassContainer>
        <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as NotificationType)}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-slate-800/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
                All
              </TabsTrigger>
              <TabsTrigger value="alerts" className="data-[state=active]:bg-slate-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alerts
              </TabsTrigger>
              <TabsTrigger value="updates" className="data-[state=active]:bg-slate-700">
                <Info className="h-4 w-4 mr-2" />
                Updates
              </TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-slate-700">
                <Settings className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
              <TabsTrigger value="shipments" className="data-[state=active]:bg-slate-700">
                <Truck className="h-4 w-4 mr-2" />
                Shipments
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content for all tabs */}
          {["all", "alerts", "updates", "system", "shipments"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="mt-0 relative">
              {filteredNotifications.length === 0 ? (
                <div className="py-20 text-center">
                  <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-slate-300">No notifications</h3>
                  <p className="text-slate-400 mt-1">
                    You don't have any {tabValue !== "all" ? tabValue : ""} notifications at this time
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3 pb-2">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${getNotificationClass(notification.status)} ${notification.status === "unread" ? "animate-pulse-subtle" : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-slate-700/50 flex-shrink-0">
                            {notification.icon || <Bell className="h-4 w-4 text-slate-400" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-medium text-white flex items-center">
                                  {notification.title}
                                  {notification.status === "unread" && (
                                    <span className="ml-2 w-2 h-2 bg-cyan-400 rounded-full"></span>
                                  )}
                                </h3>

                                <p className="text-sm text-slate-300 mt-1">{notification.message}</p>

                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {notification.timestamp}
                                  </div>

                                  {notification.user && (
                                    <div className="flex items-center">
                                      <User className="h-3 w-3 mr-1" />
                                      {notification.user.name}
                                    </div>
                                  )}

                                  <Badge className={`text-xs ${getPriorityBadgeClass(notification.priority)}`}>
                                    {notification.priority} priority
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex flex-shrink-0">
                                {notification.action && (
                                  <Button
                                    size="sm"
                                    className="h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
                                  >
                                    {notification.action.label}
                                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </GlassContainer>

      <GlassContainer>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-cyan-400" />
          Notification Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white" htmlFor="push-notifications">
                    Browser Notifications
                  </Label>
                  <p className="text-xs text-slate-400">Receive notifications in your browser</p>
                </div>
                <Switch id="push-notifications" checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white" htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-xs text-slate-400">Receive important notifications via email</p>
                </div>
                <Switch id="email-notifications" checked={true} />
              </div>
            </div>
          </div>

          <div>
            <Button className="w-full justify-start bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
              <Settings className="mr-2 h-4 w-4" />
              Advanced Notification Settings
            </Button>
          </div>
        </div>
      </GlassContainer>
    </div>
  )
}
