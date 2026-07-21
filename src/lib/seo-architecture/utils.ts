import type { StaticPageSection } from "@/lib/static-pages";

export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function countArticleWords(
  intro: string,
  sections: StaticPageSection[],
  faqs: { question: string; answer: string }[]
): number {
  let total = countWords(intro);
  for (const section of sections) {
    total += countWords(section.heading);
    for (const paragraph of section.paragraphs) {
      total += countWords(paragraph);
    }
  }
  for (const faq of faqs) {
    total += countWords(faq.question) + countWords(faq.answer);
  }
  return total;
}

export function estimateReadingTimeMinutes(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 220));
}

export type TocEntry = {
  id: string;
  label: string;
  level: 2 | 3;
};

export function buildTableOfContents(sections: StaticPageSection[]): TocEntry[] {
  return sections.map((section) => ({
    id: slugifyHeading(section.heading),
    label: section.heading,
    level: section.level ?? 2,
  }));
}
