import React from "react";
import { Outlet } from "react-router-dom";
// import { Sidebar } from "./Sidebar"; // Your existing sidebar component
import { Search, Plus, Bell } from "lucide-react";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pl-64">
      {/* <Sidebar /> */}
      <div className="p-8 max-w-[1600px] mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">My Portfolio</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white pl-11 pr-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm"
              />
            </div>
            <button
              title="button"
              className="p-2.5 bg-white rounded-xl border border-slate-100 text-slate-600 hover:bg-slate-50">
              <Plus size={20} />
            </button>
            <button
              title="button"
              className="p-2.5 bg-white rounded-xl border border-slate-100 text-slate-600 hover:bg-slate-50 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Inner Dashboard Routes Swap Here */}
        <Outlet />
      </div>
    </div>
  );
};
