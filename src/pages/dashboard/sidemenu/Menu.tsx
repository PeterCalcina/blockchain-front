import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileUp, BarChart3, LogOut, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { Button } from "@/shared/components/ui/button";

const menuItems = [
  {
    title: "Firmar Documento",
    url: "/dashboard/sign-document",
    icon: FileUp,
  },
  {
    title: "Reportes",
    url: "/dashboard/reportes",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 bg-gradient-to-r from-teal-50 to-[var(--navy-50)]">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-[var(--navy-600)] shadow-md">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-base font-bold bg-gradient-to-r from-[var(--navy-700)] to-[var(--navy-600)] bg-clip-text text-transparent">
              BlockSign
            </p>
            <p className="text-xs text-gray-600">Firma Digital Blockchain</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[var(--navy-700)] font-semibold">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={`
                      transition-all duration-200 hover:bg-gradient-to-r hover:from-teal-50 hover:to-[var(--navy-50)]
                      ${
                        pathname === item.url
                          ? "bg-gradient-to-r from-teal-100 to-[var(--navy-100)] text-[var(--navy-700)] border-r-2 border-teal-500"
                          : "text-gray-700 hover:text-[var(--navy-700)]"
                      }
                    `}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 bg-gray-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
