import React from "react";
import { Link2, UserPlus, TrendingUp } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, icon, iconBg }) => (
  <div className="bg-white rounded-2xl px-6 py-5 flex items-center justify-between flex-1 min-w-0 shadow-sm">
    <div>
      <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
      <p className="text-xs text-slate-400 mt-1 font-medium">{label}</p>
    </div>
    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
      {icon}
    </div>
  </div>
);

export const StatCards: React.FC = () => {
  const stats: StatCardProps[] = [
    {
      value: "51",
      label: "Total Channels",
      icon: <Link2 size={18} className="text-teal-500" />,
      iconBg: "bg-teal-50",
    },
    {
      value: "125",
      label: "New Members",
      icon: <UserPlus size={18} className="text-violet-400" />,
      iconBg: "bg-violet-50",
    },
    {
      value: "789",
      label: "All Impressions",
      icon: <TrendingUp size={18} className="text-orange-400" />,
      iconBg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex gap-4 flex-wrap sm:flex-nowrap">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};
