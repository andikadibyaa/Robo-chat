"use client"

import React from "react"

interface DataTableProps<T> {
  columns: { key: keyof T; header: string }[]
  data: T[]
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 text-left font-semibold bg-gray-100">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                Tidak ada data.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="border-t">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
} 