interface StatBarProps {
  label: string;
  value: number;
  max: number;
  colorClass: string;
}

export function StatBar({ label, value, max, colorClass }: StatBarProps) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">
        <span>{label}</span>
        <span className="text-white font-mono">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
        <div
          className={`h-full ${colorClass} shadow-[0_0_10px_currentColor]`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}
