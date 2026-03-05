interface PlayingCardProps {
  suit?: string;
  rank?: string;
  delay?: number;
  size?: "small" | "normal";
  hidden?: boolean;
}

export function PlayingCard({ suit, rank, delay = 0, size = "normal", hidden = false }: PlayingCardProps) {
  const isRed = suit === "\u2665" || suit === "\u2666";
  const sizeClasses =
    size === "small"
      ? "w-10 h-14 md:w-14 md:h-20 text-sm"
      : "w-16 h-24 md:w-20 md:h-28 text-lg md:text-xl";

  if (hidden) {
    return (
      <div className={`${sizeClasses} bg-zinc-800/80 backdrop-blur-md rounded-lg md:rounded-xl shadow-xl border border-white/10 relative overflow-hidden`}>
        <div
          className="absolute inset-1 border border-white/5 rounded opacity-30"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)" }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses} bg-white/95 backdrop-blur-md rounded-lg md:rounded-xl flex flex-col items-center justify-between p-1 md:p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 animate-slide-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      <span className={`self-start font-bold leading-none ${isRed ? "text-rose-600" : "text-zinc-900"}`}>{rank}</span>
      <span className={`${size === "small" ? "text-xl md:text-2xl" : "text-3xl md:text-4xl"} ${isRed ? "text-rose-600" : "text-zinc-900"}`}>{suit}</span>
      <span className={`self-end font-bold leading-none rotate-180 ${isRed ? "text-rose-600" : "text-zinc-900"}`}>{rank}</span>
    </div>
  );
}
