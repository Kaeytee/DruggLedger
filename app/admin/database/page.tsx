"use client"

import { useState } from "react"
import { GlassContainer } from "@/components/glass-container"
import { Button } from "@/components/ui/button"
import { RoleBadge } from "@/components/role-badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertTriangle,
  Clock,
  Copy,
  Database,
  Download,
  FileDown,
  Filter,
  Gauge,
  HardDrive,
  Play,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Shield,
  Trash2,
  Upload,
  FileText,
  CheckCircle,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DatabasePage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM users LIMIT 10;")
  const [isExecuting, setIsExecuting] = useState(false)
  const [activeTab, setActiveTab] = useState("tables")
  const [tableSearch, setTableSearch] = useState("")
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true)
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)
  const { toast } = useToast()

  // Mock database stats
  const dbStats = {
    size: "128 MB",
    tables: 24,
    connections: 8,
    activeQueries: 3,
    lastBackup: "2 hours ago",
    status: "Online",
    uptime: "14 days, 6 hours",
    storageUsed: 42,
    performance: 92,
    availableStorage: "10 GB",
    recentOperations: [
      { type: "Backup", status: "Completed", time: "2 hours ago", user: "System" },
      { type: "Query", status: "Completed", time: "30 minutes ago", user: "Admin" },
      { type: "Optimization", status: "Completed", time: "1 day ago", user: "System" },
    ],
    dbTables: [
      { name: "users", rows: 124, size: "12 MB", lastUpdated: "10 minutes ago" },
      { name: "products", rows: 56, size: "24 MB", lastUpdated: "2 hours ago" },
      { name: "shipments", rows: 38, size: "18 MB", lastUpdated: "1 hour ago" },
      { name: "transactions", rows: 256, size: "32 MB", lastUpdated: "30 minutes ago" },
      { name: "audit_logs", rows: 1024, size: "48 MB", lastUpdated: "5 minutes ago" },
    ],
    queryResults: [
      { id: 1, wallet_address: "0x7a3b...21f4", role: "Manufacturer", name: "John Doe", created_at: "2023-10-15" },
      { id: 2, wallet_address: "0x3f1c...9e82", role: "Distributor", name: "Jane Smith", created_at: "2023-09-22" },
      { id: 3, wallet_address: "0x8d2e...45c7", role: "Admin", name: "Admin User", created_at: "2023-08-05" },
      { id: 4, wallet_address: "0x2b5a...76d9", role: "Regulator", name: "Regulatory Body", created_at: "2023-11-01" },
      { id: 5, wallet_address: "0x9c4f...12e8", role: "Manufacturer", name: "Pharma Corp", created_at: "2023-10-28" },
    ],
    backups: [
      { name: "Daily Backup", type: "Full", date: "2023-11-12 02:00 UTC", size: "128 MB" },
      { name: "Weekly Backup", type: "Full", date: "2023-11-10 02:00 UTC", size: "124 MB" },
      { name: "Manual Backup", type: "Full", date: "2023-11-09 15:30 UTC", size: "126 MB" },
    ],
    settings: {
      maxConnections: 20,
      queryTimeout: "30 seconds",
      autoBackupEnabled: true,
      autoBackupFrequency: "Daily",
      autoBackupTime: "02:00 UTC",
      dataRetentionPeriod: "90 days",
      encryptionEnabled: true,
    },
  }

  // Filter tables based on search
  const filteredTables = dbStats.dbTables.filter(
    (table) => tableSearch === "" || table.name.toLowerCase().includes(tableSearch.toLowerCase()),
  )

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Database Status Refreshed",
        description: "The database information has been updated successfully.",
      })
    }, 1000)
  }

  const handleBackup = () => {
    setIsBackingUp(true)

    // Simulate backup operation
    setTimeout(() => {
      setIsBackingUp(false)
      toast({
        title: "Backup Completed",
        description: "Database has been backed up successfully.",
      })
    }, 2000)
  }

  const handleRestore = () => {
    setIsRestoring(true)

    // Simulate restore operation
    setTimeout(() => {
      setIsRestoring(false)
      toast({
        title: "Restore Completed",
        description: "Database has been restored from backup successfully.",
      })
    }, 3000)
  }

  const executeQuery = () => {
    setIsExecuting(true)

    // Simulate query execution
    setTimeout(() => {
      setIsExecuting(false)
      toast({
        title: "Query Executed",
        description: "SQL query executed successfully.",
      })
    }, 1500)
  }

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Database configuration has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Database Management</h1>
          <p className="text-slate-300">Monitor and manage the blockchain and application databases</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Status"}
          </Button>
          <RoleBadge role="admin" />
        </div>
      </header>

      {/* Database Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassContainer className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Database Size</p>
              <p className="text-2xl font-bold text-white">{dbStats.size}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Database className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="mt-2">
            <Progress
              value={dbStats.storageUsed}
              className="h-1 bg-slate-700"
              indicatorClassName="bg-gradient-to-r from-cyan-500 to-blue-600"
            />
            <div className="flex justify-between mt-1 text-xs text-slate-400">
              <span>{dbStats.storageUsed}% used</span>
              <span>Available: {dbStats.availableStorage}</span>
            </div>
          </div>
        </GlassContainer>

        <GlassContainer className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Status</p>
              <p className="text-2xl font-bold text-white">{dbStats.status}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Uptime: {dbStats.uptime}</span>
            <span className="text-slate-400">Active Connections: {dbStats.connections}</span>
          </div>
        </GlassContainer>

        <GlassContainer className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Performance</p>
              <p className="text-2xl font-bold text-white">{dbStats.performance}%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center">
              <Gauge className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div className="mt-2">
            <Progress value={dbStats.performance} className="h-1 bg-slate-700" indicatorClassName="bg-blue-500" />
            <div className="flex justify-between mt-1 text-xs text-slate-400">
              <span>Active Queries: {dbStats.activeQueries}</span>
              <span>{dbStats.tables} tables</span>
            </div>
          </div>
        </GlassContainer>

        <GlassContainer className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Last Backup</p>
              <p className="text-2xl font-bold text-white">{dbStats.lastBackup}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <Button
              size="sm"
              className="flex-1 text-xs h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30"
              onClick={handleBackup}
              disabled={isBackingUp}
            >
              {isBackingUp ? (
                <>
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Backing up...
                </>
              ) : (
                <>
                  <Download className="mr-1 h-3 w-3" />
                  Backup Now
                </>
              )}
            </Button>
            <Button
              size="sm"
              className="flex-1 text-xs h-8 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/30"
              onClick={handleRestore}
              disabled={isRestoring}
            >
              {isRestoring ? (
                <>
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Restoring...
                </>
              ) : (
                <>
                  <Upload className="mr-1 h-3 w-3" />
                  Restore
                </>
              )}
            </Button>
          </div>
        </GlassContainer>
      </div>

      {/* Main Database Management Sections */}
      <Tabs defaultValue="tables" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="bg-slate-800/50 w-full justify-start mb-6">
            <TabsTrigger value="tables" className="data-[state=active]:bg-slate-700">
              <Database className="h-4 w-4 mr-2" />
              <span>Tables</span>
            </TabsTrigger>
            <TabsTrigger value="query" className="data-[state=active]:bg-slate-700">
              <FileText className="h-4 w-4 mr-2" />
              <span>Query Browser</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="data-[state=active]:bg-slate-700">
              <HardDrive className="h-4 w-4 mr-2" />
              <span>Backup & Restore</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tables Tab */}
        <TabsContent value="tables" className="space-y-6 mt-6">
          <GlassContainer>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold text-white">Database Tables</h2>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search tables..."
                    className="pl-10 bg-slate-800/50 border-slate-700"
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10 whitespace-nowrap"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <ScrollArea className="h-[400px]">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-slate-800/50 text-left">
                    <tr>
                      <th className="px-4 py-3 text-slate-300 font-medium">Table Name</th>
                      <th className="px-4 py-3 text-slate-300 font-medium">Rows</th>
                      <th className="px-4 py-3 text-slate-300 font-medium">Size</th>
                      <th className="px-4 py-3 text-slate-300 font-medium">Last Updated</th>
                      <th className="px-4 py-3 text-slate-300 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTables.length > 0 ? (
                      filteredTables.map((table, index) => (
                        <tr key={index} className="border-t border-slate-700/50 hover:bg-slate-800/30">
                          <td className="px-4 py-3 text-white font-medium">{table.name}</td>
                          <td className="px-4 py-3 text-slate-300">{table.rows.toLocaleString()}</td>
                          <td className="px-4 py-3 text-slate-300">{table.size}</td>
                          <td className="px-4 py-3 text-slate-300">{table.lastUpdated}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 h-8"
                              >
                                <Search className="h-4 w-4" />
                                <span className="sr-only">Browse</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 h-8"
                              >
                                <Settings className="h-4 w-4" />
                                <span className="sr-only">Settings</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                          No tables found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </ScrollArea>
            </div>

            {filteredTables.length > 0 && (
              <div className="mt-4 text-sm text-slate-400">
                Showing {filteredTables.length} of {dbStats.dbTables.length} tables
              </div>
            )}
          </GlassContainer>

          <GlassContainer>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Table Management</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                <Download className="h-6 w-6" />
                <span>Export Tables</span>
              </Button>

              <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                <Settings className="h-6 w-6" />
                <span>Optimize Tables</span>
              </Button>

              <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                <Shield className="h-6 w-6" />
                <span>Security Analysis</span>
              </Button>
            </div>
          </GlassContainer>
        </TabsContent>

        {/* Query Browser Tab */}
        <TabsContent value="query" className="space-y-6 mt-6">
          <GlassContainer>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold text-white">SQL Query Browser</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Results
                </Button>
                <Button
                  variant="outline"
                  className="text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">SQL Query</Label>
                <div className="relative">
                  <textarea
                    className="w-full h-32 bg-slate-800/50 border border-slate-700 rounded-md p-4 text-slate-300 font-mono text-sm"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                  />
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <Button
                      size="sm"
                      className="h-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      onClick={executeQuery}
                      disabled={isExecuting}
                    >
                      {isExecuting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Executing...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Execute
                        </>
                      )}
                    </Button>
                    <Button size="sm" className="h-8 bg-slate-700 hover:bg-slate-600" onClick={() => setSqlQuery("")}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Query Results</Label>
                <div className="overflow-x-auto bg-slate-800/50 border border-slate-700 rounded-md p-2">
                  <ScrollArea className="h-[300px]">
                    <table className="w-full min-w-[640px]">
                      <thead className="bg-slate-800/80 text-left">
                        <tr>
                          <th className="px-4 py-3 text-slate-300 font-medium">ID</th>
                          <th className="px-4 py-3 text-slate-300 font-medium">Wallet Address</th>
                          <th className="px-4 py-3 text-slate-300 font-medium">Role</th>
                          <th className="px-4 py-3 text-slate-300 font-medium">Name</th>
                          <th className="px-4 py-3 text-slate-300 font-medium">Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dbStats.queryResults.map((result) => (
                          <tr key={result.id} className="border-t border-slate-700/50 hover:bg-slate-800/30">
                            <td className="px-4 py-3 text-slate-300">{result.id}</td>
                            <td className="px-4 py-3 font-mono text-slate-300">{result.wallet_address}</td>
                            <td className="px-4 py-3 text-slate-300">{result.role}</td>
                            <td className="px-4 py-3 text-slate-300">{result.name}</td>
                            <td className="px-4 py-3 text-slate-300">{result.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>5 rows returned</span>
                  <span>Query executed in 0.023s</span>
                </div>
              </div>
            </div>
          </GlassContainer>

          <GlassContainer>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold text-white">Saved Queries</h2>
              <Button
                variant="outline"
                className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10 whitespace-nowrap"
              >
                <Plus className="mr-2 h-4 w-4" />
                Save Current Query
              </Button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="font-medium text-white">List All Active Users</p>
                  <p className="text-sm text-slate-400 font-mono mt-1 break-all">
                    SELECT * FROM users WHERE status = 'active'
                  </p>
                </div>
                <div className="flex items-center self-end sm:self-auto">
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Run</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="font-medium text-white">Count Products by Status</p>
                  <p className="text-sm text-slate-400 font-mono mt-1 break-all">
                    SELECT status, COUNT(*) FROM products GROUP BY status
                  </p>
                </div>
                <div className="flex items-center self-end sm:self-auto">
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Run</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        {/* Backup & Restore Tab */}
        <TabsContent value="backup" className="space-y-6 mt-6">
          <GlassContainer>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Backup Operations</h2>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <h3 className="font-medium text-white mb-3">Create New Backup</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Backup Name</Label>
                      <Input placeholder="e.g., Full Backup - Manual" className="bg-slate-800/50 border-slate-700" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Backup Type</Label>
                      <Select defaultValue="full">
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-300">
                          <SelectValue placeholder="Select backup type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="full">Full Backup</SelectItem>
                          <SelectItem value="incremental">Incremental Backup</SelectItem>
                          <SelectItem value="differential">Differential Backup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Tables to Include</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-300">
                        <SelectValue placeholder="Select tables to include" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="all">All Tables</SelectItem>
                        <SelectItem value="selected">Selected Tables</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Description (Optional)</Label>
                    <textarea
                      className="w-full h-20 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-slate-300 resize-none"
                      placeholder="Enter a description for this backup..."
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      onClick={handleBackup}
                      disabled={isBackingUp}
                    >
                      {isBackingUp ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Creating Backup...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Create Backup
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <h3 className="font-medium text-white mb-3">Backup History</h3>
                <div className="overflow-x-auto">
                  <ScrollArea className="h-[250px]">
                    <table className="w-full min-w-[640px]">
                      <thead className="bg-slate-800/50 text-left">
                        <tr>
                          <th className="px-4 py-3 text-slate-300 font-medium">Backup Name</th>
                          <th className="px-4 py-3 text-slate-300 font-medium">Type</th>
                          <th className="px-4 py-3 text-slate-300 font-medium">Date</th>
                          <th className="px-4 py-3 text-slate-300 font-medium">Size</th>
                          <th className="px-4 py-3 text-slate-300 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dbStats.backups.map((backup, index) => (
                          <tr key={index} className="border-t border-slate-700/50 hover:bg-slate-800/30">
                            <td className="px-4 py-3 text-white font-medium">{backup.name}</td>
                            <td className="px-4 py-3 text-slate-300">{backup.type}</td>
                            <td className="px-4 py-3 text-slate-300">{backup.date}</td>
                            <td className="px-4 py-3 text-slate-300">{backup.size}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 h-8"
                                >
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 h-8"
                                >
                                  <Upload className="h-4 w-4" />
                                  <span className="sr-only">Restore</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <h3 className="font-medium text-white mb-3">Restore Database</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Select Backup</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-300">
                        <SelectValue placeholder="Select backup to restore" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="daily">Daily Backup - 2023-11-12 02:00 UTC</SelectItem>
                        <SelectItem value="weekly">Weekly Backup - 2023-11-10 02:00 UTC</SelectItem>
                        <SelectItem value="manual">Manual Backup - 2023-11-09 15:30 UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-400">Warning</p>
                      <p className="text-xs text-slate-300 mt-1">
                        Restoring a database will overwrite current data. This action cannot be undone. Ensure you have
                        a recent backup before proceeding.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      className="bg-amber-500/80 hover:bg-amber-500 text-white"
                      onClick={handleRestore}
                      disabled={isRestoring}
                    >
                      {isRestoring ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Restoring...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Restore Database
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        {/* Database Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-6">
          <GlassContainer>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold text-white">Database Configuration</h2>
              <Button
                variant="outline"
                className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10"
                onClick={saveSettings}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Connection Settings</h3>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Max Connections</Label>
                    <Input
                      type="number"
                      defaultValue={dbStats.settings.maxConnections}
                      className="bg-slate-800/50 border-slate-700"
                    />
                    <p className="text-xs text-slate-400">
                      Maximum number of simultaneous connections allowed to the database.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Query Timeout</Label>
                    <Input defaultValue={dbStats.settings.queryTimeout} className="bg-slate-800/50 border-slate-700" />
                    <p className="text-xs text-slate-400">Maximum time a query can run before it times out.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-white">Backup Settings</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white" htmlFor="auto-backup">
                        Enable Auto Backup
                      </Label>
                      <p className="text-xs text-slate-400">Automatically create backups at scheduled intervals.</p>
                    </div>
                    <Switch id="auto-backup" checked={autoBackupEnabled} onCheckedChange={setAutoBackupEnabled} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Backup Frequency</Label>
                    <Select defaultValue={dbStats.settings.autoBackupFrequency.toLowerCase()}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-300">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Backup Time (UTC)</Label>
                    <Input
                      defaultValue={dbStats.settings.autoBackupTime}
                      className="bg-slate-800/50 border-slate-700"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Data Management</h3>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Data Retention Period</Label>
                    <Input
                      defaultValue={dbStats.settings.dataRetentionPeriod}
                      className="bg-slate-800/50 border-slate-700"
                    />
                    <p className="text-xs text-slate-400">How long to keep data before automatic archiving.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-white">Security Settings</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white" htmlFor="encryption">
                        Enable Data Encryption
                      </Label>
                      <p className="text-xs text-slate-400">Encrypt sensitive data stored in the database.</p>
                    </div>
                    <Switch id="encryption" checked={encryptionEnabled} onCheckedChange={setEncryptionEnabled} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Audit Logging</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-300">
                        <SelectValue placeholder="Select audit level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="all">Log All Operations</SelectItem>
                        <SelectItem value="write">Log Write Operations Only</SelectItem>
                        <SelectItem value="none">Disable Logging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </GlassContainer>

          <GlassContainer>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Advanced Operations</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                <Settings className="h-6 w-6" />
                <span>Database Maintenance</span>
              </Button>

              <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                <FileDown className="h-6 w-6" />
                <span>Export Schema</span>
              </Button>

              <Button className="h-auto py-6 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 hover:from-amber-500/30 hover:to-red-500/30 border border-amber-500/30 text-amber-400">
                <Filter className="h-6 w-6" />
                <span>Purge Cached Data</span>
              </Button>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
