interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "danger";
}

export function GlassCard({ children, className = "", variant = "default" }: GlassCardProps) {
  const hoverBorder = variant === "danger" ? "hover:border-rose-500/30" : "hover:border-white/10";

  return (
    <div className={`bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 relative overflow-hidden transition-colors ${hoverBorder} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </div>
  );
}
