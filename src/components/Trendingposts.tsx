import React from "react";
import { Heart, MessageSquare, Share2 } from "lucide-react";

interface Post {
  title: string;
  excerpt: string;
  likes: number;
  comments: number;
  shares: number;
}

const posts: Post[] = [
  {
    title: "8 Upcoming Influencer Marketing Trends and Benefits",
    excerpt: "Marketing is evolving. It's changing from a one-way street to a two-way conversa...",
    likes: 260,
    comments: 234,
    shares: 123,
  },
  {
    title: "How Influencer Marketing Affects Consumer Buying Behavior",
    excerpt: "As influencer marketing continues to grow, consumers have been turning to their...",
    likes: 260,
    comments: 234,
    shares: 123,
  },
];

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="bg-[#FAFAFA] border border-slate-100 rounded-2xl p-5 flex flex-col justify-between gap-4 flex-1 min-w-0">
    <div>
      <h3 className="text-sm font-bold text-slate-800 leading-snug mb-2">{post.title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{post.excerpt}</p>
    </div>
    <div className="flex items-center gap-5">
      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Heart size={13} className="text-red-400 fill-red-400" />
        {post.likes}
      </span>
      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <MessageSquare size={13} className="text-orange-400" />
        {post.comments}
      </span>
      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Share2 size={13} className="text-orange-500" />
        {post.shares}
      </span>
    </div>
  </div>
);

export const TrendingPosts: React.FC = () => (
  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
    <h2 className="text-base lg:text-lg font-bold text-slate-800 mb-4">Trending Posts</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post) => (
        <PostCard key={post.title} post={post} />
      ))}
    </div>
  </div>
);
