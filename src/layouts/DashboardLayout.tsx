import { AppSidebar } from "@/pages/dashboard/sidemenu/Menu";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
