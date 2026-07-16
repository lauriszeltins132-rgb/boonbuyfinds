export default function AnimatedBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-gradient-to-b from-accent/[0.07] via-transparent to-transparent" />
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/[0.08] blur-3xl animate-float" />
        <div className="absolute -right-24 top-40 h-64 w-64 rounded-full bg-secondary/[0.07] blur-3xl animate-float" />
        <div className="absolute bottom-32 left-1/3 h-56 w-56 rounded-full bg-accent/[0.04] blur-3xl" />
      </div>
      <div aria-hidden className="scan-line" />
    </>
  );
}
