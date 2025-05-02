import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, BarChart2 } from "lucide-react"

type StaffStatsProps = {
  title: string
  value: string
  icon: string
}

export default function StaffStats({ title, value, icon }: StaffStatsProps) {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-5 w-5 text-blue-500" />
      case "user-check":
        return <UserCheck className="h-5 w-5 text-green-500" />
      case "bar-chart":
        return <BarChart2 className="h-5 w-5 text-purple-500" />
      default:
        return <Users className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="text-xs text-gray-500 mt-1">
          {title === "Average KPI" ? "+5% from last month" : "Updated just now"}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
