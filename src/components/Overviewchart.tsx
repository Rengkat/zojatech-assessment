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
  if (active && payload?.length) {
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
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-start sm:items-center justify-between gap-3 mb-5 flex-wrap sm:flex-nowrap">
        <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-800 shrink-0">
          Overview
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none -mr-1 pr-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0
                ${
                  activeFilter === f
                    ? "bg-orange-400 text-white shadow-sm"
                    : "bg-[#F6F6F6] text-slate-400 hover:bg-slate-100"
                }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={24} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 10 }}
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
