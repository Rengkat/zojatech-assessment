import React from "react";
import { Watchlist } from "./Watchlist";
import { Revenue } from "./Revenue";
import { TrendingNews } from "./Trendingnews";

export const RightPanel: React.FC = () => (
  <div className="flex flex-col gap-4 w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
      <Watchlist />
      <Revenue />
    </div>
    <TrendingNews />
  </div>
);
