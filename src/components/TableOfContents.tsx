import type { TocEntry } from "@/lib/seo-architecture/utils";

type TableOfContentsProps = {
  entries: TocEntry[];
  title?: string;
};

export default function TableOfContents({
  entries,
  title = "On this page",
}: TableOfContentsProps) {
  if (entries.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-border bg-surface/35 p-5 sm:p-6"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
        {title}
      </p>
      <ol className="mt-4 space-y-2 text-sm">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={entry.level === 3 ? "ml-4" : undefined}
          >
            <a
              href={`#${entry.id}`}
              className="font-semibold text-foreground hover:text-accent"
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
