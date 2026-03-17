export interface Subject {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: "labor" | "social-insurance";
  order: number;
}

export const subjects: Subject[] = [
  {
    slug: "labor-standards",
    name: "労働基準法",
    shortName: "労基法",
    description: "労働条件の最低基準を定めた法律。労働契約、賃金、労働時間、休日・休暇、解雇などの基本ルールを学ぶ。",
    category: "labor",
    order: 1,
  },
  {
    slug: "industrial-safety",
    name: "労働安全衛生法",
    shortName: "安衛法",
    description: "職場の安全と労働者の健康を確保するための法律。安全衛生管理体制、健康診断、ストレスチェックなどを学ぶ。",
    category: "labor",
    order: 2,
  },
  {
    slug: "workers-accident",
    name: "労働者災害補償保険法",
    shortName: "労災保険法",
    description: "業務上の災害や通勤災害に対する保険給付を定めた法律。療養・休業・障害・遺族給付などを学ぶ。",
    category: "labor",
    order: 3,
  },
  {
    slug: "employment-insurance",
    name: "雇用保険法",
    shortName: "雇用保険法",
    description: "失業時の給付や雇用継続給付を定めた法律。基本手当、育児休業給付、教育訓練給付などを学ぶ。",
    category: "labor",
    order: 4,
  },
  {
    slug: "labor-insurance-collection",
    name: "労働保険徴収法",
    shortName: "徴収法",
    description: "労災保険と雇用保険の保険料の申告・納付に関する法律。年度更新、概算・確定保険料などを学ぶ。",
    category: "labor",
    order: 5,
  },
  {
    slug: "health-insurance",
    name: "健康保険法",
    shortName: "健保法",
    description: "被用者とその被扶養者の病気・けが・出産・死亡に対する保険給付を定めた法律。",
    category: "social-insurance",
    order: 6,
  },
  {
    slug: "national-pension",
    name: "国民年金法",
    shortName: "国年法",
    description: "全国民共通の基礎年金制度を定めた法律。老齢・障害・遺族基礎年金、被保険者の種別などを学ぶ。",
    category: "social-insurance",
    order: 7,
  },
  {
    slug: "employees-pension",
    name: "厚生年金保険法",
    shortName: "厚年法",
    description: "被用者を対象とした年金制度。老齢・障害・遺族厚生年金の受給要件や計算方法を学ぶ。",
    category: "social-insurance",
    order: 8,
  },
  {
    slug: "social-insurance-general",
    name: "社会保険に関する一般常識",
    shortName: "社一",
    description: "介護保険法、国民健康保険法、児童手当法、社会保険審査官法など関連法令の概要を学ぶ。",
    category: "social-insurance",
    order: 9,
  },
  {
    slug: "labor-general",
    name: "労務管理その他の労働に関する一般常識",
    shortName: "労一",
    description: "労働契約法、労働組合法、男女雇用機会均等法、育児介護休業法など関連法令と労務管理を学ぶ。",
    category: "labor",
    order: 10,
  },
];

export function getSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getSubjectsByCategory(category: "labor" | "social-insurance"): Subject[] {
  return subjects.filter((s) => s.category === category).sort((a, b) => a.order - b.order);
}
