import type { Metadata } from "next";
import SubjectCard from "@/components/SubjectCard";
import { subjects } from "@/lib/subjects";
import { getArticlesBySubject } from "@/lib/articles";

export const metadata: Metadata = {
  title: "科目一覧",
  description: "社労士試験の全10科目の学習コンテンツ一覧。労働科目と社会保険科目を体系的に学習できます。",
};

export default function SubjectsPage() {
  const laborSubjects = subjects.filter((s) => s.category === "labor");
  const socialSubjects = subjects.filter((s) => s.category === "social-insurance");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Page Header */}
      <div className="text-center mb-16">
        <p className="text-gold/60 font-serif text-xs tracking-[0.3em] uppercase mb-3">Subjects</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory tracking-wide">科目一覧</h1>
        <div className="w-12 h-px bg-gold/40 mx-auto mt-6" />
      </div>

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
    </div>
  );
}
