"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  UserCircle,
  Settings,
  LogOut,
  Bell,
  Shield,
  HelpCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UserDropdownMenuProps {
  user: any
}

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn(
          "flex items-center gap-2 px-3 py-2",
          "bg-white/90 backdrop-blur-sm",
          "border border-gray-200",
          "rounded-lg cursor-pointer",
          "transition-all duration-200",
          "hover:bg-gray-50",
          "shadow-sm hover:shadow",
        )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>
              <UserCircle className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700">{user?.name || user?.email}</span>
            <span className="text-xs text-gray-500">{user?.role || 'admin'}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.name || user?.email}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Pengaturan</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard/notifications')}>
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifikasi</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard/security')}>
          <Shield className="mr-2 h-4 w-4" />
          <span>Keamanan</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard/help')}>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Bantuan</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600 focus:text-red-600 cursor-pointer"
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 