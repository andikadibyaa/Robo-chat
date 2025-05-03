"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ChatInterface from "@/components/chat-interface"
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Menu, X, MessageCircle, LineChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { 
  BarChart as RechartsBarChart, 
  PieChart as RechartsPieChart,
  LineChart as RechartsLineChart,
  CorrelationMatrix,
  FeatureImportance,
  StateTransitionDiagram 
} from "@/components/charts"
import StaffStateDistribution from "@/components/staff-state-distribution"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from "lucide-react"
import { PredictionForm } from "@/components/prediction-form"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const navItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard"
    },
    {
      href: "/dashboard/staff",
      icon: Users,
      label: "Staff Management"
    },
    {
      href: "/dashboard/predictions",
      icon: LineChart,
      label: "Predictions"
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart3,
      label: "Analytics"
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: "Settings"
    },
    {
      href: "/dashboard/chat",
      icon: MessageCircle,
      label: "Chat Assistant"
    }
  ]

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  const columns = [
    {
      accessorKey: "id",
      header: "Nama Staff"
    },
    {
      accessorKey: "bars",
      header: "Attitude Score"
    },
    {
      accessorKey: "kpi",
      header: "KPI"
    },
    {
      accessorKey: "state",
      header: "Status"
    },
    {
      accessorKey: "selisih",
      header: "Masa Kerja"
    },
    {
      accessorKey: "posisi",
      header: "Posisi"
    },
    {
      accessorKey: "tahun",
      header: "Tahun"
    }
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white p-4 flex justify-between items-center border-b">
        <div className="flex items-center">
          <div className="bg-[#1e2a47] p-1 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-circle"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <span className="font-bold ml-2">Staff Tracking</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md hover:bg-gray-100">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative lg:flex flex-col w-64 h-full bg-[#1e2a47] text-white z-20 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "flex left-0" : "hidden lg:flex -left-64 lg:left-0"
        }`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center">
          <div className="bg-[#1e2a47] p-1 rounded-md border border-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-circle"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold ml-2">Robo-chat</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                             (item.href !== "/dashboard" && pathname?.startsWith(item.href))
              const Icon = item.icon
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-md",
                      "transition-colors duration-200",
                      "hover:bg-gray-700/50",
                      {
                        "bg-gray-700 text-white": isActive,
                        "text-gray-300": !isActive
                      }
                    )}
                  >
                    <Icon className={cn(
                      "mr-3 h-5 w-5",
                      {
                        "text-white": isActive,
                        "text-gray-400": !isActive
                      }
                    )} />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </div>

      {/* Floating Chat Button */}
      {pathname !== '/dashboard/chat' && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            size="icon"
            className={cn(
              "h-14 w-14 rounded-full",
              "bg-gradient-to-r from-blue-500 to-blue-600",
              "shadow-[0_4px_20px_rgba(59,130,246,0.5)]",
              "hover:shadow-[0_4px_24px_rgba(59,130,246,0.6)]",
              "transition-all duration-300 ease-in-out",
              "hover:scale-105",
              "border-4 border-white"
            )}
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        </div>
      )}

      {/* Floating Chat Interface */}
      {isChatOpen && pathname !== '/dashboard/chat' && (
        <div className={cn(
          "fixed bottom-24 right-6 z-40",
          "w-[380px] h-[600px]",
          "bg-gradient-to-b from-white to-gray-50/95",
          "rounded-[2rem] rounded-br-md",
          "shadow-[0_8px_40px_rgba(0,0,0,0.12)]",
          "border border-white/60",
          "backdrop-blur-sm",
          "animate-in slide-in-from-bottom duration-300",
          "overflow-hidden"
        )}>
          {/* Chat Header */}
          <div className={cn(
            "flex items-center justify-between",
            "p-6 pb-4",
            "bg-gradient-to-r from-blue-500/5 to-blue-600/5",
            "border-b border-blue-100/50"
          )}>
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-10 w-10 rounded-full",
                "bg-gradient-to-r from-blue-500 to-blue-600",
                "flex items-center justify-center",
                "shadow-inner shadow-blue-600/20"
              )}>
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Asisten Chat</h3>
                <p className="text-xs text-gray-500">Siap membantu Anda</p>
              </div>
            </div>
            <Button
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                "bg-gray-100 hover:bg-gray-200",
                "border border-gray-200",
                "transition-colors",
                "flex items-center justify-center"
              )}
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4 text-gray-600" />
            </Button>
          </div>

          {/* Chat Interface */}
          <div className="h-[calc(600px-88px)] bg-gradient-to-b from-white to-blue-50/30">
            <ChatInterface />
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden pt-16 lg:pt-0">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
