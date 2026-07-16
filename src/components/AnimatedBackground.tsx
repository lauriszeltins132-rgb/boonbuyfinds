export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Warm BoonBuy-inspired washes — peach hero glow + soft turquoise accents */}
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-gradient-to-b from-[#ffe0b8]/70 via-[#fff5ea]/40 to-transparent" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-accent/[0.12] blur-3xl animate-float" />
      <div className="absolute -right-20 top-40 h-64 w-64 rounded-full bg-secondary/[0.14] blur-3xl animate-float" />
      <div className="absolute bottom-24 left-1/3 h-56 w-56 rounded-full bg-accent/[0.06] blur-3xl" />
    </div>
  );
}
