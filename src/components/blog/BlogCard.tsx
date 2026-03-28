import { Link } from "@tanstack/react-router";
import { User, Calendar, ArrowRight } from "lucide-react";

export function BlogCard({ post }: { post: any }) {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  if (!post) return null;

  const premiumCardClasses = `
    p-8 flex flex-col h-full
    bg-[#F8FAFC] dark:bg-slate-900 
    border-2 border-slate-300 dark:border-slate-600 
    rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all
  `;

  const tagsData = post.tags;
  const safeTags = Array.isArray(tagsData)
    ? tagsData
    : Array.isArray(tagsData?.data)
      ? tagsData.data
      : [];

  return (
    <article className={premiumCardClasses}>
      {/* IMAGE SECTION */}
      <div className="aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800">
        <Link
          to="/blog/$blogId"
          params={{ blogId: post.documentId }}
          className="block w-full h-full"
        >
          <img
            src={
              post.coverImage?.url
                ? `${STRAPI_URL}${post.coverImage.url}`
                : "https://placehold.co"
            }
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </Link>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-8 flex flex-col grow space-y-5">
        {/* Meta Data */}
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link
            to="/blog"
            search={(prev: any) => ({
              ...prev,
              author: post.author?.name,
              page: 1,
            })}
            className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
          >
            <User size={14} strokeWidth={3} /> {post.author?.name || "Admin"}
          </Link>

          <span className="flex items-center gap-1.5">
            <Calendar size={14} strokeWidth={3} />
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString(undefined, {
                  dateStyle: "medium",
                })
              : "No date"}
          </span>
        </div>

        {/* Title & Excerpt */}
        <div className="space-y-3">
          <Link to="/blog/$blogId" params={{ blogId: post.documentId }}>
            <h3 className="text-2xl font-black tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium line-clamp-3">
            {post.excerpt ||
              "Dive into this latest insight exploring modern web development and design principles..."}
          </p>
        </div>

        {/* Tags Section */}
        {safeTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {safeTags.map((tag: any) => (
              <Link
                key={tag.id}
                to="/blog"
                search={(prev: any) => ({
                  ...prev,
                  tag: tag.name,
                  page: 1,
                })}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-600 hover:text-white transition-all"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Footer Action */}
        <div className="mt-auto pt-6 border-t-2 border-slate-100 dark:border-slate-800">
          <Link
            to="/blog/$blogId"
            params={{ blogId: post.documentId }}
            className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
          >
            Read Full Article <ArrowRight size={16} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </article>
  );
}
