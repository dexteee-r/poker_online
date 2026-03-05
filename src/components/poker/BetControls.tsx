"use client";

import { ActionButton } from "./ActionButton";

interface BetControlsProps {
  betSize: number;
  onBetSizeChange: (value: number) => void;
  pot: number;
  heroStack: number;
  callAmount: number;
  onFold: () => void;
  onCall: () => void;
  onRaise: (amount: number) => void;
}

const BET_PRESETS = ["1/4", "1/2", "Pot", "Max"] as const;

export function BetControls({
  betSize,
  onBetSizeChange,
  pot,
  heroStack,
  callAmount,
  onFold,
  onCall,
  onRaise,
}: BetControlsProps) {
  function handlePreset(preset: (typeof BET_PRESETS)[number]) {
    switch (preset) {
      case "1/4": onBetSizeChange(Math.round(pot / 4)); break;
      case "1/2": onBetSizeChange(Math.round(pot / 2)); break;
      case "Pot": onBetSizeChange(pot); break;
      case "Max": onBetSizeChange(heroStack); break;
    }
  }

  return (
    <footer className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row gap-4 md:gap-6 z-20 pb-4 h-auto md:h-32">
      {/* Fold / Call */}
      <div className="flex w-full md:w-1/3 gap-3">
        <ActionButton variant="danger" onClick={onFold}>
          <span>Fold</span>
        </ActionButton>
        <ActionButton variant="neutral" onClick={onCall}>
          <span>Call</span>
          <span className="text-[10px] text-blue-300/70 font-mono">${callAmount}</span>
        </ActionButton>
      </div>

      {/* Bet Sizing + Raise */}
      <div className="w-full md:w-2/3 bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col md:flex-row gap-6">
        {/* Slider */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-4 md:mb-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hidden md:block">Bet Sizing</label>
            <div className="flex gap-2 w-full md:w-auto">
              {BET_PRESETS.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handlePreset(btn)}
                  className="flex-1 md:flex-none px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
          <input
            type="range"
            min={callAmount * 2}
            max={heroStack}
            step={25}
            value={betSize}
            onChange={(e) => onBetSizeChange(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer"
          />
        </div>

        {/* Raise Button */}
        <div className="w-full md:w-48 flex-shrink-0">
          <ActionButton variant="primary" onClick={() => onRaise(betSize)}>
            <span>Raise To</span>
            <span className="text-sm font-mono text-emerald-100">${betSize.toLocaleString()}</span>
          </ActionButton>
        </div>
      </div>
    </footer>
  );
}
