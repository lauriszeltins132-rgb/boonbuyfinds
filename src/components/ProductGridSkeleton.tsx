type ProductGridSkeletonProps = {
  count?: number;
};

export default function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="product-grid-skeleton" aria-hidden>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-border bg-panel"
        >
          <div className="skeleton product-card-skeleton__image" />
          <div className="p-3">
            <div className="skeleton product-card-skeleton__line" />
            <div className="skeleton product-card-skeleton__line product-card-skeleton__line--short" />
          </div>
        </div>
      ))}
    </div>
  );
}
