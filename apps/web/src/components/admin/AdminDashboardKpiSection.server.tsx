import { AdminDashboardKpiGrid } from "@/components/admin/AdminDashboardKpiGrid";
import { getAdminDashboardKpiData } from "@/data/admin/get-admin-dashboard.server";

export async function AdminDashboardKpiSection() {
  const data = await getAdminDashboardKpiData();
  return <AdminDashboardKpiGrid data={data} />;
}
