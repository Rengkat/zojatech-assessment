import React from "react";

interface NewsItem {
  title: string;
  excerpt: string;
  image: string;
}
const newsItems: NewsItem[] = [
  {
    title: "Russia & Ukraine War",
    excerpt: "Marketing is evolving. It's chang...",
    image: "https://picsum.photos/id/20/80/80",
  },
  {
    title: "Elon Musk bought Twitter",
    excerpt: "Twitter is the most useful social pl...",
    image: "https://picsum.photos/id/0/80/80",
  },
  {
    title: "Fuel Crisis Everywhere",
    excerpt: "Due to covid situation in 2020 the...",
    image: "https://picsum.photos/id/14/80/80",
  },
];

export const TrendingNews: React.FC = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm">
    <h2 className="text-sm font-bold text-slate-800 mb-4">Trending News</h2>
    <div className="flex flex-col gap-3">
      {newsItems.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-3 cursor-pointer group shadow-sm rounded-xl p-2">
          <img
            src={item.image}
            alt={item.title}
            className="w-12 h-12 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 group-hover:text-brand-orange transition-colors leading-tight">
              {item.title}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
