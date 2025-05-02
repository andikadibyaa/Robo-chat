"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ChatInterface from "@/components/chat-interface"
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

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
            <li>
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/staff"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
              >
                <Users className="mr-3 h-5 w-5" />
                Staff Management
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/analytics"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </li>
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

        <div className="flex-grow">
          <ChatInterface />
        </div>
      </div>

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
