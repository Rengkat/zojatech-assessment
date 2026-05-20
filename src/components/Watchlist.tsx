import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Stock {
  ticker: string;
  price: string;
  change: string;
  positive: boolean;
  sparkData: { v: number }[];
}

const stocks: Stock[] = [
  {
    ticker: "AAPL",
    price: "$142.90",
    change: "+0.47%",
    positive: true,
    sparkData: [
      { v: 130 },
      { v: 125 },
      { v: 135 },
      { v: 128 },
      { v: 140 },
      { v: 133 },
      { v: 138 },
      { v: 130 },
      { v: 142 },
      { v: 145 },
    ],
  },
  {
    ticker: "BPL",
    price: "$142.90",
    change: "-0.78%",
    positive: false,
    sparkData: [
      { v: 150 },
      { v: 145 },
      { v: 148 },
      { v: 140 },
      { v: 142 },
      { v: 135 },
      { v: 138 },
      { v: 130 },
      { v: 133 },
      { v: 128 },
    ],
  },
];

const StockRow: React.FC<{ stock: Stock }> = ({ stock }) => (
  <div className="flex items-center justify-between gap-3 bg-[#FAFAFA] rounded-xl px-4 py-3">
    <div className="min-w-[60px]">
      <p className="text-sm font-bold text-slate-800">{stock.ticker}</p>
      <div
        className={`flex items-center gap-1 mt-0.5 text-xs font-semibold ${
          stock.positive ? "text-emerald-500" : "text-red-500"
        }`}>
        {stock.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      </div>
      <p className="text-xs font-bold text-slate-700 mt-0.5">{stock.price}</p>
      <p
        className={`text-[10px] font-medium ${
          stock.positive ? "text-emerald-500" : "text-red-500"
        }`}>
        {stock.change}
      </p>
    </div>
    <div className="flex-1 h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={stock.sparkData}>
          <Line type="monotone" dataKey="v" stroke="#F97316" strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const Watchlist: React.FC = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-bold text-slate-800">Watchlist</h2>
      <button className="text-[11px] font-bold text-brand-orange hover:underline">VIEW ALL</button>
    </div>
    <div className="flex flex-col gap-3">
      {stocks.map((s) => (
        <StockRow key={s.ticker} stock={s} />
      ))}
    </div>
  </div>
);
