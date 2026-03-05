import { User } from "lucide-react";
import { PlayingCard } from "./PlayingCard";

type SeatPosition = "bottom" | "top-left" | "top-right" | "left";

interface PlayerSeatProps {
  position: SeatPosition;
  stack: number;
  name: string;
  isUser?: boolean;
  active?: boolean;
  cards?: { suit: string; rank: string }[];
}

const positionClasses: Record<SeatPosition, string> = {
  bottom: "bottom-6 left-1/2 -translate-x-1/2",
  "top-left": "top-8 left-8 md:left-24",
  "top-right": "top-8 right-8 md:right-24",
  left: "top-1/2 left-4 md:left-8 -translate-y-1/2",
};

export function PlayerSeat({ position, stack, name, isUser = false, active = false, cards }: PlayerSeatProps) {
  return (
    <div className={`absolute flex flex-col items-center ${positionClasses[position]} z-20`}>
      {/* Hole Cards */}
      <div className={`flex -space-x-3 md:-space-x-4 mb-2 transition-transform duration-300 z-10 ${active ? "-translate-y-2 scale-110" : ""}`}>
        {cards ? (
          cards.map((card, i) => (
            <div key={i} className={`transform ${i === 1 ? "rotate-6" : "-rotate-6"}`}>
              <PlayingCard suit={card.suit} rank={card.rank} size="small" />
            </div>
          ))
        ) : (
          <>
            <div className="transform -rotate-6 opacity-30"><PlayingCard hidden size="small" /></div>
            <div className="transform rotate-6 opacity-30"><PlayingCard hidden size="small" /></div>
          </>
        )}
      </div>

      {/* Player Info Panel */}
      <div className={`
        relative px-4 py-2 rounded-2xl backdrop-blur-xl border transition-all duration-300 min-w-[100px] text-center
        ${active ? "bg-emerald-950/80 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]" : "bg-zinc-900/60 border-white/5"}
        ${isUser ? "scale-110 -translate-y-2" : ""}
      `}>
        <div className="flex items-center justify-center gap-2 mb-1">
          {isUser && <User size={12} className="text-emerald-400" />}
          <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isUser ? "text-white" : "text-zinc-400"}`}>
            {name}
          </span>
        </div>
        <div className="font-mono text-sm text-emerald-400">
          ${stack.toLocaleString()}
        </div>

        {/* Timer progress bar */}
        {active && (
          <div className="absolute -bottom-px left-4 right-4 h-[2px] bg-emerald-500/20 overflow-hidden rounded-full">
            <div className="h-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-shrink" />
          </div>
        )}
      </div>
    </div>
  );
}
