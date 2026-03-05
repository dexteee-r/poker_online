"use client";

import type { LucideIcon } from "lucide-react";

interface NavPillProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

export function NavPill({ icon: Icon, label, active, onClick }: NavPillProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
        active
          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
      }`}
    >
      <Icon size={16} />
      <span className="hidden md:block">{label}</span>
    </button>
  );
}
