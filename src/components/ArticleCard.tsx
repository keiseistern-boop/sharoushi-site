import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

export default function ArticleCard({ article, index }: { article: ArticleMeta; index: number }) {
  return (
    <Link href={`/subjects/${article.subject}/${article.slug}`}>
      <div className="group border border-card-border hover:border-gold/50 bg-card-bg rounded-lg p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.08)]">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 border border-gold/30 rounded flex items-center justify-center">
            <span className="text-gold/60 font-serif text-sm">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-ivory text-base mb-1 group-hover:text-gold transition-colors">
              {article.title}
            </h3>
            {article.description && (
              <p className="text-ivory/50 text-sm leading-relaxed line-clamp-2">
                {article.description}
              </p>
            )}
          </div>
          <svg className="flex-shrink-0 w-4 h-4 text-gold/30 group-hover:text-gold group-hover:translate-x-1 transition-all mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
