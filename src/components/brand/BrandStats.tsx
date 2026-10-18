import type { BrandPageRails } from "@/lib/brand-page-rails";

type BrandStatsProps = {
  brandName: string;
  rails: BrandPageRails;
};

export default function BrandStats({ brandName, rails }: BrandStatsProps) {
  const { stats } = rails;
  const items: { label: string; value: string }[] = [
    { label: "Indexed", value: stats.totalIndexed.toLocaleString() },
    {
      label: "With QC",
      value: `${stats.qcCount.toLocaleString()} (${stats.qcPercent}%)`,
    },
  ];
  if (stats.medianPrice != null) {
    items.push({
      label: "Median price",
      value: `$${Math.round(stats.medianPrice)}`,
    });
  }
  for (const row of [
    { label: "Recently added", value: String(stats.recentlyAddedCount) },
    { label: "Trending", value: String(stats.trendingCount) },
    { label: "Under $50", value: String(stats.budgetCount) },
  ]) {
    if (row.value !== "0") items.push(row);
  }

  return (
    <section className="px-4 pb-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-foreground">
          {stats.totalIndexed.toLocaleString()} {brandName} finds indexed
          {stats.qcCount > 0
            ? ` · ${stats.qcCount.toLocaleString()} with QC (${stats.qcPercent}%)`
            : ""}
          {stats.medianPrice != null
            ? ` · median ~$${Math.round(stats.medianPrice)}`
            : ""}
        </p>
        {items.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {items.map((item) => (
              <li
                key={item.label}
                className="rounded-full border border-border bg-surface/40 px-3 py-1 text-xs font-bold text-muted"
              >
                {item.label}{" "}
                <span className="text-accent">({item.value})</span>
              </li>
            ))}
          </ul>
        ) : null}
        {rails.relatedCategories.length > 0 ? (
          <p className="mt-3 text-xs text-muted">
            Strongest lanes:{" "}
            {rails.relatedCategories
              .slice(0, 4)
              .map((c) => `${c.name} (${c.count})`)
              .join(" · ")}
          </p>
        ) : null}
      </div>
    </section>
  );
}
