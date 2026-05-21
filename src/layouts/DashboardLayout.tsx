import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import type { AuthState } from "../redux/features/authSlice";
import SideBar from "../components/SideBar";

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated } = useSelector((s: { auth: AuthState }) => s.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Desktop sidebar spacer */}
      <div className="hidden lg:block w-[200px] shrink-0" aria-hidden="true" />

      {/* Main viewport */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Mobile hamburger row */}
        <div className="lg:hidden flex items-center pt-4 px-4 sm:px-6 bg-[#F8F9FA]">
          <button
            className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
          <div className="max-w-[1400px] w-full mx-auto flex-1 flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
