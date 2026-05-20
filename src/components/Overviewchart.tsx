import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={28} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            ticks={[0, 200, 400, 600, 800, 1000]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar dataKey="value" radius={[6, 6, 6, 6]}>
            {data.map((entry) => (
              <Cell key={entry.month} fill={entry.month === "JUN" ? "#F97316" : "#E2E8F0"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
