import React from "react";
import GlobalHeaderActions from "../../components/GlobalHeaderActions";
import { StatCards } from "../../components/Statcards";
import { OverviewChart } from "../../components/Overviewchart";
import { TrendingPosts } from "../../components/Trendingposts";
import { PotentialMembers } from "../../components/Potentialmembers";
import { RightPanel } from "../../components/RightPanel";

export const Portfolio: React.FC = () => (
  <div className="flex flex-col flex-1">
    {/* Page header */}
    <header className="flex justify-between items-center mb-5 gap-3">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 whitespace-nowrap">
        My Portfolio
      </h1>
      <GlobalHeaderActions />
    </header>

    <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start flex-1">
      {/* ── Left / main column ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-4 w-full">
        <StatCards />
        <OverviewChart />
        <TrendingPosts />
        <PotentialMembers />
      </div>

      {/* ── Right panel ── */}

      <div className="w-full lg:w-[280px] shrink-0">
        <RightPanel />
      </div>
    </div>
  </div>
);
