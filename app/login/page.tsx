import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import LoginForm from "@/components/login-form"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  
  // If already logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  )
} 