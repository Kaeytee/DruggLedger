"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/role-badge"
import {
  Search,
  Plus,
  Filter,
  Download,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  FileText,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

// Mock data for products
const initialProducts = [
  {
    id: "DRG-2023-001",
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    status: "Active",
    verificationStatus: "Verified",
    dateAdded: "2023-11-10",
    batchNumber: "BATCH-2023-A45",
    expiryDate: "2025-11-10",
    description: "Amoxicillin 500mg capsules for treatment of bacterial infections.",
  },
  {
    id: "DRG-2023-002",
    name: "Atorvastatin 20mg",
    category: "Statin",
    status: "Active",
    verificationStatus: "Verified",
    dateAdded: "2023-11-05",
    batchNumber: "BATCH-2023-H22",
    expiryDate: "2025-10-15",
    description: "Atorvastatin 20mg tablets for lowering cholesterol and triglycerides.",
  },
  {
    id: "DRG-2023-003",
    name: "Metformin 850mg",
    category: "Antidiabetic",
    status: "Recalled",
    verificationStatus: "Verified",
    dateAdded: "2023-10-20",
    batchNumber: "BATCH-2023-P18",
    expiryDate: "2025-09-30",
    description: "Metformin 850mg tablets for treatment of type 2 diabetes.",
  },
  {
    id: "DRG-2023-004",
    name: "Lisinopril 10mg",
    category: "ACE Inhibitor",
    status: "Active",
    verificationStatus: "Pending",
    dateAdded: "2023-11-08",
    batchNumber: "BATCH-2023-L33",
    expiryDate: "2025-08-22",
    description: "Lisinopril 10mg tablets for treatment of high blood pressure and heart failure.",
  },
  {
    id: "DRG-2023-005",
    name: "Ibuprofen 400mg",
    category: "NSAID",
    status: "Draft",
    verificationStatus: "Not Submitted",
    dateAdded: "2023-11-12",
    batchNumber: "BATCH-2023-I17",
    expiryDate: "2025-07-18",
    description: "Ibuprofen 400mg tablets for pain relief and reduction of inflammation.",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  // Filter products based on search term and status filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? product.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  // View product details
  const viewProductDetails = (product: any) => {
    setSelectedProduct(product)
  }

  // Handle delete product
  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))

      toast({
        title: "Product Deleted",
        description: `Product ${productToDelete} has been deleted.`,
      })

      setProductToDelete(null)
      setIsDeleteDialogOpen(false)

      // If the deleted product was selected, clear the selection
      if (selectedProduct && selectedProduct.id === productToDelete) {
        setSelectedProduct(null)
      }
    }
  }

  // Open delete dialog
  const openDeleteDialog = (id: string) => {
    setProductToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Products</h1>
          <p className="text-slate-300">Manage your pharmaceutical products</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
            <Link href="/manufacturer/register">
              <Plus className="mr-2 h-4 w-4" />
              Register New Product
            </Link>
          </Button>
          <RoleBadge role="manufacturer" />
        </div>
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
          <Select
            value={statusFilter || "all"}
            onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Recalled">Recalled</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="text-slate-300 border-slate-700">
            <Filter className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="text-slate-300 border-slate-700">
            <Download className="h-4 w-4" />
          </Button>
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
              <div className="text-sm text-slate-400">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </div>
            </div>

            <TabsContent value="table" className="mt-0">
              <div className="rounded-lg border border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-800/50">
                    <TableRow className="hover:bg-slate-800/80 border-slate-700">
                      <TableHead className="text-slate-300">ID</TableHead>
                      <TableHead className="text-slate-300">Product</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Verification</TableHead>
                      <TableHead className="text-slate-300">Date Added</TableHead>
                      <TableHead className="text-slate-300 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-slate-400">
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
                          <TableCell>
                            <Badge
                              className={
                                product.status === "Active"
                                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                  : product.status === "Draft"
                                    ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                product.verificationStatus === "Verified"
                                  ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                  : product.verificationStatus === "Pending"
                                    ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                                    : "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
                              }
                            >
                              {product.verificationStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{product.dateAdded}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-slate-800 border-slate-700">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-slate-700" />
                                <DropdownMenuItem
                                  className="cursor-pointer hover:bg-slate-700"
                                  onClick={() => viewProductDetails(product)}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-slate-700">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Product
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-slate-700" />
                                <DropdownMenuItem
                                  className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                  onClick={() => openDeleteDialog(product.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Product
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                        <div className="flex gap-1">
                          <Badge
                            className={
                              product.status === "Active"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : product.status === "Draft"
                                  ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                                  : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            }
                          >
                            {product.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-slate-700"
                                onClick={() => viewProductDetails(product)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer hover:bg-slate-700">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Product
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-slate-700" />
                              <DropdownMenuItem
                                className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                onClick={() => openDeleteDialog(product.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Product
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-slate-300">
                        <Badge
                          className={
                            product.verificationStatus === "Verified"
                              ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              : product.verificationStatus === "Pending"
                                ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                                : "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
                          }
                        >
                          {product.verificationStatus}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center pt-1 text-xs">
                        <span className="text-slate-400">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          Added: {product.dateAdded}
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
                    selectedProduct.status === "Active"
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      : selectedProduct.status === "Draft"
                        ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  }
                >
                  {selectedProduct.status}
                </Badge>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="text-sm text-slate-300">{selectedProduct.description}</p>
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
                    <p className="text-slate-400">Date Added</p>
                    <p className="text-slate-300">{selectedProduct.dateAdded}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Expiry Date</p>
                    <p className="text-slate-300">{selectedProduct.expiryDate}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2">
                <p className="text-sm font-medium text-white">Verification Status</p>
                <div className="flex items-center">
                  {selectedProduct.verificationStatus === "Verified" ? (
                    <div className="flex items-center text-blue-400">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Verified</span>
                    </div>
                  ) : selectedProduct.verificationStatus === "Pending" ? (
                    <div className="flex items-center text-purple-400">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>Pending Verification</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-slate-400">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span>Not Submitted</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Product
                </Button>
                <Button
                  className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30"
                  onClick={() => openDeleteDialog(selectedProduct.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </GlassContainer>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-slate-300">
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-white font-medium">
              Product ID: <span className="font-mono">{productToDelete}</span>
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-slate-700 text-slate-300"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteProduct} className="bg-red-500/80 hover:bg-red-500 text-white">
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
