import { formatContentDate, formatContentMonthYear } from "@/lib/content-dates";

type SeoArticleReadingMetaProps = {
  publishedIso: string;
  updatedIso: string;
  readingTimeMinutes: number;
  wordCount: number;
};

export default function SeoArticleReadingMeta({
  publishedIso,
  updatedIso,
  readingTimeMinutes,
  wordCount,
}: SeoArticleReadingMetaProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
      <span>
        <span className="font-bold text-foreground">{readingTimeMinutes} min</span> read
      </span>
      <span aria-hidden="true">·</span>
      <span>{wordCount.toLocaleString()} words</span>
      <span aria-hidden="true">·</span>
      <span>
        Updated{" "}
        <time dateTime={updatedIso} className="font-semibold text-foreground">
          {formatContentMonthYear(updatedIso)}
        </time>
      </span>
      <span aria-hidden="true">·</span>
      <span>
        Published{" "}
        <time dateTime={publishedIso} className="font-semibold text-foreground">
          {formatContentDate(publishedIso)}
        </time>
      </span>
    </div>
  );
}
