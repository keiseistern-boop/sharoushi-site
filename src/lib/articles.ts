import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  subject: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

export function getArticlesBySubject(subjectSlug: string): ArticleMeta[] {
  const subjectDir = path.join(contentDir, subjectSlug);

  if (!fs.existsSync(subjectDir)) {
    return [];
  }

  const files = fs.readdirSync(subjectDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const filePath = path.join(subjectDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(".md", ""),
        title: data.title || filename.replace(".md", ""),
        description: data.description || "",
        order: data.order || 0,
        subject: subjectSlug,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getArticle(subjectSlug: string, articleSlug: string): Article | null {
  const filePath = path.join(contentDir, subjectSlug, `${articleSlug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: articleSlug,
    title: data.title || articleSlug,
    description: data.description || "",
    order: data.order || 0,
    subject: subjectSlug,
    content,
  };
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const subjectDirs = fs.readdirSync(contentDir).filter((f) => {
    return fs.statSync(path.join(contentDir, f)).isDirectory();
  });

  return subjectDirs.flatMap((dir) => getArticlesBySubject(dir));
}
