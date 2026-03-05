"use client";

import type { LucideIcon } from "lucide-react";

interface GlassInputProps {
  icon: LucideIcon;
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
}

export function GlassInput({ icon: Icon, type, placeholder, name, required }: GlassInputProps) {
  return (
    <div className="relative group mb-4">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
        <Icon size={18} />
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900/80 transition-all placeholder-zinc-600 shadow-inner"
      />
    </div>
  );
}
