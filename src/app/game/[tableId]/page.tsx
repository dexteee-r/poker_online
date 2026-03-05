"use client";

import { useState } from "react";
import { LogOut, Activity, ShieldAlert } from "lucide-react";
import { PlayingCard } from "@/components/poker/PlayingCard";
import { PlayerSeat } from "@/components/poker/PlayerSeat";
import { HistoryItem } from "@/components/poker/HistoryItem";
import { BetControls } from "@/components/poker/BetControls";
import { MOCK_GAME_STATE } from "@/lib/mock-data";

export default function GameTablePage() {
  const [betSize, setBetSize] = useState(1225);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-2 md:p-6 flex flex-col gap-4 md:gap-6 font-sans selection:bg-emerald-500/30 overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />

      {/* Top Bar */}
      <nav className="flex justify-between items-center max-w-[1400px] mx-auto w-full z-10">
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-baseline">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            The High Roller
          </h1>
          <div className="flex gap-4 text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900/50 px-3 py-1.5 rounded-full border border-white/5">
            <span>Blinds: {MOCK_GAME_STATE.blinds}</span>
            <span className="hidden md:inline">|</span>
            <span>Pot: <span className="text-emerald-400">${MOCK_GAME_STATE.pot.toFixed(2)}</span></span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-white/5 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 hover:border-rose-900/50 transition-all">
          <LogOut size={14} />
          <span className="hidden md:inline">Leave</span>
        </button>
      </nav>

      {/* Main Game Area */}
      <div className="relative flex-1 max-w-[1400px] mx-auto w-full flex flex-col lg:grid lg:grid-cols-12 gap-6 z-10 h-full">
        {/* The Table */}
        <div className="col-span-12 lg:col-span-9 relative bg-gradient-to-br from-emerald-950/40 to-zinc-950/80 rounded-[3rem] md:rounded-[4rem] border border-emerald-500/10 shadow-[inset_0_0_100px_rgba(16,185,129,0.03)] flex items-center justify-center min-h-[400px] flex-1 backdrop-blur-sm">
          {/* Community Cards */}
          <div className="flex gap-2 md:gap-4 z-10 -mt-8">
            <PlayingCard suit={"\u2665"} rank="A" delay={0} />
            <PlayingCard suit={"\u2660"} rank="K" delay={150} />
            <PlayingCard suit={"\u2666"} rank="7" delay={300} />
          </div>

          {/* Players */}
          <PlayerSeat position="bottom" isUser stack={MOCK_GAME_STATE.heroStack} name="You (Viper)" active cards={MOCK_GAME_STATE.heroCards} />
          <PlayerSeat position="top-left" stack={4200} name="Julian_01" />
          <PlayerSeat position="top-right" stack={8900} name="Elena_P" />
          <PlayerSeat position="left" stack={1500} name="Micky_M" />
        </div>

        {/* History Sidebar */}
        <aside className="hidden lg:flex col-span-3 flex-col gap-4 bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-white/5 p-5 shadow-2xl">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-zinc-500 mb-2 pb-2 border-b border-white/5">
            <Activity size={14} className="text-emerald-500" />
            Live Activity
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {MOCK_GAME_STATE.history.map((item) => (
              <HistoryItem key={item.id} player={item.player} action={item.action} amount={item.amount} />
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-white/5 flex items-start gap-2 text-[10px] text-zinc-500">
            <ShieldAlert size={12} className="text-rose-500 mt-0.5 flex-shrink-0" />
            <p>End-to-End Encrypted. Backend verification active.</p>
          </div>
        </aside>
      </div>

      {/* Action Bar */}
      <BetControls
        betSize={betSize}
        onBetSizeChange={setBetSize}
        pot={MOCK_GAME_STATE.pot}
        heroStack={MOCK_GAME_STATE.heroStack}
        callAmount={MOCK_GAME_STATE.callAmount}
        onFold={() => console.log("Fold")}
        onCall={() => console.log("Call")}
        onRaise={(amount) => console.log("Raise to", amount)}
      />
    </main>
  );
}
