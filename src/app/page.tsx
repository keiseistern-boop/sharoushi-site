import Link from "next/link";
import SubjectCard from "@/components/SubjectCard";
import { subjects } from "@/lib/subjects";
import { getArticlesBySubject } from "@/lib/articles";

export default function Home() {
  const laborSubjects = subjects.filter((s) => s.category === "labor");
  const socialSubjects = subjects.filter((s) => s.category === "social-insurance");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-brown/50 to-background" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="w-16 h-16 border-2 border-gold mx-auto flex items-center justify-center">
                <span className="text-gold font-serif text-2xl font-bold">SR</span>
              </div>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-ivory mb-4 tracking-wide">
              社労士<span className="text-gold-gradient">合格</span>ナビ
            </h1>
            <p className="text-ivory/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-2">
              読むだけで受かる。社会保険労務士試験対策サイト。
            </p>
            <p className="text-ivory/30 text-xs max-w-lg mx-auto leading-relaxed">
              全10科目の重要ポイントを体系的に解説。
              <br />
              確実に合格力を身につけるための、最高品質の学習コンテンツ。
            </p>
            <div className="mt-10">
              <Link
                href="/subjects"
                className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-3 text-sm tracking-wider hover:bg-gold hover:text-background transition-all duration-300"
              >
                学習を始める
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-t border-gold/10" />
      </div>

      {/* Subjects Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Labor subjects */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gold/10" />
            <h2 className="font-serif text-gold text-lg tracking-widest">労働科目</h2>
            <div className="h-px flex-1 bg-gold/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {laborSubjects.map((subject) => (
              <SubjectCard
                key={subject.slug}
                subject={subject}
                articleCount={getArticlesBySubject(subject.slug).length}
              />
            ))}
          </div>
        </div>

        {/* Social insurance subjects */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gold/10" />
            <h2 className="font-serif text-gold text-lg tracking-widest">社会保険科目</h2>
            <div className="h-px flex-1 bg-gold/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialSubjects.map((subject) => (
              <SubjectCard
                key={subject.slug}
                subject={subject}
                articleCount={getArticlesBySubject(subject.slug).length}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
