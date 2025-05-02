import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import DashboardLayout from "@/components/dashboard-layout"
import ChatInterface from "@/components/chat-interface"

export default async function ChatPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <DashboardLayout>
      <div className="p-6 h-[calc(100vh-2rem)]">
        <h1 className="text-3xl font-bold mb-6">Chat Assistant</h1>
        <div className="bg-white rounded-lg shadow-lg h-[calc(100%-6rem)]">
          <ChatInterface isFullPage />
        </div>
      </div>
    </DashboardLayout>
  )
} 