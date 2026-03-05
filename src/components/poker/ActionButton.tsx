"use client";

type ActionVariant = "danger" | "neutral" | "primary";

interface ActionButtonProps {
  children: React.ReactNode;
  variant: ActionVariant;
  onClick?: () => void;
}

const themes: Record<ActionVariant, string> = {
  danger: "border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  neutral: "border-blue-500/20 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
  primary: "border-emerald-500/30 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
};

export function ActionButton({ children, variant, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 px-4 md:px-8 py-4 rounded-2xl border font-bold uppercase tracking-widest text-xs md:text-sm
        transition-all duration-200 active:scale-95 flex flex-col items-center justify-center leading-tight gap-1
        ${themes[variant]}
      `}
    >
      {children}
    </button>
  );
}
