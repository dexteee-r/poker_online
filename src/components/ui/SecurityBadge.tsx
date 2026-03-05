import { Shield } from "lucide-react";

interface SecurityBadgeProps {
  text: string;
}

export function SecurityBadge({ text }: SecurityBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-8">
      <Shield size={12} />
      <span>{text}</span>
    </div>
  );
}
