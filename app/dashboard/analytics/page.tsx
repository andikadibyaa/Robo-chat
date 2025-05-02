import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Analytics() {
  const session = await getServerSession(authOptions)

  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        <Tabs defaultValue="performance">
          <TabsList className="mb-6">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="kpi">KPI Trends</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-gray-500">Performance chart would go here...</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-gray-500">Top performers chart would go here...</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Detailed performance metrics would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kpi" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>KPI Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <p className="text-gray-500">KPI trends chart would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <p className="text-gray-500">Department performance chart would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
