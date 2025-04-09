"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"
import { Search, FileText, Download, Calendar, Clock, User, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for audit logs
const initialAuditLogs = [
  {
    id: "AUD-2023-001",
    action: "Product Registration",
    entity: "DRG-2023-001",
    entityName: "Amoxicillin 500mg",
    actor: "0x456",
    actorRole: "Manufacturer",
    timestamp: "2023-11-10T14:32:45Z",
    details: "New product registered in the system",
    changes: [
      { field: "Name", oldValue: "-", newValue: "Amoxicillin 500mg" },
      { field: "Dosage", oldValue: "-", newValue: "500mg" },
      { field: "Status", oldValue: "-", newValue: "Active" },
    ],
  },
  {
    id: "AUD-2023-002",
    action: "Product Verification",
    entity: "DRG-2023-001",
    entityName: "Amoxicillin 500mg",
    actor: "0x789",
    actorRole: "Regulator",
    timestamp: "2023-11-10T16:45:12Z",
    details: "Product verified for distribution",
    changes: [
      { field: "Verification Status", oldValue: "Pending", newValue: "Verified" },
      { field: "Verified By", oldValue: "-", newValue: "0x789" },
      { field: "Verification Date", oldValue: "-", newValue: "2023-11-10" },
    ],
  },
  {
    id: "AUD-2023-003",
    action: "Shipment Created",
    entity: "SHP-2023-001",
    entityName: "Amoxicillin 500mg Shipment",
    actor: "0xabc",
    actorRole: "Distributor",
    timestamp: "2023-11-11T09:15:30Z",
    details: "New shipment created for product",
    changes: [
      { field: "Status", oldValue: "-", newValue: "Preparing" },
      { field: "Origin", oldValue: "-", newValue: "PharmaCorp Manufacturing, New Jersey" },
      { field: "Destination", oldValue: "-", newValue: "Central Hospital, New York" },
    ],
  },
  {
    id: "AUD-2023-004",
    action: "Issue Reported",
    entity: "ISS-2023-001",
    entityName: "Packaging Defect",
    actor: "0xdef",
    actorRole: "Public",
    timestamp: "2023-11-12T11:22:18Z",
    details: "Quality issue reported for product",
    changes: [
      { field: "Issue Type", oldValue: "-", newValue: "Packaging" },
      { field: "Severity", oldValue: "-", newValue: "4" },
      { field: "Status", oldValue: "-", newValue: "Open" },
    ],
  },
  {
    id: "AUD-2023-005",
    action: "Role Assignment",
    entity: "0x456",
    entityName: "John Doe",
    actor: "0x123",
    actorRole: "Admin",
    timestamp: "2023-11-08T10:05:22Z",
    details: "User role assigned",
    changes: [
      { field: "Role", oldValue: "Unassigned", newValue: "Manufacturer" },
      { field: "Assigned By", oldValue: "-", newValue: "0x123" },
      { field: "Assignment Date", oldValue: "-", newValue: "2023-11-08" },
    ],
  },
  {
    id: "AUD-2023-006",
    action: "Product Update",
    entity: "DRG-2023-003",
    entityName: "Metformin 850mg",
    actor: "0x456",
    actorRole: "Manufacturer",
    timestamp: "2023-11-09T15:42:37Z",
    details: "Product information updated",
    changes: [
      { field: "Description", oldValue: "Standard metformin tablet", newValue: "Extended release metformin tablet" },
      { field: "Dosage Instructions", oldValue: "Take with food", newValue: "Take with food once daily" },
    ],
  },
  {
    id: "AUD-2023-007",
    action: "Shipment Status Update",
    entity: "SHP-2023-001",
    entityName: "Amoxicillin 500mg Shipment",
    actor: "0xabc",
    actorRole: "Distributor",
    timestamp: "2023-11-11T14:30:45Z",
    details: "Shipment status changed",
    changes: [
      { field: "Status", oldValue: "Preparing", newValue: "In Transit" },
      { field: "Location", oldValue: "Warehouse", newValue: "In Transit to Destination" },
      { field: "ETA", oldValue: "-", newValue: "2023-11-15" },
    ],
  },
]

export default function AuditTrailPage() {
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [expandedLog, setExpandedLog] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Filter audit logs based on search term and filters
  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAction = actionFilter ? log.action === actionFilter : true
    const matchesRole = roleFilter ? log.actorRole === roleFilter : true

    return matchesSearch && matchesAction && matchesRole
  })

  // Sort logs by timestamp
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime()
    const dateB = new Date(b.timestamp).getTime()
    return sortDirection === "desc" ? dateB - dateA : dateA - dateB
  })

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "desc" ? "asc" : "desc")
  }

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Toggle expanded log
  const toggleExpandedLog = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Audit Trail</h1>
          <p className="text-slate-300">Track all actions and changes in the system</p>
        </div>
        <RoleBadge role="regulator" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={actionFilter || "all"} onValueChange={(value) => setActionFilter(value || null)}>
            <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="Product Registration">Product Registration</SelectItem>
              <SelectItem value="Product Verification">Product Verification</SelectItem>
              <SelectItem value="Product Update">Product Update</SelectItem>
              <SelectItem value="Shipment Created">Shipment Created</SelectItem>
              <SelectItem value="Shipment Status Update">Shipment Status Update</SelectItem>
              <SelectItem value="Issue Reported">Issue Reported</SelectItem>
              <SelectItem value="Role Assignment">Role Assignment</SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter || "all"} onValueChange={(value) => setRoleFilter(value || null)}>
            <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manufacturer">Manufacturer</SelectItem>
              <SelectItem value="Regulator">Regulator</SelectItem>
              <SelectItem value="Distributor">Distributor</SelectItem>
              <SelectItem value="Public">Public</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="text-slate-300 border-slate-700"
            onClick={toggleSortDirection}
          >
            {sortDirection === "desc" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>

          <Button variant="outline" size="icon" className="text-slate-300 border-slate-700">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <GlassContainer>
        <div className="rounded-lg border border-slate-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-800/50">
              <TableRow className="hover:bg-slate-800/80 border-slate-700">
                <TableHead className="text-slate-300">ID</TableHead>
                <TableHead className="text-slate-300">Action</TableHead>
                <TableHead className="text-slate-300">Entity</TableHead>
                <TableHead className="text-slate-300">Actor</TableHead>
                <TableHead className="text-slate-300">Timestamp</TableHead>
                <TableHead className="text-slate-300 text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-slate-400">
                    No audit logs found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                sortedLogs.map((log) => (
                  <React.Fragment key={log.id}>
                    <TableRow className="hover:bg-slate-800/30 border-slate-700/50">
                      <TableCell className="font-mono text-slate-300">{log.id}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            log.action.includes("Registration")
                              ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              : log.action.includes("Verification")
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : log.action.includes("Update")
                                  ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                                  : log.action.includes("Created")
                                    ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                                    : log.action.includes("Issue")
                                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                      : log.action.includes("Role")
                                        ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                                        : "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
                          }
                        >
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-white">{log.entityName}</p>
                          <p className="text-xs text-slate-400">{log.entity}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-mono text-slate-300">{log.actor}</p>
                          <p className="text-xs text-slate-400">{log.actorRole}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-slate-300">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-slate-400" />
                            {formatTimestamp(log.timestamp)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpandedLog(log.id)}
                          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                        >
                          {expandedLog === log.id ? "Hide" : "View"}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedLog === log.id && (
                      <TableRow className="bg-slate-800/20 border-slate-700/50">
                        <TableCell colSpan={6} className="p-0">
                          <div className="p-4 space-y-4">
                            <div>
                              <h3 className="text-lg font-medium text-white mb-2">Audit Details</h3>
                              <p className="text-slate-300">{log.details}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-white mb-2">Changes</h4>
                              <div className="rounded-lg border border-slate-700 overflow-hidden">
                                <Table>
                                  <TableHeader className="bg-slate-800/50">
                                    <TableRow className="hover:bg-slate-800/80 border-slate-700">
                                      <TableHead className="text-slate-300">Field</TableHead>
                                      <TableHead className="text-slate-300">Old Value</TableHead>
                                      <TableHead className="text-slate-300">New Value</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {log.changes.map((change, index) => (
                                      <TableRow key={index} className="hover:bg-slate-800/30 border-slate-700/50">
                                        <TableCell className="font-medium text-slate-300">{change.field}</TableCell>
                                        <TableCell className="text-slate-400">{change.oldValue}</TableCell>
                                        <TableCell className="text-slate-300">{change.newValue}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center text-slate-400">
                                <Clock className="h-4 w-4 mr-1" />
                                Recorded at: {formatTimestamp(log.timestamp)}
                              </div>
                              <div className="flex items-center text-slate-400">
                                <User className="h-4 w-4 mr-1" />
                                Actor: {log.actor} ({log.actorRole})
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </GlassContainer>

      <GlassContainer>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Audit Summary</h2>
          <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-slate-700">
            <AccordionTrigger className="text-white hover:text-cyan-400 hover:no-underline">
              Activity by Action Type
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-slate-300">Product Registration</span>
                    </div>
                    <span className="font-medium text-white">1</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-slate-300">Product Verification</span>
                    </div>
                    <span className="font-medium text-white">1</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                      <span className="text-slate-300">Product Update</span>
                    </div>
                    <span className="font-medium text-white">1</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-slate-300">Shipment Actions</span>
                    </div>
                    <span className="font-medium text-white">2</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-slate-700">
            <AccordionTrigger className="text-white hover:text-cyan-400 hover:no-underline">
              Activity by Role
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-slate-300">Admin</span>
                    </div>
                    <span className="font-medium text-white">1</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                      <span className="text-slate-300">Manufacturer</span>
                    </div>
                    <span className="font-medium text-white">2</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-slate-300">Regulator</span>
                    </div>
                    <span className="font-medium text-white">1</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-slate-300">Distributor</span>
                    </div>
                    <span className="font-medium text-white">2</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </GlassContainer>
    </div>
  )
}

