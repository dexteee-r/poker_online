import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group">
      <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-colors text-zinc-300 group-hover:text-emerald-400 shadow-inner">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed max-w-[280px]">{description}</p>
    </div>
  );
}
