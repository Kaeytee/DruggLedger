"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"
import { Progress } from "@/components/ui/progress"
import { Search, Truck, MapPin, Calendar, Clock, RefreshCw, ArrowRight, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Mock data for shipments
const initialShipments = [
  {
    id: "SHP-2025-001",
    drugId: "DRG-2025-001",
    drugName: "Amoxicillin 500mg",
    destination: "Central Hospital, New York",
    status: "In Transit",
    progress: 65,
    eta: "2025-11-15",
    origin: "PharmaCorp Manufacturing, New Jersey",
    carrier: "MedEx Logistics",
    trackingNumber: "MEX123456789",
    temperature: "2-8°C",
    lastUpdated: "2 hours ago",
  },
  {
    id: "SHP-2025-002",
    drugId: "DRG-2025-007",
    drugName: "Atorvastatin 20mg",
    destination: "MedPharm Distributor, Chicago",
    status: "Delivered",
    progress: 100,
    eta: "2025-11-10",
    origin: "HealthGen Pharmaceuticals, Boston",
    carrier: "PharmaFreight",
    trackingNumber: "PF987654321",
    temperature: "15-25°C",
    lastUpdated: "1 day ago",
  },
  {
    id: "SHP-2025-003",
    drugId: "DRG-2025-012",
    drugName: "Lisinopril 10mg",
    destination: "County Medical Center, Los Angeles",
    status: "Preparing",
    progress: 15,
    eta: "2025-11-20",
    origin: "MediSynth Labs, San Francisco",
    carrier: "MedEx Logistics",
    trackingNumber: "MEX234567890",
    temperature: "15-25°C",
    lastUpdated: "5 hours ago",
  },
  {
    id: "SHP-2025-004",
    drugId: "DRG-2025-003",
    drugName: "Metformin 850mg",
    destination: "Regional Health Clinic, Miami",
    status: "Delayed",
    progress: 40,
    eta: "2025-11-18",
    origin: "PharmaCorp Manufacturing, New Jersey",
    carrier: "PharmaFreight",
    trackingNumber: "PF345678901",
    temperature: "15-25°C",
    lastUpdated: "3 hours ago",
  },
  {
    id: "SHP-2025-005",
    drugId: "DRG-2025-015",
    drugName: "Ibuprofen 400mg",
    destination: "Downtown Pharmacy, Seattle",
    status: "Delivered",
    progress: 100,
    eta: "2025-11-08",
    origin: "HealthGen Pharmaceuticals, Boston",
    carrier: "MedEx Logistics",
    trackingNumber: "MEX456789012",
    temperature: "15-25°C",
    lastUpdated: "3 days ago",
  },
  {
    id: "SHP-2025-006",
    drugId: "DRG-2025-009",
    drugName: "Amoxicillin 500mg",
    destination: "University Hospital, Houston",
    status: "In Transit",
    progress: 80,
    eta: "2025-11-14",
    origin: "MediSynth Labs, San Francisco",
    carrier: "PharmaFreight",
    trackingNumber: "PF567890123",
    temperature: "2-8°C",
    lastUpdated: "6 hours ago",
  },
]

export default function TrackShipmentsPage() {
  const [shipments, setShipments] = useState(initialShipments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedShipment, setSelectedShipment] = useState<any>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  // Filter shipments based on search term and status filter
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.drugId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter && statusFilter !== "all" ? shipment.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Shipment Data Refreshed",
        description: "Tracking information has been updated.",
      })
      setIsRefreshing(false)
    }, 1500)
  }

  // View shipment details
  const viewShipmentDetails = (shipment: any) => {
    setSelectedShipment(shipment)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Shipment Tracking</h1>
          <p className="text-slate-300">Monitor and manage pharmaceutical shipments in real-time</p>
        </div>
        <RoleBadge role="distributor" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search shipments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="In Transit">In Transit</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Preparing">Preparing</SelectItem>
              <SelectItem value="Delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="text-slate-300 border-slate-700"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassContainer className={selectedShipment ? "lg:col-span-2" : "lg:col-span-3"}>
          <Tabs defaultValue="table" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-slate-800/50">
                <TabsTrigger value="table" className="data-[state=active]:bg-slate-700">
                  Table View
                </TabsTrigger>
                <TabsTrigger value="cards" className="data-[state=active]:bg-slate-700">
                  Card View
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10">
                <FileText className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <TabsContent value="table" className="mt-0">
              <div className="rounded-lg border border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-800/50">
                    <TableRow className="hover:bg-slate-800/80 border-slate-700">
                      <TableHead className="text-slate-300">ID</TableHead>
                      <TableHead className="text-slate-300">Product</TableHead>
                      <TableHead className="text-slate-300">Destination</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">ETA</TableHead>
                      <TableHead className="text-slate-300 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-slate-400">
                          No shipments found matching your search.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredShipments.map((shipment) => (
                        <TableRow key={shipment.id} className="hover:bg-slate-800/30 border-slate-700/50">
                          <TableCell className="font-mono text-slate-300">{shipment.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{shipment.drugName}</p>
                              <p className="text-xs text-slate-400">{shipment.drugId}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-300">{shipment.destination}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                shipment.status === "Delivered"
                                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                  : shipment.status === "In Transit"
                                    ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                    : shipment.status === "Delayed"
                                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                      : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                              }
                            >
                              {shipment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{shipment.eta}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewShipmentDetails(shipment)}
                              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                            >
                              Details
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="cards" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredShipments.length === 0 ? (
                  <div className="col-span-2 p-6 text-center text-slate-400 border border-dashed border-slate-700 rounded-lg">
                    No shipments found matching your search.
                  </div>
                ) : (
                  filteredShipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{shipment.drugName}</h3>
                          <p className="text-sm text-slate-400">
                            {shipment.id} • {shipment.drugId}
                          </p>
                        </div>
                        <Badge
                          className={
                            shipment.status === "Delivered"
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : shipment.status === "In Transit"
                                ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                : shipment.status === "Delayed"
                                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                  : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                          }
                        >
                          {shipment.status}
                        </Badge>
                      </div>

                      <div className="flex items-center text-sm text-slate-300">
                        <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                        {shipment.destination}
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-slate-300">{shipment.progress}%</span>
                        </div>
                        <Progress
                          value={shipment.progress}
                         
                          className={`h-1.5 bg-slate-700 ${
                            shipment.status === "Delayed"
                              ? "bg-red-500"
                              : shipment.status === "Delivered"
                                ? "bg-green-500"
                                : "bg-gradient-to-r from-cyan-500 to-blue-600"
                          }`}
                        />
                      </div>

                      <div className="flex justify-between items-center pt-1 text-xs">
                        <span className="text-slate-400">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          ETA: {shipment.eta}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewShipmentDetails(shipment)}
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
            </TabsContent>
          </Tabs>
        </GlassContainer>

        {selectedShipment && (
          <GlassContainer>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Shipment Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedShipment(null)}
                className="text-slate-400 hover:text-white"
              >
                Close
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white text-lg">{selectedShipment.drugName}</h3>
                  <p className="text-sm text-slate-400">Product ID: {selectedShipment.drugId}</p>
                </div>
                <Badge
                  className={
                    selectedShipment.status === "Delivered"
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      : selectedShipment.status === "In Transit"
                        ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                        : selectedShipment.status === "Delayed"
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                  }
                >
                  {selectedShipment.status}
                </Badge>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2">
                <p className="text-sm font-medium text-white">Shipment Information</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-slate-400">Shipment ID</p>
                    <p className="font-mono text-slate-300">{selectedShipment.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Carrier</p>
                    <p className="text-slate-300">{selectedShipment.carrier}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Tracking Number</p>
                    <p className="font-mono text-slate-300">{selectedShipment.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Temperature</p>
                    <p className="text-slate-300">{selectedShipment.temperature}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2">
                <p className="text-sm font-medium text-white">Route Information</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-400">Origin</p>
                    <p className="text-slate-300">{selectedShipment.origin}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Destination</p>
                    <p className="text-slate-300">{selectedShipment.destination}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">ETA</p>
                    <p className="text-slate-300">{selectedShipment.eta}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-white">Shipment Progress</p>
                  <p className="text-sm text-slate-300">{selectedShipment.progress}%</p>
                </div>
                <Progress
                  value={selectedShipment.progress}
                                    className={`h-2 bg-slate-700 ${
                    selectedShipment.status === "Delayed"
                      ? "bg-red-500"
                      : selectedShipment.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600"
                  }`}
                />
                <p className="text-xs text-slate-400 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Last updated: {selectedShipment.lastUpdated}
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                  <Truck className="mr-2 h-4 w-4" />
                  Track Live
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Button>
              </div>
            </div>
          </GlassContainer>
        )}
      </div>
    </div>
  )
}
