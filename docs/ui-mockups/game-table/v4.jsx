import React, { useState } from 'react';
import { LogOut, User, Activity, Settings, ShieldAlert } from 'lucide-react';

// ============================================================================
// --- LOGIQUE METIER & DONNEES (A séparer dans src/hooks et src/models) ---
// ============================================================================

const MOCK_STATE = {
  pot: 2450.00,
  blinds: "50/100",
  heroStack: 12500,
  callAmount: 450, // Montant à payer pour rester dans le coup
  history: [
    { id: 1, player: "Elena_P", action: "Raise", amount: 450 },
    { id: 2, player: "Micky_M", action: "Fold", amount: null },
    { id: 3, player: "Julian_01", action: "Call", amount: 450 },
  ],
  heroCards: [
    { suit: '♠', rank: 'A' },
    { suit: '♠', rank: 'J' }
  ]
};

// ============================================================================
// --- COMPOSANTS UI PURS (Dumb Components) ---
// ============================================================================

// Composant Carte "Liquid Glass"
const Card = ({ suit, rank, delay, size = "normal", hidden = false }) => {
  const isRed = suit === '♥' || suit === '♦';
  const sizeClasses = size === "small" 
    ? "w-10 h-14 md:w-14 md:h-20 text-sm" 
    : "w-16 h-24 md:w-20 md:h-28 text-lg md:text-xl";

  if (hidden) {
    return (
      <div className={`${sizeClasses} bg-zinc-800/80 backdrop-blur-md rounded-lg md:rounded-xl shadow-xl border border-white/10 relative overflow-hidden`}>
        <div className="absolute inset-1 border border-white/5 rounded opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)' }}></div>
      </div>
    );
  }
  
  return (
    <div 
      className={`${sizeClasses} bg-white/95 backdrop-blur-md rounded-lg md:rounded-xl flex flex-col items-center justify-between p-1 md:p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 animate-slide-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      <span className={`self-start font-bold leading-none ${isRed ? 'text-rose-600' : 'text-zinc-900'}`}>{rank}</span>
      <span className={`${size === 'small' ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'} ${isRed ? 'text-rose-600' : 'text-zinc-900'}`}>{suit}</span>
      <span className={`self-end font-bold leading-none rotate-180 ${isRed ? 'text-rose-600' : 'text-zinc-900'}`}>{rank}</span>
    </div>
  );
};

// Composant Siège Joueur amélioré (Hole cards incluses)
const PlayerPosition = ({ position, stack, name, isUser, active, cards }) => {
  const positionClasses = {
    "bottom": "bottom-6 left-1/2 -translate-x-1/2",
    "top-left": "top-8 left-8 md:left-24",
    "top-right": "top-8 right-8 md:right-24",
    "left": "top-1/2 left-4 md:left-8 -translate-y-1/2",
  };

  return (
    <div className={`absolute flex flex-col items-center ${positionClasses[position]} z-20`}>
      
      {/* Affichage des cartes du joueur (Hole Cards) */}
      <div className={`flex -space-x-3 md:-space-x-4 mb-2 transition-transform duration-300 z-10 ${active ? '-translate-y-2 scale-110' : ''}`}>
        {cards ? cards.map((card, i) => (
          <div key={i} className={`transform ${i === 1 ? 'rotate-6' : '-rotate-6'}`}>
            <Card suit={card.suit} rank={card.rank} size="small" />
          </div>
        )) : (
          /* Cartes adverses cachées (Folded ou actives) */
          <>
             <div className="transform -rotate-6 opacity-30"><Card hidden size="small" /></div>
             <div className="transform rotate-6 opacity-30"><Card hidden size="small" /></div>
          </>
        )}
      </div>

      {/* Info Panel Joueur */}
      <div className={`
        relative px-4 py-2 rounded-2xl backdrop-blur-xl border transition-all duration-300 min-w-[100px] text-center
        ${active ? 'bg-emerald-950/80 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'bg-zinc-900/60 border-white/5'}
        ${isUser ? 'scale-110 -translate-y-2' : ''}
      `}>
        <div className="flex items-center justify-center gap-2 mb-1">
          {isUser && <User size={12} className="text-emerald-400" />}
          <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isUser ? 'text-white' : 'text-zinc-400'}`}>
            {name}
          </span>
        </div>
        <div className="font-mono text-sm text-emerald-400">
          ${stack.toLocaleString()}
        </div>
        
        {/* Progress bar effect for active player */}
        {active && (
          <div className="absolute -bottom-px left-4 right-4 h-[2px] bg-emerald-500/20 overflow-hidden rounded-full">
            <div className="h-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-[shrink_15s_linear_forwards]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// Ligne d'historique
const HistoryItem = ({ player, action, amount }) => (
  <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs">
    <span className="text-zinc-300 font-medium">{player}</span>
    <div className="flex gap-3 text-right">
      <span className={`font-bold uppercase tracking-wider ${action === 'Fold' ? 'text-zinc-500' : action === 'Raise' ? 'text-emerald-400' : 'text-blue-400'}`}>
        {action}
      </span>
      {amount && <span className="font-mono text-zinc-400 w-12">${amount}</span>}
    </div>
  </div>
);

// Bouton d'action (modifié pour accepter un children complexe au lieu d'un simple string)
const ActionButton = ({ children, variant, onClick }) => {
  const themes = {
    danger: "border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]",
    neutral: "border-blue-500/20 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    primary: "border-emerald-500/30 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
  };

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
};

// ============================================================================
// --- COMPOSANT PRINCIPAL (Vue d'assemblage) ---
// ============================================================================

export default function PokerTable() {
  const [betSize, setBetSize] = useState(1225);

  const setBetAmount = (fraction) => {
    switch(fraction) {
      case '1/4': setBetSize(MOCK_STATE.pot / 4); break;
      case '1/2': setBetSize(MOCK_STATE.pot / 2); break;
      case 'Pot': setBetSize(MOCK_STATE.pot); break;
      case 'Max': setBetSize(MOCK_STATE.heroStack); break;
      default: break;
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-2 md:p-6 flex flex-col gap-4 md:gap-6 font-sans selection:bg-emerald-500/30 overflow-hidden relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />

      {/* Top Bar - Minimalist Stats */}
      <nav className="flex justify-between items-center max-w-[1400px] mx-auto w-full z-10">
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-baseline">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            The High Roller
          </h1>
          <div className="flex gap-4 text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900/50 px-3 py-1.5 rounded-full border border-white/5">
            <span>Blinds: {MOCK_STATE.blinds}</span>
            <span className="hidden md:inline">|</span>
            <span>Pot: <span className="text-emerald-400">${MOCK_STATE.pot.toFixed(2)}</span></span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-white/5 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 hover:border-rose-900/50 transition-all">
          <LogOut size={14} />
          <span className="hidden md:inline">Leave</span>
        </button>
      </nav>

      {/* Main Game Area */}
      <div className="relative flex-1 max-w-[1400px] mx-auto w-full flex flex-col lg:grid lg:grid-cols-12 gap-6 z-10 h-full">
        
        {/* The Table (Asymmetric Layout on Desktop, Full on Mobile) */}
        <div className="col-span-12 lg:col-span-9 relative bg-gradient-to-br from-emerald-950/40 to-zinc-950/80 rounded-[3rem] md:rounded-[4rem] border border-emerald-500/10 shadow-[inset_0_0_100px_rgba(16,185,129,0.03)] flex items-center justify-center min-h-[400px] flex-1 backdrop-blur-sm">
          
          {/* Deck & Community Cards */}
          <div className="flex gap-2 md:gap-4 z-10 -mt-8">
             <Card suit="♥" rank="A" delay={0} />
             <Card suit="♠" rank="K" delay={150} />
             <Card suit="♦" rank="7" delay={300} />
          </div>

          {/* Players Positioned */}
          <PlayerPosition position="bottom" isUser stack={MOCK_STATE.heroStack} name="You (Viper)" active cards={MOCK_STATE.heroCards} />
          <PlayerPosition position="top-left" stack={4200} name="Julian_01" />
          <PlayerPosition position="top-right" stack={8900} name="Elena_P" />
          <PlayerPosition position="left" stack={1500} name="Micky_M" />
        </div>

        {/* Action History (Visual Density High) - Hidden on mobile, visible on lg */}
        <aside className="hidden lg:flex col-span-3 flex-col gap-4 bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-white/5 p-5 shadow-2xl">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-zinc-500 mb-2 pb-2 border-b border-white/5">
            <Activity size={14} className="text-emerald-500" />
            Live Activity
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {MOCK_STATE.history.map((item) => (
              <HistoryItem key={item.id} player={item.player} action={item.action} amount={item.amount} />
            ))}
          </div>
          
          {/* Sécurité préventive - Mock */}
          <div className="mt-auto pt-4 border-t border-white/5 flex items-start gap-2 text-[10px] text-zinc-500">
            <ShieldAlert size={12} className="text-rose-500 mt-0.5 flex-shrink-0" />
            <p>End-to-End Encrypted. Backend verification active.</p>
          </div>
        </aside>
      </div>

      {/* HUD Action Bar (Liquid Glass) - UX FIX: Fusion des actions passives et aggressives */}
      <footer className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row gap-4 md:gap-6 z-20 pb-4 h-auto md:h-32">
        
        {/* Passif / Défensif (Fold, Call) */}
        <div className="flex w-full md:w-1/3 gap-3">
          <ActionButton variant="danger" onClick={() => alert('Fold')}>
            <span>Fold</span>
          </ActionButton>
          <ActionButton variant="neutral" onClick={() => alert('Call')}>
            <span>Call</span>
            <span className="text-[10px] text-blue-300/70 font-mono">${MOCK_STATE.callAmount}</span>
          </ActionButton>
        </div>
        
        {/* Agressif (Sizing + Raise combinés pour UX Poker) */}
        <div className="w-full md:w-2/3 bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col md:flex-row gap-6">
          
          {/* Slider Zone */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4 md:mb-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hidden md:block">Bet Sizing</label>
              <div className="flex gap-2 w-full md:w-auto">
                {['1/4', '1/2', 'Pot', 'Max'].map(btn => (
                  <button key={btn} onClick={() => setBetAmount(btn)} className="flex-1 md:flex-none px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
                    {btn}
                  </button>
                ))}
              </div>
            </div>
            
            <input 
              type="range" 
              min={MOCK_STATE.callAmount * 2} max={MOCK_STATE.heroStack} step="25"
              value={betSize}
              onChange={(e) => setBetSize(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer" 
            />
          </div>

          {/* Bouton Raise Dynamique (UX FIX) */}
          <div className="w-full md:w-48 flex-shrink-0">
            <ActionButton variant="primary" onClick={() => alert(`Raise to ${betSize}`)}>
              <span>Raise To</span>
              <span className="text-sm font-mono text-emerald-100">${betSize.toLocaleString()}</span>
            </ActionButton>
          </div>
          
        </div>
      </footer>

      {/* Global Styles for Animations and Scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-in {
          0% { transform: translateY(-30px) rotateY(90deg); opacity: 0; }
          100% { transform: translateY(0) rotateY(0deg); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; background-color: #f43f5e; box-shadow: 0 0 10px #f43f5e; }
        }
        
        /* Custom thin scrollbar for history */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </main>
  );
}