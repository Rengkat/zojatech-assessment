import React from "react";
import { Search, Plus, Bell } from "lucide-react";

export const PortfolioHeader: React.FC = () => (
  <header className="flex justify-between items-center mb-6 flex-wrap gap-3">
    <h1 className="text-2xl font-bold text-slate-800">My Portfolio</h1>

    <div className="flex items-center gap-3">
      {/* Search */}
      <div className="relative w-[340px] max-w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-white pl-11 pr-4 py-2.5 rounded-full border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300/30 text-sm text-slate-600 placeholder:text-slate-400"
        />
      </div>

      {/* Plus */}
      <button
        aria-label="Add"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-slate-700 transition-colors">
        <Plus size={20} />
      </button>

      {/* Bell */}
      <button
        aria-label="Notifications"
        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-slate-700 transition-colors">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </div>
  </header>
);
