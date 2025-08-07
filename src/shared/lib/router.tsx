import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

// Pages
import { LoginPage } from "@/pages/auth/LoginPage";

// Stores and Layouts
import { AuthLayout } from "@/layouts/AuthLayout";
import { useAuthStore } from "@/stores/authStore";
import { DashboardLayout } from "@/layouts/DashboardLayout";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          }
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
]);
