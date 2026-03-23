import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileUp, BarChart3, LogOut, Shield, UserPlus, History, CheckCircle } from "lucide-react";
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
import { useAuthStore } from "@/stores/authStore";

const menuItems = [
  {
    title: "Firmar Documento",
    url: "/dashboard/sign-document",
    icon: FileUp,
  },
  {
    title: "Validar Documento",
    url: "/dashboard/validate-document",
    icon: CheckCircle,
  },
  {
    title: "Crear Usuario",
    url: "/dashboard/register",
    icon: UserPlus,
  },
  {
    title: "Historial",
    url: "/dashboard/history",
    icon: History,
  },
  {
    title: "Usuarios",
    url: "/dashboard/users",
    icon: Shield,
  },
  {
    title: "Reportes",
    url: "/dashboard/reports",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar className="border-r border-gray-200 sticky top-0 h-screen w-64 bg-white">
      <SidebarHeader className="border-b border-gray-200 bg-linear-to-r from-teal-50 to-(--navy-50)">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-teal-500 to-(--navy-600) shadow-md">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-base font-bold bg-linear-to-r from-(--navy-700) to-(--navy-600) bg-clip-text text-transparent">
              BlockSign
            </p>
            <p className="text-xs text-gray-600">Firma Digital Blockchain</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-(--navy-700) font-semibold">
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
                      transition-all duration-200 hover:bg-linear-to-r hover:from-teal-50 hover:to-(--navy-50)]                      ${
                        pathname === item.url
                          ? "bg-linear-to-r from-teal-100 to-(--navy-100) text-(--navy-700) border-r-2 border-teal-500"
                          : "text-gray-700 hover:text-(--navy-700)"
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
