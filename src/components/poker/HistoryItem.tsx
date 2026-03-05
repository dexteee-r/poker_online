type PokerAction = "Raise" | "Fold" | "Call" | "Check" | "All-In";

interface HistoryItemProps {
  player: string;
  action: PokerAction;
  amount: number | null;
}

const actionColors: Record<PokerAction, string> = {
  Fold: "text-zinc-500",
  Raise: "text-emerald-400",
  Call: "text-blue-400",
  Check: "text-zinc-400",
  "All-In": "text-amber-400",
};

export function HistoryItem({ player, action, amount }: HistoryItemProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs">
      <span className="text-zinc-300 font-medium">{player}</span>
      <div className="flex gap-3 text-right">
        <span className={`font-bold uppercase tracking-wider ${actionColors[action]}`}>
          {action}
        </span>
        {amount && <span className="font-mono text-zinc-400 w-12">${amount}</span>}
      </div>
    </div>
  );
}
