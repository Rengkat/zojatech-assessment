import React from "react";
import { Watchlist } from "./Watchlist";

export const RightPanel: React.FC = () => (
  <div className="flex flex-col gap-4 w-full xl:w-[280px] shrink-0">
    <Watchlist />
  </div>
);
