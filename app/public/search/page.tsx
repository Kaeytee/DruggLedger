"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"
import {
  Search,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  FlaskRoundIcon as Flask,
  Building,
  Calendar,
  FileText,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for products
const initialProducts = [
  {
    id: "DRG-2025-001",
    name: "Amoxicillin 500mg",
    manufacturer: "PharmaCorp Inc.",
    category: "Antibiotic",
    status: "Verified",
    verificationDate: "2025-11-10",
    batchNumber: "BATCH-2025-A45",
    expiryDate: "2025-11-10",
  },
  {
    id: "DRG-2025-007",
    name: "Atorvastatin 20mg",
    manufacturer: "HealthGen Pharmaceuticals",
    category: "Statin",
    status: "Verified",
    verificationDate: "2025-11-05",
    batchNumber: "BATCH-2025-H22",
    expiryDate: "2025-10-15",
  },
  {
    id: "DRG-2025-003",
    name: "Metformin 850mg",
    manufacturer: "PharmaCorp Inc.",
    category: "Antidiabetic",
    status: "Recalled",
    verificationDate: "2025-10-20",
    batchNumber: "BATCH-2025-P18",
    expiryDate: "2025-09-30",
  },
  {
    id: "DRG-2025-012",
    name: "Lisinopril 10mg",
    manufacturer: "MediSynth Labs",
    category: "ACE Inhibitor",
    status: "Verified",
    verificationDate: "2025-11-08",
    batchNumber: "BATCH-2025-L33",
    expiryDate: "2025-08-22",
  },
  {
    id: "DRG-2025-015",
    name: "Ibuprofen 400mg",
    manufacturer: "HealthGen Pharmaceuticals",
    category: "NSAID",
    status: "Verified",
    verificationDate: "2025-10-25",
    batchNumber: "BATCH-2025-I17",
    expiryDate: "2025-07-18",
  },
]

export default function SearchProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [manufacturerFilter, setManufacturerFilter] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? product.status === statusFilter : true
    const matchesManufacturer = manufacturerFilter ? product.manufacturer === manufacturerFilter : true

    return matchesSearch && matchesStatus && matchesManufacturer
  })

  // View product details
  const viewProductDetails = (product: any) => {
    setSelectedProduct(product)
  }

  // Get unique manufacturers for filter
  const manufacturers = [...new Set(products.map((product) => product.manufacturer))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Search Products</h1>
          <p className="text-slate-300">Find and verify pharmaceutical products in the system</p>
        </div>
        <RoleBadge role="public" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search products..."
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
              <SelectItem value="Verified">Verified</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Recalled">Recalled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={manufacturerFilter || ""} onValueChange={(value) => setManufacturerFilter(value || null)}>
            <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="Filter by manufacturer" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Manufacturers</SelectItem>
              {manufacturers.map((manufacturer) => (
                <SelectItem key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassContainer className={selectedProduct ? "lg:col-span-2" : "lg:col-span-3"}>
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
                      <TableHead className="text-slate-300">Manufacturer</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-slate-400">
                          No products found matching your search.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-slate-800/30 border-slate-700/50">
                          <TableCell className="font-mono text-slate-300">{product.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{product.name}</p>
                              <p className="text-xs text-slate-400">{product.category}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-300">{product.manufacturer}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                product.status === "Verified"
                                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                  : product.status === "Pending"
                                    ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewProductDetails(product)}
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
                {filteredProducts.length === 0 ? (
                  <div className="col-span-2 p-6 text-center text-slate-400 border border-dashed border-slate-700 rounded-lg">
                    No products found matching your search.
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{product.name}</h3>
                          <p className="text-sm text-slate-400">
                            {product.id} • {product.category}
                          </p>
                        </div>
                        <Badge
                          className={
                            product.status === "Verified"
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : product.status === "Pending"
                                ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                                : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          }
                        >
                          {product.status}
                        </Badge>
                      </div>

                      <div className="flex items-center text-sm text-slate-300">
                        <Building className="h-4 w-4 mr-1 text-slate-400" />
                        {product.manufacturer}
                      </div>

                      <div className="flex justify-between items-center pt-1 text-xs">
                        <span className="text-slate-400">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          Verified: {product.verificationDate}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewProductDetails(product)}
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

        {selectedProduct && (
          <GlassContainer>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Product Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-white"
              >
                Close
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white text-lg">{selectedProduct.name}</h3>
                  <p className="text-sm text-slate-400">Category: {selectedProduct.category}</p>
                </div>
                <Badge
                  className={
                    selectedProduct.status === "Verified"
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      : selectedProduct.status === "Pending"
                        ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  }
                >
                  {selectedProduct.status}
                </Badge>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2">
                <p className="text-sm font-medium text-white">Product Information</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-slate-400">Product ID</p>
                    <p className="font-mono text-slate-300">{selectedProduct.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Batch Number</p>
                    <p className="font-mono text-slate-300">{selectedProduct.batchNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Manufacturer</p>
                    <p className="text-slate-300">{selectedProduct.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Expiry Date</p>
                    <p className="text-slate-300">{selectedProduct.expiryDate}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2">
                <p className="text-sm font-medium text-white">Verification Status</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-400">Status</p>
                    <p className="text-slate-300">{selectedProduct.status}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Verification Date</p>
                    <p className="text-slate-300">{selectedProduct.verificationDate}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                {selectedProduct.status === "Verified" ? (
                  <div className="flex-1 p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                    <span className="text-green-400 font-medium">Authentic Product</span>
                  </div>
                ) : selectedProduct.status === "Recalled" ? (
                  <div className="flex-1 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                    <span className="text-red-400 font-medium">Product Recalled</span>
                  </div>
                ) : (
                  <div className="flex-1 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
                    <span className="text-amber-400 font-medium">Verification Pending</span>
                  </div>
                )}
              </div>

              <Button className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                <Flask className="mr-2 h-4 w-4" />
                View Product Details
              </Button>
            </div>
          </GlassContainer>
        )}
      </div>
    </div>
  )
}
