import React, { useState } from "react";

const data = [
  { month: "JAN", value: 620 },
  { month: "FEB", value: 580 },
  { month: "MAR", value: 410 },
  { month: "APR", value: 390 },
  { month: "MAY", value: 480 },
  { month: "JUN", value: 860 },
  { month: "JUL", value: 530 },
  { month: "AUG", value: 490 },
  { month: "SEP", value: 370 },
  { month: "OCT", value: 420 },
  { month: "NOV", value: 310 },
  { month: "DEC", value: 390 },
];

const filters = ["Robbin Hood", "Amreitrade", "Fidelity", "Charles"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="text-slate-500">{label}</p>
        <p className="font-bold text-slate-800">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export const OverviewChart: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("Robbin Hood");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-base font-bold text-slate-800">Overview</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === f
                  ? "bg-brand-orange text-white shadow-sm"
                  : "bg-transparent text-slate-400 border border-slate-200 hover:border-slate-300"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
    </div>
  );
};
