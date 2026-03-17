import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { subjects, getSubjectBySlug } from "@/lib/subjects";
import { getArticle, getArticlesBySubject } from "@/lib/articles";

export function generateStaticParams() {
  return subjects.flatMap((subject) => {
    const articles = getArticlesBySubject(subject.slug);
    return articles.map((article) => ({
      slug: subject.slug,
      article: article.slug,
    }));
  });
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; article: string }>;
}): Promise<Metadata> {
  return params.then(({ slug, article: articleSlug }) => {
    const articleData = getArticle(slug, articleSlug);
    const subject = getSubjectBySlug(slug);
    if (!articleData || !subject) return { title: "記事が見つかりません" };
    return {
      title: `${articleData.title} - ${subject.name}`,
      description: articleData.description,
    };
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; article: string }>;
}) {
  const { slug, article: articleSlug } = await params;
  const subject = getSubjectBySlug(slug);
  const articleData = getArticle(slug, articleSlug);

  if (!subject || !articleData) {
    notFound();
  }

  const allArticles = getArticlesBySubject(slug);
  const currentIndex = allArticles.findIndex((a) => a.slug === articleSlug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-ivory/40 flex-wrap">
        <Link href="/" className="hover:text-gold transition-colors">ホーム</Link>
        <span>/</span>
        <Link href="/subjects" className="hover:text-gold transition-colors">科目一覧</Link>
        <span>/</span>
        <Link href={`/subjects/${slug}`} className="hover:text-gold transition-colors">
          {subject.shortName}
        </Link>
        <span>/</span>
        <span className="text-ivory/60">{articleData.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-12">
        <span className="text-gold/60 font-serif text-xs tracking-[0.3em] uppercase">
          {subject.name}
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-ivory mt-2 tracking-wide leading-snug">
          {articleData.title}
        </h1>
        {articleData.description && (
          <p className="text-ivory/50 text-sm mt-4 leading-relaxed">
            {articleData.description}
          </p>
        )}
        <div className="w-12 h-px bg-gold/40 mt-6" />
      </header>

      {/* Article Body */}
      <article className="article-content">
        <MDXRemote source={articleData.content} />
      </article>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-gold/10">
        <div className="flex justify-between gap-4">
          {prevArticle ? (
            <Link
              href={`/subjects/${slug}/${prevArticle.slug}`}
              className="group flex-1 border border-card-border hover:border-gold/30 rounded-lg p-4 transition-all"
            >
              <span className="text-ivory/30 text-xs">前の記事</span>
              <p className="text-ivory/70 group-hover:text-gold text-sm mt-1 transition-colors">
                {prevArticle.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextArticle ? (
            <Link
              href={`/subjects/${slug}/${nextArticle.slug}`}
              className="group flex-1 text-right border border-card-border hover:border-gold/30 rounded-lg p-4 transition-all"
            >
              <span className="text-ivory/30 text-xs">次の記事</span>
              <p className="text-ivory/70 group-hover:text-gold text-sm mt-1 transition-colors">
                {nextArticle.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Back to subject */}
        <div className="mt-6 text-center">
          <Link
            href={`/subjects/${slug}`}
            className="inline-flex items-center gap-2 text-gold/50 hover:text-gold text-xs transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {subject.name}の記事一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
