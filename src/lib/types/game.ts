// Types partagés pour le jeu de poker

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank =
  | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  | "J" | "Q" | "K" | "A";

export interface Card {
  suit: Suit;
  rank: Rank;
}

export type PlayerStatus = "waiting" | "active" | "folded" | "all-in" | "eliminated";

export interface Player {
  id: string;
  name: string;
  chips: number;
  status: PlayerStatus;
  hand: Card[];       // Vide côté client pour les adversaires (sécurité serveur)
  currentBet: number;
  seatIndex: number;
}

export type GamePhase = "waiting" | "preflop" | "flop" | "turn" | "river" | "showdown";

export interface GameState {
  id: string;
  phase: GamePhase;
  players: Player[];
  communityCards: Card[];
  pot: number;
  currentPlayerIndex: number;
  dealerIndex: number;
  smallBlind: number;
  bigBlind: number;
  minimumRaise: number;
}

export type PlayerAction =
  | { type: "fold" }
  | { type: "check" }
  | { type: "call" }
  | { type: "raise"; amount: number }
  | { type: "all-in" };

// Classement des mains
export type HandRank =
  | "high_card" | "one_pair" | "two_pair" | "three_of_a_kind"
  | "straight" | "flush" | "full_house" | "four_of_a_kind"
  | "straight_flush" | "royal_flush";

export interface HandEvaluation {
  rank: HandRank;
  rankValue: number;       // 1-10
  bestCards: Card[];        // les 5 cartes de la meilleure main
  kickers: number[];        // valeurs numériques pour départager, tri décroissant
  description: string;      // ex: "Two Pair, Kings and Fours"
}

// Résultat de validation d'action
export interface ActionResult {
  valid: boolean;
  error?: string;
}

// État serveur étendu (jamais envoyé au client)
export interface ServerGameState extends GameState {
  deck: Card[];
  lastRaiseAmount: number;
  lastAggressorIndex: number;
  actedThisRound: number[];  // indices des joueurs qui ont agi ce tour de mise
}

// Résultat d'une main pour le showdown
export interface HandResult {
  winners: { playerId: string; hand: HandEvaluation; amountWon: number }[];
  revealedHands: { playerId: string; cards: Card[]; hand: HandEvaluation }[];
}
