import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus } from "lucide-react"

export default async function StaffManagement() {
  const session = await getServerSession(authOptions)

  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Staff
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Staff</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="managers">Managers</TabsTrigger>
            <TabsTrigger value="analysts">Analysts</TabsTrigger>
            <TabsTrigger value="developers">Developers</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Managers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average KPI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76%</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Staff Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Staff directory content would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Active staff content would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Inactive staff content would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
