import Link from "next/link";
import { getRelatedSearches } from "@/lib/related-searches";

type RelatedSearchesProps = {
  title?: string;
  limit?: number;
};

/** Crawlable related-search links — no client state required. */
export default function RelatedSearches({
  title = "Related searches",
  limit = 14,
}: RelatedSearchesProps) {
  const links = getRelatedSearches(limit);

  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-muted">
          {title}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground/80 hover:border-accent/40 hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
