import React from "react";
import { Search, Plus, Bell } from "lucide-react";

const GlobalHeaderActions: React.FC = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 ml-auto">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Search"
          className="bg-white pl-11 pr-4 py-2.5 rounded-full border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 text-sm text-slate-600 placeholder:text-slate-400 w-36 sm:w-56 lg:w-[340px] transition-all"
        />
      </div>

      {/* Add Button */}
      <button
        aria-label="Add"
        className="text-slate-500 hover:text-slate-700 p-2 rounded-full bg-white shadow-sm transition-colors">
        <Plus size={20} />
      </button>

      {/* Notifications */}
      <button
        aria-label="Notifications"
        className="relative text-slate-500 hover:text-slate-700 p-2 bg-white rounded-full shadow-sm transition-colors">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </div>
  );
};
export default GlobalHeaderActions;
