import React from "react";
import GlobalHeaderActions from "../../components/GlobalHeaderActions";
import { StatCards } from "../../components/Statcards";
import { OverviewChart } from "../../components/Overviewchart";
import { TrendingPosts } from "../../components/Trendingposts";

export const Portfolio: React.FC = () => {
  return (
    <div className="flex flex-col flex-1">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">My Portfolio</h1>
        <GlobalHeaderActions />
      </header>

      {/* Dashboard Main Grid Content */}
      <div className="flex gap-6 items-start">
        {/* ── Left / Main column ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <StatCards />
          <OverviewChart />
          <TrendingPosts />
        </div>

        {/* ── Right panel ── */}
      </div>
    </div>
  );
};
