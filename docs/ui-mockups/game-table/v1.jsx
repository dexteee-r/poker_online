import React, { useState, useEffect } from 'react';
import { MessageCircle, Settings, Menu, Coins } from 'lucide-react';

// ============================================================================
// --- LOGIQUE METIER ET DONNEES (A séparer dans /models ou /hooks plus tard) ---
// ============================================================================

// Mock de l'état du jeu venant théoriquement d'un WebSocket
const INITIAL_GAME_STATE = {
  pot: 2450,
  currentTurnId: 'player-1', // C'est le tour du Hero
  dealerId: 'player-4',
  communityCards: [
    { rank: 'A', suit: 'spades', color: 'black' },
    { rank: 'K', suit: 'hearts', color: 'red' },
    { rank: '7', suit: 'diamonds', color: 'red' },
    { rank: '2', suit: 'clubs', color: 'black' },
    // River is null (not dealt yet)
    null 
  ],
  players: [
    { id: 'player-1', name: 'Hero (Toi)', chips: 15000, currentBet: 0, status: 'active', isHero: true, cards: [{ rank: 'J', suit: 'spades', color: 'black' }, { rank: 'Q', suit: 'spades', color: 'black' }] },
    { id: 'player-2', name: 'Phil Ivey', chips: 4200, currentBet: 0, status: 'folded', isHero: false, cards: [null, null] },
    { id: 'player-3', name: 'DNegs', chips: 8900, currentBet: 500, status: 'active', isHero: false, cards: [null, null] },
    { id: 'player-4', name: 'TomDwan', chips: 31000, currentBet: 500, status: 'active', isHero: false, cards: [null, null] },
    { id: 'player-5', name: 'Isildur1', chips: 0, currentBet: 1200, status: 'all-in', isHero: false, cards: [{ rank: '9', suit: 'hearts', color: 'red' }, { rank: '9', suit: 'clubs', color: 'black' }] }, // All-in show cards
    { id: 'player-6', name: 'Elky', chips: 12400, currentBet: 0, status: 'active', isHero: false, cards: [null, null] },
  ]
};

// ============================================================================
// --- COMPOSANTS UI (A séparer dans /components plus tard) ---
// ============================================================================

// Composant pour afficher une carte à jouer
const PlayingCard = ({ card, hidden = false, className = "" }) => {
  if (hidden || !card) {
    return (
      <div className={`w-12 h-16 md:w-16 md:h-24 bg-blue-800 rounded-md border-2 border-white/20 shadow-md flex items-center justify-center back-pattern ${className}`}>
        <div className="w-8 h-12 border border-blue-600/50 rounded-sm"></div>
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
    <div className={`w-12 h-16 md:w-16 md:h-24 bg-white rounded-md border border-gray-300 shadow-sm flex flex-col justify-between p-1 md:p-2 ${card.color === 'red' ? 'text-red-600' : 'text-slate-900'} ${className}`}>
      <div className="text-xs md:text-sm font-bold leading-none">{card.rank}</div>
      <div className="text-xl md:text-3xl self-center leading-none">{getSuitSymbol(card.suit)}</div>
      <div className="text-xs md:text-sm font-bold leading-none self-end rotate-180">{card.rank}</div>
    </div>
  );
};

// Composant pour le siège d'un joueur
const PlayerSeat = ({ player, isCurrentTurn, isDealer, positionClass }) => {
  const isFolded = player.status === 'folded';
  const isActive = isCurrentTurn && !isFolded;

  return (
    <div className={`absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 ${positionClass}`}>
      
      {/* Jetons misés par le joueur (devant lui) */}
      {player.currentBet > 0 && (
        <div className="absolute top-full mt-4 md:mt-8 flex items-center bg-black/60 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full border border-yellow-600/50 z-10">
          <Coins size={12} className="mr-1" /> {player.currentBet}
        </div>
      )}

      {/* Bouton Dealer */}
      {isDealer && (
        <div className="absolute -right-4 -top-2 w-6 h-6 bg-white text-black font-bold text-xs rounded-full flex items-center justify-center border-2 border-gray-300 shadow-lg z-20">
          D
        </div>
      )}

      {/* Cartes du joueur */}
      <div className={`flex -space-x-4 mb-2 ${isFolded ? 'opacity-30' : ''} ${isActive ? '-translate-y-2 transition-transform' : ''}`}>
        {player.cards.map((card, idx) => (
          <PlayingCard 
            key={idx} 
            card={card} 
            hidden={!player.isHero && player.status !== 'all-in'} 
            className={idx === 1 ? 'rotate-6' : '-rotate-6'} 
          />
        ))}
      </div>

      {/* Info Box du joueur */}
      <div className={`
        min-w-[100px] bg-gray-900/90 rounded-lg p-2 text-center border-2 shadow-xl
        ${isActive ? 'border-yellow-400 shadow-yellow-400/20' : 'border-gray-700'}
        ${isFolded ? 'opacity-50' : ''}
      `}>
        <div className="text-white text-xs font-bold truncate max-w-[90px] mx-auto">{player.name}</div>
        <div className="text-green-400 text-sm font-mono mt-1">${player.chips.toLocaleString()}</div>
        
        {/* Status indicator (Folded, All-in, etc) */}
        {player.status !== 'active' && (
          <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
            <span className="text-red-500 font-bold text-xs uppercase tracking-wider">{player.status}</span>
          </div>
        )}
      </div>

      {/* Barre de temps (simulée) */}
      {isActive && (
        <div className="w-full h-1 bg-gray-700 mt-1 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400 animate-[shrink_15s_linear_forwards]"></div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// --- COMPOSANT PRINCIPAL (L'Application / La Table) ---
// ============================================================================

export default function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [betSize, setBetSize] = useState(500);

  // Positions des 6 joueurs autour d'une table ovale (en pourcentage de positionnement absolu)
  const seatPositions = [
    "bottom-[5%] left-1/2",      // Seat 1 (Hero - en bas au centre)
    "bottom-[20%] left-[10%]",   // Seat 2 (En bas à gauche)
    "top-[20%] left-[15%]",      // Seat 3 (En haut à gauche)
    "top-[5%] left-1/2",         // Seat 4 (En haut au centre)
    "top-[20%] right-[15%]",     // Seat 5 (En haut à droite)
    "bottom-[20%] right-[10%]",  // Seat 6 (En bas à droite)
  ];

  const handleAction = (actionType) => {
    // Ceci est un mock. Dans la réalité, on enverrait l'action via WebSocket au serveur.
    alert(`Action envoyée au serveur : ${actionType} ${actionType === 'RAISE' ? betSize : ''}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans overflow-hidden">
      
      {/* Header / Navbar */}
      <header className="h-14 bg-slate-950 flex items-center justify-between px-4 md:px-6 border-b border-slate-800 text-slate-300">
        <div className="flex items-center space-x-4">
          <Menu className="cursor-pointer hover:text-white" size={20} />
          <h1 className="text-lg font-bold text-white tracking-widest uppercase">Hold'em <span className="text-green-500">Pro</span></h1>
        </div>
        <div className="text-sm font-mono bg-slate-800 px-3 py-1 rounded text-green-400">
          Blinds: 50/100
        </div>
        <div className="flex items-center space-x-4">
          <MessageCircle className="cursor-pointer hover:text-white" size={20} />
          <Settings className="cursor-pointer hover:text-white" size={20} />
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 relative flex items-center justify-center p-4 md:p-12">
        
        {/* La Table de Poker (Ovale) */}
        <div className="relative w-full max-w-5xl aspect-[2/1] md:aspect-[2.2/1] bg-green-800 rounded-[200px] border-[12px] md:border-[24px] border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.5),0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
          
          {/* Ligne intérieure de la table */}
          <div className="absolute inset-4 md:inset-8 border border-green-600/30 rounded-[180px] pointer-events-none"></div>

          {/* Logo / Marque sur le tapis */}
          <div className="absolute top-1/4 opacity-10 text-4xl md:text-6xl font-black text-white pointer-events-none select-none tracking-widest uppercase">
            Texas Hold'em
          </div>

          {/* Zone Centrale (Cartes Communes & Pot) */}
          <div className="flex flex-col items-center z-10">
            {/* Le Pot */}
            <div className="mb-4 bg-black/50 px-6 py-2 rounded-full border border-green-900 shadow-inner flex items-center space-x-2">
              <span className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider">Pot</span>
              <span className="text-yellow-400 font-mono text-lg md:text-xl font-bold">${gameState.pot.toLocaleString()}</span>
            </div>

            {/* Board (Cartes Communes) */}
            <div className="flex space-x-2 md:space-x-4">
              {gameState.communityCards.map((card, idx) => (
                <PlayingCard key={idx} card={card} />
              ))}
            </div>
          </div>

          {/* Placement des joueurs */}
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

      {/* Zone de Contrôle du Joueur (Hero Actions) */}
      {gameState.currentTurnId === 'player-1' && (
        <div className="h-auto bg-slate-950 border-t border-slate-800 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50">
          
          {/* Slider de mise */}
          <div className="w-full md:w-1/3 flex flex-col space-y-2">
            <div className="flex justify-between text-slate-400 text-xs font-bold">
              <span>Min: 100</span>
              <span className="text-yellow-400 text-base font-mono">${betSize}</span>
              <span>Max: All-in</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="15000" 
              step="50"
              value={betSize}
              onChange={(e) => setBetSize(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between gap-2 mt-2">
              <button onClick={() => setBetSize(gameState.pot / 2)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs py-1 rounded transition-colors">1/2 Pot</button>
              <button onClick={() => setBetSize(gameState.pot)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs py-1 rounded transition-colors">Pot</button>
              <button onClick={() => setBetSize(15000)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs py-1 rounded transition-colors">Max</button>
            </div>
          </div>

          {/* Boutons d'Action Principaux */}
          <div className="flex w-full md:w-auto space-x-2 md:space-x-4">
            <button 
              onClick={() => handleAction('FOLD')}
              className="flex-1 md:w-32 py-3 md:py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-white font-bold text-sm md:text-base transition-all shadow-lg active:scale-95"
            >
              FOLD
            </button>
            <button 
              onClick={() => handleAction('CALL')}
              className="flex-1 md:w-32 py-3 md:py-4 bg-blue-600 hover:bg-blue-500 border border-blue-400 rounded-lg text-white font-bold text-sm md:text-base transition-all shadow-lg active:scale-95 flex flex-col items-center justify-center leading-tight"
            >
              <span>CALL</span>
              <span className="text-xs font-normal text-blue-200">$500</span>
            </button>
            <button 
              onClick={() => handleAction('RAISE')}
              className="flex-1 md:w-32 py-3 md:py-4 bg-green-600 hover:bg-green-500 border border-green-400 rounded-lg text-white font-bold text-sm md:text-base transition-all shadow-lg active:scale-95 flex flex-col items-center justify-center leading-tight"
            >
              <span>RAISE TO</span>
              <span className="text-xs font-normal text-green-200">${betSize}</span>
            </button>
          </div>
          
        </div>
      )}

      {/* Styles globaux pour des animations personnalisées */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; background-color: red; }
        }
        .back-pattern {
          background-image: radial-gradient(#1e3a8a 2px, transparent 2px);
          background-size: 8px 8px;
        }
      `}} />
    </div>
  );
}