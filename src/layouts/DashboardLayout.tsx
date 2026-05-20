import React from "react";
import { Outlet } from "react-router-dom";
import { Search, Plus, Bell } from "lucide-react";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F6] pl-[200px]">
      <div className="px-0 py-7 max-w-[1400px] mx-auto border-black border-2">
        {/* Header */}
        <header title="header" className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">My Portfolio</h1>

          <div className="flex items-center gap-3">
            {/* Search — pill shaped, wide */}
            <div className="relative w-[422px]">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white pl-11 pr-4 py-2.5 rounded-full border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-sm text-slate-600 placeholder:text-slate-400"
              />
            </div>

            {/* Plus — plain, no box */}
            <button
              title="add"
              className="text-slate-500 hover:text-slate-700 p-2 rounded-full border-wite bg-[#FFFFFF]">
              <Plus size={22} />
            </button>

            {/* Bell — with red dot */}
            <button
              title="notifications"
              className="relative text-slate-500 hover:text-slate-700 p-2 bg-[#FFFFFF] rounded-full border-white">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <Outlet />
      </div>
    </div>
  );
};
