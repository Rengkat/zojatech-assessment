import React from "react";
import { TrendingUp } from "lucide-react";

interface Member {
  name: string;
  handle: string;
  growth: string;
  avatar: string;
}

const members: Member[] = [
  {
    name: "Wanda Parker",
    handle: "@ashking1234",
    growth: "10.3%",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&fit=crop",
  },
  {
    name: "Terry Brown",
    handle: "@ashking1234",
    growth: "9.8%",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop",
  },
  {
    name: "Lucas Holmes",
    handle: "@ashking1234",
    growth: "6.5%",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&q=80&fit=crop",
  },
  {
    name: "Janice Miller",
    handle: "@ashking1234",
    growth: "8.6%",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80&fit=crop",
  },
  {
    name: "Terry Brown",
    handle: "@ashking1234",
    growth: "9.8%",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop",
  },
];

const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
  <div className="flex flex-col items-center text-center gap-2 w-[90px] sm:flex-1 shrink-0">
    <img
      src={member.avatar}
      alt={member.name}
      className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm"
    />
    <div>
      <p className="text-xs font-semibold text-slate-800 leading-tight">{member.name}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{member.handle}</p>
    </div>
    <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
      <TrendingUp size={11} />
      {member.growth}
    </span>
  </div>
);

export const PotentialMembers: React.FC = () => (
  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
    <h2 className="text-base lg:text-lg font-bold text-slate-800 mb-5">Potential Members</h2>

    <div className="flex gap-3 sm:gap-2 sm:justify-between overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
      {members.map((m, i) => (
        <MemberCard key={i} member={m} />
      ))}
    </div>
  </div>
);
