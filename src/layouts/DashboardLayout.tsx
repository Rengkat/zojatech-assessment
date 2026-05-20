import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Search, Plus, Bell, Menu } from "lucide-react";
import { Sidebar } from "../components/SideBar";

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="hidden lg:block w-[200px] shrink-0" aria-hidden="true" />

      {/* ── Main ── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center gap-3 px-4 sm:px-8 py-5 bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu">
              <Menu size={22} />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">My Portfolio</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="bg-white pl-11 pr-4 py-2.5 rounded-full border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 text-sm text-slate-600 placeholder:text-slate-400 w-36 sm:w-56 lg:w-[340px] transition-all"
              />
            </div>

            <button
              aria-label="Add"
              className="text-slate-500 hover:text-slate-700 p-2 rounded-full bg-white shadow-sm transition-colors">
              <Plus size={20} />
            </button>

            <button
              aria-label="Notifications"
              className="relative text-slate-500 hover:text-slate-700 p-2 bg-white rounded-full shadow-sm transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-8 pb-8">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
