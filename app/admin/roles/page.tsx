"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassContainer } from "@/components/glass-container"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoleBadge } from "@/components/role-badge"
import { Search, Plus, X } from "lucide-react"

// Mock data for users and their roles
const initialUsers = [
  { id: 1, address: "0x7a3b...21f4", role: "Manufacturer", dateAssigned: "2023-10-15" },
  { id: 2, address: "0x3f1c...9e82", role: "Distributor", dateAssigned: "2023-09-22" },
  { id: 3, address: "0x8d2e...45c7", role: "Admin", dateAssigned: "2023-08-05" },
  { id: 4, address: "0x2b5a...76d9", role: "Regulator", dateAssigned: "2023-11-01" },
  { id: 5, address: "0x9c4f...12e8", role: "Manufacturer", dateAssigned: "2023-10-28" },
  { id: 6, address: "0x5e2d...78a3", role: "Public", dateAssigned: "2023-11-10" },
  { id: 7, address: "0x1a7b...34c2", role: "Distributor", dateAssigned: "2023-09-15" },
  { id: 8, address: "0x6d4e...90f1", role: "Regulator", dateAssigned: "2023-10-05" },
]

export default function RolesPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newUserAddress, setNewUserAddress] = useState("")
  const [newUserRole, setNewUserRole] = useState("")

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Add a new user with role
  const handleAddUser = () => {
    if (newUserAddress && newUserRole) {
      const newUser = {
        id: users.length + 1,
        address: newUserAddress,
        role: newUserRole,
        dateAssigned: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, newUser])
      setNewUserAddress("")
      setNewUserRole("")
      setIsDialogOpen(false)
    }
  }

  // Remove a user
  const handleRemoveUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Role Management</h1>
          <p className="text-slate-300">Assign and manage user roles in the system</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Assign Role
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Assign New Role</DialogTitle>
              <DialogDescription className="text-slate-300">
                Enter a wallet address and select a role to assign.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Wallet Address</label>
                <Input
                  placeholder="0x..."
                  value={newUserAddress}
                  onChange={(e) => setNewUserAddress(e.target.value)}
                  className="bg-slate-700/50 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Role</label>
                <Select value={newUserRole} onValueChange={setNewUserRole}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="Regulator">Regulator</SelectItem>
                    <SelectItem value="Distributor">Distributor</SelectItem>
                    <SelectItem value="Public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddUser}
                disabled={!newUserAddress || !newUserRole}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                Assign Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <GlassContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by address or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-700">
              Export
            </Button>
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-700">
              Filter
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-800/50">
              <TableRow className="hover:bg-slate-800/80 border-slate-700">
                <TableHead className="text-slate-300">Wallet Address</TableHead>
                <TableHead className="text-slate-300">Role</TableHead>
                <TableHead className="text-slate-300">Date Assigned</TableHead>
                <TableHead className="text-slate-300 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-slate-800/30 border-slate-700/50">
                  <TableCell className="font-mono text-slate-300">{user.address}</TableCell>
                  <TableCell>
                    <RoleBadge role={user.role.toLowerCase()} />
                  </TableCell>
                  <TableCell className="text-slate-400">{user.dateAssigned}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveUser(user.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-slate-400">
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </GlassContainer>
    </div>
  )
}

