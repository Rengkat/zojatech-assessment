import React from "react";
import GlobalHeaderActions from "../../components/GlobalHeaderActions";

export const Portfolio: React.FC = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* Dynamic Inline Row */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">My Portfolio</h1>
        <GlobalHeaderActions />
      </header>

      {/* Dashboard Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="lg:col-span-2 space-y-6">{/* Main Analytics Cards & Graphs */}</div>
        <div className="space-y-6">{/* Watchlists Widgets */}</div>
      </div>
    </div>
  );
};
