import { redirect } from "next/navigation"

export default function ApiErrorPage() {
  // Redirect to our custom error page
  redirect("/auth/error")
}
