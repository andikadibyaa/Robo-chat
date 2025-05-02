"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  isFullPage?: boolean
}

export default function ChatInterface({ isFullPage = false }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")

  return (
    <div className={`flex flex-col ${isFullPage ? 'h-full' : 'h-full'}`}>
      <div className={cn(
        "flex-1 overflow-y-auto p-6 space-y-4",
        "scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-transparent"
      )}>
        {/* Initial bot message */}
        <div className="flex items-start gap-3">
          <div className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full",
            "bg-gradient-to-r from-blue-500 to-blue-600",
            "flex items-center justify-center",
            "text-white text-sm font-medium"
          )}>
            R
          </div>
          <div className={cn(
            "bg-white rounded-2xl rounded-tl-sm p-4",
            "shadow-sm border border-blue-100/50",
            "max-w-[80%]"
          )}>
            <p className="text-sm text-gray-700">Halo! Ada yang bisa saya bantu?</p>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className={cn(
        "p-4 bg-white/50",
        "border-t border-blue-100/50",
        "backdrop-blur-sm"
      )}>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan Anda..."
            className={cn(
              "flex-1 px-4 py-3",
              "bg-white/80 backdrop-blur-sm",
              "border border-blue-100/50",
              "rounded-full",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/30",
              "text-sm text-gray-700",
              "placeholder:text-gray-400"
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                // Handle send message
              }
            }}
          />
          <Button className={cn(
            "rounded-full px-4",
            "bg-gradient-to-r from-blue-500 to-blue-600",
            "hover:from-blue-600 hover:to-blue-700",
            "shadow-md hover:shadow-lg",
            "transition-all duration-200"
          )}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
