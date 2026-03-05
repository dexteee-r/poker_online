import React, { useState } from 'react';
import { MessageCircle, Settings, Menu, Coins, ShieldAlert } from 'lucide-react';

// ============================================================================
// --- 1. ETAT ET DONNEES (A séparer dans /models ou /hooks plus tard) ---
// ============================================================================

const INITIAL_GAME_STATE = {
  pot: 2450,
  currentTurnId: 'player-1',
  dealerId: 'player-4',
  communityCards: [
    { rank: 'A', suit: 'spades', color: 'black' },
    { rank: 'K', suit: 'hearts', color: 'red' },
    { rank: '7', suit: 'diamonds', color: 'red' },
    { rank: '2', suit: 'clubs', color: 'black' },
    null 
  ],
  players: [
    { id: 'player-1', name: 'Hero', chips: 15000, currentBet: 0, status: 'active', isHero: true, cards: [{ rank: 'J', suit: 'spades', color: 'black' }, { rank: 'Q', suit: 'spades', color: 'black' }] },
    { id: 'player-2', name: 'Phil Ivey', chips: 4200, currentBet: 0, status: 'folded', isHero: false, cards: [null, null] },
    { id: 'player-3', name: 'DNegs', chips: 8900, currentBet: 500, status: 'active', isHero: false, cards: [null, null] },
    { id: 'player-4', name: 'TomDwan', chips: 31000, currentBet: 500, status: 'active', isHero: false, cards: [null, null] },
    { id: 'player-5', name: 'Isildur1', chips: 0, currentBet: 1200, status: 'all-in', isHero: false, cards: [{ rank: '9', suit: 'hearts', color: 'red' }, { rank: '9', suit: 'clubs', color: 'black' }] },
    { id: 'player-6', name: 'Elky', chips: 12400, currentBet: 0, status: 'active', isHero: false, cards: [null, null] },
  ]
};

// ============================================================================
// --- 2. COMPOSANTS UI : LA TABLE ET LES JOUEURS ---
// ============================================================================

const PlayingCard = ({ card, hidden = false, className = "" }) => {
  if (hidden || !card) {
    return (
      <div className={`w-12 h-16 md:w-14 md:h-20 rounded-lg shadow-xl flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600/50 ${className} relative overflow-hidden`}>
        {/* Motif subtil au dos de la carte */}
        <div className="absolute inset-1 border border-slate-600/30 rounded opacity-50 back-pattern-modern"></div>
      </div>
    );
  }

  const getSuitSymbol = (suit) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  return (
    <div className={`w-12 h-16 md:w-14 md:h-20 bg-white rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex flex-col justify-between p-1.5 ${card.color === 'red' ? 'text-rose-600' : 'text-slate-800'} ${className} transform transition-transform hover:-translate-y-2`}>
      <div className="text-xs font-bold leading-none">{card.rank}</div>
      <div className="text-2xl self-center leading-none opacity-90">{getSuitSymbol(card.suit)}</div>
      <div className="text-xs font-bold leading-none self-end rotate-180">{card.rank}</div>
    </div>
  );
};

const PlayerSeat = ({ player, isCurrentTurn, isDealer, positionClass }) => {
  const isFolded = player.status === 'folded';
  const isActive = isCurrentTurn && !isFolded;

  return (
    <div className={`absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 ${positionClass} transition-all duration-500`}>
      
      {/* Mise du joueur */}
      {player.currentBet > 0 && (
        <div className="absolute top-[110%] flex items-center bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-white/5 shadow-lg z-10">
          <Coins size={12} className="mr-1.5 opacity-70" /> {player.currentBet}
        </div>
      )}

      {/* Bouton Dealer moderne */}
      {isDealer && (
        <div className="absolute -right-3 -top-3 w-6 h-6 bg-white text-slate-900 font-black text-[10px] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20">
          D
        </div>
      )}

      {/* Cartes avec animation de focus */}
      <div className={`flex -space-x-5 mb-3 transition-all duration-300 z-10 ${isFolded ? 'opacity-20 grayscale' : ''} ${isActive ? '-translate-y-3 scale-110' : ''}`}>
        {player.cards.map((card, idx) => (
          <PlayingCard 
            key={idx} 
            card={card} 
            hidden={!player.isHero && player.status !== 'all-in'} 
            className={`${idx === 1 ? 'rotate-6' : '-rotate-6'}`} 
          />
        ))}
      </div>

      {/* Panneau d'information du joueur (Glassmorphism) */}
      <div className={`
        relative min-w-[110px] rounded-xl p-2 text-center backdrop-blur-md transition-all duration-300
        ${isActive ? 'bg-slate-800/80 border border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'bg-slate-900/60 border border-white/5'}
        ${isFolded ? 'opacity-40' : ''}
      `}>
        <div className="text-slate-200 text-xs font-medium truncate max-w-[90px] mx-auto tracking-wide">{player.name}</div>
        <div className="text-emerald-400/90 text-sm font-light tracking-wider mt-0.5">${player.chips.toLocaleString()}</div>
        
        {player.status !== 'active' && (
          <div className="absolute inset-0 bg-slate-950/70 rounded-xl flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-rose-400 font-bold text-[10px] uppercase tracking-widest">{player.status}</span>
          </div>
        )}

        {/* Halo de temps de réflexion épuré */}
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-slate-700/50 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-400 animate-[shrink_15s_linear_forwards] shadow-[0_0_5px_#34d399]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// --- 3. COMPOSANT PRINCIPAL : L'APPLICATION ---
// ============================================================================

export default function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [betSize, setBetSize] = useState(500);

  // Positionnement affiné pour une table plus allongée
  const seatPositions = [
    "bottom-[-5%] left-1/2",      
    "bottom-[15%] left-[5%]",   
    "top-[15%] left-[10%]",      
    "top-[-5%] left-1/2",         
    "top-[15%] right-[10%]",     
    "bottom-[15%] right-[5%]",  
  ];

  const handleAction = (actionType) => {
    alert(`Action: ${actionType} ${actionType === 'RAISE' ? betSize : ''}`);
  };

  return (
    <div className="relative min-h-screen bg-[#050914] flex flex-col font-sans overflow-hidden text-slate-200 selection:bg-emerald-500/30">
      
      {/* Background glow effects for ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar ultra-minimaliste */}
      <header className="h-16 flex items-center justify-between px-6 z-50">
        <div className="flex items-center space-x-6">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><Menu size={18} className="text-slate-400" /></button>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">
            Nolimit <span className="text-emerald-400 font-light">Hold'em</span>
          </div>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md text-[10px] font-mono text-emerald-300 tracking-widest uppercase shadow-sm">
          Blinds: 50 / 100
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><MessageCircle size={18} className="text-slate-400" /></button>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><Settings size={18} className="text-slate-400" /></button>
        </div>
      </header>

      {/* Espace de jeu central */}
      <main className="flex-1 relative flex items-center justify-center p-4">
        
        {/* La Table - Design Neo-brutalisme / Glass */}
        <div className="relative w-full max-w-5xl aspect-[2.4/1] rounded-[200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f2e26] to-[#071310] border-2 border-[#1a4a3e]/50 shadow-[0_20px_100px_rgba(5,20,15,0.8),inset_0_0_80px_rgba(0,0,0,0.6)] flex items-center justify-center">
          
          {/* Ligne de délimitation interne subtile */}
          <div className="absolute inset-6 md:inset-10 border border-[#235e4f]/30 rounded-[180px] pointer-events-none"></div>

          {/* Zone du Board */}
          <div className="flex flex-col items-center z-10 -mt-8">
            {/* Affichage du Pot minimaliste */}
            <div className="mb-6 flex flex-col items-center">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Total Pot</span>
              <span className="text-white text-2xl font-light tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                ${gameState.pot.toLocaleString()}
              </span>
            </div>

            {/* Cartes Communes */}
            <div className="flex space-x-3">
              {gameState.communityCards.map((card, idx) => (
                <PlayingCard key={idx} card={card} className={card ? 'animate-fade-in-up' : 'opacity-20'} />
              ))}
            </div>
          </div>

          {/* Rendu des joueurs */}
          {gameState.players.map((player, idx) => (
            <PlayerSeat 
              key={player.id}
              player={player}
              isCurrentTurn={gameState.currentTurnId === player.id}
              isDealer={gameState.dealerId === player.id}
              positionClass={seatPositions[idx]}
            />
          ))}
        </div>
      </main>

      {/* --- 4. PANNEAU D'ACTION FLOTTANT (Hero) --- */}
      {gameState.currentTurnId === 'player-1' && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 max-w-3xl bg-[#0b1221]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center gap-6 z-50 animate-slide-up">
          
          {/* Section Slider épurée */}
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <div className="flex justify-between items-end px-1">
              <span className="text-slate-500 text-[10px] uppercase tracking-widest">Raise Amount</span>
              <span className="text-emerald-400 text-xl font-light">${betSize}</span>
            </div>
            
            <input 
              type="range" 
              min="100" max="15000" step="50"
              value={betSize}
              onChange={(e) => setBetSize(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer slider-custom"
            />
            
            <div className="flex gap-2">
              {['1/2 Pot', 'Pot', 'All-in'].map((label, i) => {
                const val = i === 0 ? gameState.pot / 2 : i === 1 ? gameState.pot : 15000;
                return (
                  <button key={label} onClick={() => setBetSize(val)} className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[10px] uppercase tracking-wider transition-all border border-transparent hover:border-white/10">
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Section Boutons d'Action */}
          <div className="flex w-full md:w-1/2 gap-3 h-full">
            <button onClick={() => handleAction('FOLD')} className="flex-1 rounded-2xl bg-slate-800/50 hover:bg-slate-700 border border-white/5 text-slate-300 text-sm font-semibold uppercase tracking-widest transition-all hover:shadow-lg active:scale-95">
              Fold
            </button>
            <button onClick={() => handleAction('CALL')} className="flex-1 rounded-2xl bg-indigo-600/80 hover:bg-indigo-500 border border-indigo-500/50 text-white flex flex-col items-center justify-center transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] active:scale-95">
              <span className="text-sm font-semibold uppercase tracking-widest">Call</span>
              <span className="text-[10px] text-indigo-200 mt-0.5">$500</span>
            </button>
            <button onClick={() => handleAction('RAISE')} className="flex-1 rounded-2xl bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-500/50 text-white flex flex-col items-center justify-center transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-95">
              <span className="text-sm font-semibold uppercase tracking-widest">Raise</span>
              <span className="text-[10px] text-emerald-200 mt-0.5">${betSize}</span>
            </button>
          </div>
        </div>
      )}

      {/* --- CSS PERSONNALISE (Animations & Inputs) --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shrink { from { width: 100%; } to { width: 0%; background-color: #f43f5e; box-shadow: 0 0 10px #f43f5e; } }
        @keyframes slide-up { from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
        @keyframes fade-in-up { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        
        .back-pattern-modern {
          background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px);
        }

        /* Styling the range input thumb */
        .slider-custom::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 16px; h: 16px; border-radius: 50%; background: #34d399;
          box-shadow: 0 0 10px rgba(52, 211, 153, 0.8); cursor: pointer; border: 2px solid #fff;
        }
      `}} />
    </div>
  );
}