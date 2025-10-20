import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

// Pages
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import SignDocument from "@/pages/dashboard/SignDocument";
import HistoryPage from "@/pages/dashboard/HistoryPage";

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
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
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
        children: [
          {
            path: "sign-document",
            element: <SignDocument />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "history",
            element: <HistoryPage />,
          },
          {
            path: "reports",
            // element: <Reports />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/sign-document" />,
  },
]);
