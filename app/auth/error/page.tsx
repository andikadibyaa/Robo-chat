"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthError() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("An authentication error occurred")

  useEffect(() => {
    const error = searchParams.get("error")

    // Map error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
      Configuration: "There is a problem with the server configuration.",
      AccessDenied: "You do not have permission to sign in.",
      Verification: "The verification token has expired or has already been used.",
      CredentialsSignin: "Invalid username or password. Please try again.",
      Default: "Unable to sign in. Please try again later.",
    }

    setErrorMessage(error && errorMessages[error] ? errorMessages[error] : errorMessages.Default)
  }, [searchParams])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <Card className="border-red-200">
          <CardHeader className="bg-red-50 text-red-700">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <CardTitle>Authentication Error</CardTitle>
            </div>
            <CardDescription className="text-red-600">There was a problem signing you in</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700">{errorMessage}</p>
          </CardContent>
          <CardFooter>
            <Link href="/" className="w-full">
              <Button className="w-full">Return to Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
