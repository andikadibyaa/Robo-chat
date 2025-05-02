"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical, Download, Filter } from "lucide-react"

// Sample staff data
const staffData = [
  { id: 1, kpi: 88, state: "On", selisih: 7, position: "Manager", tahun: 81, progress: 65 },
  { id: 2, kpi: 90, state: "Off", selisih: 10, position: "Analyst", tahun: 50, progress: 70 },
  { id: 3, kpi: 63, state: "On", selisih: 11, position: "Developer", tahun: 83, progress: 45 },
  { id: 4, kpi: 77, state: "Off", selisih: 16, position: "Manager", tahun: 65, progress: 55 },
  { id: 5, kpi: 74, state: "On", selisih: 16, position: "Analyst", tahun: 66, progress: 50 },
  { id: 100, kpi: 100, state: "On", selisih: 16, position: "Analyst", tahun: 42, progress: 80 },
  { id: 80, kpi: 60, state: "Off", selisih: 82, position: "Developer", tahun: 62, progress: 90 },
  { id: 60, kpi: 30, state: "Off", selisih: 101, position: "Manager", tahun: 33, progress: 60 },
  { id: 40, kpi: 0, state: "Off", selisih: 138, position: "Analyst", tahun: 65, progress: 40 },
]

export default function StaffTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.id.toString().includes(searchTerm) || staff.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search staff..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>KPI</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Selisih</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.id}</TableCell>
                <TableCell>
                  <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${staff.progress}%` }}></div>
                  </div>
                </TableCell>
                <TableCell>{staff.kpi}%</TableCell>
                <TableCell>
                  <Badge variant={staff.state === "On" ? "default" : "secondary"}>{staff.state}</Badge>
                </TableCell>
                <TableCell>{staff.selisih}</TableCell>
                <TableCell>{staff.position}</TableCell>
                <TableCell>{staff.tahun}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit staff</DropdownMenuItem>
                      <DropdownMenuItem>View history</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
