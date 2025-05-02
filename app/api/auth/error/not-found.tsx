import { redirect } from "next/navigation"

export default function NotFound() {
  // Redirect to our custom error page
  redirect("/auth/error")
}
