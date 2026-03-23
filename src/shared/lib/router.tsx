import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

// Pages
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPassword";
import SignDocument from "@/pages/dashboard/SignDocument";
import HistoryPage from "@/pages/dashboard/HistoryPage";
import UsersPage from "@/pages/dashboard/UsersPage";
import ReportsPage from "@/pages/dashboard/ReportsPage";
import SignValidation from "@/pages/validation/SignValidation";

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
          },
          {
            path: "/reset-password/:token",
            element: <ResetPasswordPage />,
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
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "reports",
            element: <ReportsPage />,
          },
          {
            path: "validate-document",
            element: <SignValidation />,
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
