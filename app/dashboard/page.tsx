import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import DashboardLayout from "@/components/dashboard-layout"
import StaffTable from "@/components/staff-table"
import StaffStats from "@/components/staff-stats"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserCircle } from "lucide-react"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold">Staff Tracking</h1>
          <UserDropdownMenu user={session.user} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <StaffStats title="Total Staff" value="42" icon="users" />
          <StaffStats title="Active Staff" value="28" icon="user-check" />
          <StaffStats title="Average KPI" value="76%" icon="bar-chart" />
        </div>

        <div className="bg-white rounded-lg shadow">
          <StaffTable />
        </div>
      </div>
    </DashboardLayout>
  )
}
