
import MetricCards from "@/modules/homePage/MetricCard"
import HomeBox from "./HomeBox"
import CustomTable from "@/components/organisms/CustomTable"
import SalesCharts from "@/components/organisms/SalesCharts"

export default function DashboardPage() {
  return (
    <HomeBox>
      <MetricCards />
      <CustomTable />
      <SalesCharts />
    </HomeBox>
  )
}
