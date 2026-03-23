import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-(--navy-800) to-teal-500 px-4">
      <Outlet />
    </div>
  );
}
