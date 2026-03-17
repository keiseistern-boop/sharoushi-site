import Link from "next/link";
import type { Subject } from "@/lib/subjects";

export default function SubjectCard({ subject, articleCount }: { subject: Subject; articleCount: number }) {
  return (
    <Link href={`/subjects/${subject.slug}`}>
      <div className="group border border-card-border hover:border-gold/50 bg-card-bg rounded-lg p-6 transition-all duration-300 hover:bg-card-bg/80 hover:shadow-[0_0_20px_rgba(201,168,76,0.08)]">
        <div className="flex items-start justify-between mb-3">
          <span className="text-gold/60 font-serif text-xs tracking-widest uppercase">
            {subject.category === "labor" ? "労働科目" : "社会保険科目"}
          </span>
          <span className="text-ivory/30 text-xs">
            {articleCount > 0 ? `${articleCount}記事` : "準備中"}
          </span>
        </div>
        <h3 className="font-serif text-ivory text-lg mb-1 group-hover:text-gold transition-colors">
          {subject.name}
        </h3>
        <p className="text-ivory/40 text-xs mb-3">{subject.shortName}</p>
        <p className="text-ivory/60 text-sm leading-relaxed">
          {subject.description}
        </p>
        <div className="mt-4 flex items-center text-gold/50 group-hover:text-gold text-xs transition-colors">
          <span>学習する</span>
          <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
