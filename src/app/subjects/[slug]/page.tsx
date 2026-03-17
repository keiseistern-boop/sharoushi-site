import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { subjects, getSubjectBySlug } from "@/lib/subjects";
import { getArticlesBySubject } from "@/lib/articles";

export function generateStaticParams() {
  return subjects.map((subject) => ({ slug: subject.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const subject = getSubjectBySlug(slug);
    if (!subject) return { title: "科目が見つかりません" };
    return {
      title: subject.name,
      description: subject.description,
    };
  });
}

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);

  if (!subject) {
    notFound();
  }

  const articles = getArticlesBySubject(slug);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-ivory/40">
        <Link href="/" className="hover:text-gold transition-colors">ホーム</Link>
        <span>/</span>
        <Link href="/subjects" className="hover:text-gold transition-colors">科目一覧</Link>
        <span>/</span>
        <span className="text-ivory/60">{subject.shortName}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <span className="text-gold/60 font-serif text-xs tracking-[0.3em] uppercase">
          {subject.category === "labor" ? "労働科目" : "社会保険科目"}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory mt-2 tracking-wide">
          {subject.name}
        </h1>
        <p className="text-ivory/50 text-sm mt-4 leading-relaxed max-w-2xl">
          {subject.description}
        </p>
        <div className="w-12 h-px bg-gold/40 mt-6" />
      </div>

      {/* Articles */}
      {articles.length > 0 ? (
        <div className="space-y-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-card-border rounded-lg bg-card-bg">
          <div className="w-12 h-12 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-ivory/40 text-sm">記事を準備中です</p>
          <p className="text-ivory/20 text-xs mt-1">近日公開予定</p>
        </div>
      )}
    </div>
  );
}
