import type { Card, Suit, Rank } from "../types/game";
import { secureRandomInt } from "./random";

export const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
export const RANKS: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

/**
 * Crée un deck standard de 52 cartes (non mélangé).
 */
export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
}

/**
 * Mélange un deck avec Fisher-Yates + CSPRNG.
 * Retourne une copie mélangée (ne mute pas l'original).
 */
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = secureRandomInt(0, i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Raccourci : crée et mélange un deck en une seule opération.
 */
export function createShuffledDeck(): Card[] {
  return shuffleDeck(createDeck());
}

/**
 * Prend N cartes du dessus du deck.
 * Retourne les cartes distribuées et le deck restant.
 */
export function dealCards(
  deck: Card[],
  count: number
): { dealt: Card[]; remaining: Card[] } {
  if (count > deck.length) {
    throw new Error(`Cannot deal ${count} cards from a deck of ${deck.length}`);
  }
  return {
    dealt: deck.slice(0, count),
    remaining: deck.slice(count),
  };
}

/**
 * Distribue 2 cartes à chaque joueur en alternance (comme en vrai poker).
 * Premier tour : 1 carte à chaque joueur, puis deuxième tour : 1 carte à chaque.
 */
export function dealHoleCards(
  deck: Card[],
  playerCount: number
): { hands: Card[][]; remaining: Card[] } {
  const totalCards = playerCount * 2;
  if (totalCards > deck.length) {
    throw new Error(
      `Cannot deal hole cards for ${playerCount} players from a deck of ${deck.length}`
    );
  }

  const hands: Card[][] = Array.from({ length: playerCount }, () => []);

  let cardIndex = 0;
  // Tour 1 : une carte à chaque joueur
  for (let p = 0; p < playerCount; p++) {
    hands[p].push(deck[cardIndex++]);
  }
  // Tour 2 : une deuxième carte à chaque joueur
  for (let p = 0; p < playerCount; p++) {
    hands[p].push(deck[cardIndex++]);
  }

  return {
    hands,
    remaining: deck.slice(totalCards),
  };
}
