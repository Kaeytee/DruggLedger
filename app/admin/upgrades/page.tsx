"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Clock,
  ArrowRight,
  Download,
  Shield,
  Server,
  Database,
  Code,
  RefreshCw,
  Calendar,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SystemUpgradesPage() {
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [upgradeProgress, setUpgradeProgress] = useState(0)
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false)
  const { toast } = useToast()

  const [systemInfo] = useState({
    currentVersion: "1.2.3",
    latestVersion: "1.3.0",
    lastUpgraded: "2023-10-15",
    status: "Stable",
    components: [
      {
        name: "Core Platform",
        currentVersion: "1.2.3",
        latestVersion: "1.3.0",
        status: "Update Available",
        priority: "High",
        description: "Core platform services including authentication, authorization, and base functionality.",
      },
      {
        name: "Blockchain Module",
        currentVersion: "2.1.0",
        latestVersion: "2.1.0",
        status: "Up to Date",
        priority: "N/A",
        description: "Blockchain integration for immutable record keeping and verification.",
      },
      {
        name: "Verification Engine",
        currentVersion: "3.4.2",
        latestVersion: "3.5.0",
        status: "Update Available",
        priority: "Medium",
        description: "Product verification and authentication services.",
      },
      {
        name: "Reporting Module",
        currentVersion: "1.8.5",
        latestVersion: "1.8.5",
        status: "Up to Date",
        priority: "N/A",
        description: "Analytics and reporting functionality for system metrics.",
      },
      {
        name: "Security Framework",
        currentVersion: "2.0.1",
        latestVersion: "2.2.0",
        status: "Update Available",
        priority: "Critical",
        description: "Security services including encryption, threat detection, and vulnerability management.",
      },
    ],
    scheduledMaintenance: [
      {
        id: "MAINT-2023-001",
        title: "Database Optimization",
        date: "2023-11-20",
        time: "02:00 - 04:00 UTC",
        status: "Scheduled",
        description: "Routine database maintenance and optimization to improve performance.",
      },
      {
        id: "MAINT-2023-002",
        title: "Security Patch Deployment",
        date: "2023-11-25",
        time: "01:00 - 03:00 UTC",
        status: "Scheduled",
        description: "Deployment of critical security patches to address vulnerabilities.",
      },
    ],
  })

  // Simulate system upgrade
  const handleUpgrade = () => {
    setIsUpgrading(true)
    setUpgradeProgress(0)
    setIsUpgradeDialogOpen(false)

    // Simulate progress updates
    const interval = setInterval(() => {
      setUpgradeProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 1

        if (newProgress >= 100) {
          clearInterval(interval)

          // Simulate completion
          setTimeout(() => {
            toast({
              title: "Upgrade Complete",
              description: "System has been successfully upgraded to version 1.3.0",
            })

            setIsUpgrading(false)
          }, 1000)

          return 100
        }

        return newProgress
      })
    }, 500)
  }

  // Get update status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Up to Date":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30"
      case "Update Available":
        return "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
      case "Critical Update":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
    }
  }

  // Get priority badge class
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30"
      case "High":
        return "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
      case "Medium":
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
      case "Low":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">System Upgrades</h1>
          <p className="text-slate-300">Manage system updates and maintenance</p>
        </div>
        <RoleBadge role="admin" />
      </div>

      <GlassContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-white">System Status</h2>
            <div className="flex items-center gap-2">
              <p className="text-slate-300">
                Current Version: <span className="font-mono text-cyan-400">{systemInfo.currentVersion}</span>
              </p>
              <p className="text-slate-300">
                Latest Version: <span className="font-mono text-cyan-400">{systemInfo.latestVersion}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">{systemInfo.status}</Badge>

            {systemInfo.currentVersion !== systemInfo.latestVersion && (
              <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    disabled={isUpgrading}
                  >
                    {isUpgrading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Upgrading...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Upgrade to {systemInfo.latestVersion}
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Confirm System Upgrade</DialogTitle>
                    <DialogDescription className="text-slate-300">
                      Are you sure you want to upgrade the system to version {systemInfo.latestVersion}? This will
                      temporarily put the system in maintenance mode.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
                      <p className="text-amber-400">
                        This action will restart all system services. Users may experience brief interruptions.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-white font-medium">What's new in version {systemInfo.latestVersion}:</p>
                      <ul className="text-slate-300 space-y-1 list-disc pl-5">
                        <li>Enhanced security features</li>
                        <li>Improved verification engine performance</li>
                        <li>New reporting capabilities</li>
                        <li>Bug fixes and stability improvements</li>
                      </ul>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsUpgradeDialogOpen(false)}
                      className="border-slate-700 text-slate-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpgrade}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      Proceed with Upgrade
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {isUpgrading && (
          <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-white font-medium">Upgrading to version {systemInfo.latestVersion}</p>
              <p className="text-slate-300">{upgradeProgress}%</p>
            </div>
            <Progress
              value={upgradeProgress}
              className="h-2 bg-slate-700"
              indicatorClassName="bg-gradient-to-r from-cyan-500 to-blue-600"
            />
            <p className="text-xs text-slate-400">
              Please do not refresh the page or navigate away during the upgrade process.
            </p>
          </div>
        )}

        <Tabs defaultValue="components" className="w-full">
          <TabsList className="bg-slate-800/50 mb-4">
            <TabsTrigger value="components" className="data-[state=active]:bg-slate-700">
              System Components
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="data-[state=active]:bg-slate-700">
              Scheduled Maintenance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="mt-0 space-y-4">
            {systemInfo.components.map((component, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-white text-lg">{component.name}</h3>
                      <Badge className={getStatusBadgeClass(component.status)}>{component.status}</Badge>
                      {component.priority !== "N/A" && (
                        <Badge className={getPriorityBadgeClass(component.priority)}>
                          {component.priority} Priority
                        </Badge>
                      )}
                    </div>

                    <p className="text-slate-300 text-sm mb-3">{component.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Current Version:</span>
                        <span className="ml-2 font-mono text-slate-300">{component.currentVersion}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Latest Version:</span>
                        <span className="ml-2 font-mono text-slate-300">{component.latestVersion}</span>
                      </div>
                    </div>
                  </div>

                  {component.currentVersion !== component.latestVersion && (
                    <div className="flex items-center">
                      <Button
                        className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
                        disabled={isUpgrading}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Update Component
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="maintenance" className="mt-0 space-y-4">
            {systemInfo.scheduledMaintenance.map((maintenance) => (
              <div key={maintenance.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-white text-lg">{maintenance.title}</h3>
                      <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">{maintenance.status}</Badge>
                    </div>

                    <p className="text-slate-300 text-sm mb-3">{maintenance.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                        <span className="text-slate-300">{maintenance.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-slate-400" />
                        <span className="text-slate-300">{maintenance.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Button className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button className="w-full justify-start bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule New Maintenance
            </Button>
          </TabsContent>
        </Tabs>
      </GlassContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassContainer className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Server className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">System Health</h3>
              <p className="text-sm text-slate-400">All systems operational</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-slate-700 text-slate-300">
            View System Status
          </Button>
        </GlassContainer>

        <GlassContainer className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Database className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Database</h3>
              <p className="text-sm text-slate-400">Last backup: 2 hours ago</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-slate-700 text-slate-300">
            Manage Backups
          </Button>
        </GlassContainer>

        <GlassContainer className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Shield className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Security</h3>
              <p className="text-sm text-slate-400">No active threats</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-slate-700 text-slate-300">
            Security Dashboard
          </Button>
        </GlassContainer>

        <GlassContainer className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Code className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">API Status</h3>
              <p className="text-sm text-slate-400">All endpoints available</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-slate-700 text-slate-300">
            API Documentation
          </Button>
        </GlassContainer>
      </div>
    </div>
  )
}

