import { describe, it, expect } from "vitest";
import { createDeck, shuffleDeck, createShuffledDeck, dealCards, dealHoleCards, SUITS, RANKS } from "../deck";

describe("createDeck", () => {
  it("crée un deck de 52 cartes", () => {
    const deck = createDeck();
    expect(deck).toHaveLength(52);
  });

  it("contient 52 cartes uniques", () => {
    const deck = createDeck();
    const keys = deck.map((c) => `${c.rank}-${c.suit}`);
    const unique = new Set(keys);
    expect(unique.size).toBe(52);
  });

  it("contient toutes les combinaisons suit/rank", () => {
    const deck = createDeck();
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        expect(deck).toContainEqual({ suit, rank });
      }
    }
  });
});

describe("shuffleDeck", () => {
  it("retourne un deck de 52 cartes", () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    expect(shuffled).toHaveLength(52);
  });

  it("ne mute pas le deck original", () => {
    const deck = createDeck();
    const original = [...deck];
    shuffleDeck(deck);
    expect(deck).toEqual(original);
  });

  it("contient les mêmes cartes que l'original", () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    const sortFn = (a: { suit: string; rank: string }, b: { suit: string; rank: string }) =>
      `${a.suit}-${a.rank}`.localeCompare(`${b.suit}-${b.rank}`);
    expect([...shuffled].sort(sortFn)).toEqual([...deck].sort(sortFn));
  });

  it("produit un ordre différent (statistiquement)", () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    // La probabilité que le shuffle donne exactement le même ordre est 1/52! ≈ 0
    const samePosition = deck.filter(
      (card, i) => card.suit === shuffled[i].suit && card.rank === shuffled[i].rank
    );
    // Au minimum quelques cartes doivent avoir changé de position
    expect(samePosition.length).toBeLessThan(52);
  });
});

describe("createShuffledDeck", () => {
  it("retourne un deck mélangé de 52 cartes", () => {
    const deck = createShuffledDeck();
    expect(deck).toHaveLength(52);
  });
});

describe("dealCards", () => {
  it("distribue le bon nombre de cartes", () => {
    const deck = createShuffledDeck();
    const { dealt, remaining } = dealCards(deck, 5);
    expect(dealt).toHaveLength(5);
    expect(remaining).toHaveLength(47);
  });

  it("prend les cartes du dessus du deck", () => {
    const deck = createShuffledDeck();
    const { dealt } = dealCards(deck, 3);
    expect(dealt[0]).toEqual(deck[0]);
    expect(dealt[1]).toEqual(deck[1]);
    expect(dealt[2]).toEqual(deck[2]);
  });

  it("ne mute pas le deck original", () => {
    const deck = createShuffledDeck();
    const original = [...deck];
    dealCards(deck, 5);
    expect(deck).toEqual(original);
  });

  it("throw si pas assez de cartes", () => {
    const deck = createShuffledDeck();
    expect(() => dealCards(deck, 53)).toThrow();
  });
});

describe("dealHoleCards", () => {
  it("distribue 2 cartes à chaque joueur", () => {
    const deck = createShuffledDeck();
    const { hands, remaining } = dealHoleCards(deck, 4);
    expect(hands).toHaveLength(4);
    for (const hand of hands) {
      expect(hand).toHaveLength(2);
    }
    expect(remaining).toHaveLength(44);
  });

  it("distribue en alternance (premier tour puis deuxième tour)", () => {
    const deck = createShuffledDeck();
    const { hands } = dealHoleCards(deck, 3);
    // Tour 1 : joueur 0 → deck[0], joueur 1 → deck[1], joueur 2 → deck[2]
    // Tour 2 : joueur 0 → deck[3], joueur 1 → deck[4], joueur 2 → deck[5]
    expect(hands[0][0]).toEqual(deck[0]);
    expect(hands[1][0]).toEqual(deck[1]);
    expect(hands[2][0]).toEqual(deck[2]);
    expect(hands[0][1]).toEqual(deck[3]);
    expect(hands[1][1]).toEqual(deck[4]);
    expect(hands[2][1]).toEqual(deck[5]);
  });

  it("throw si pas assez de cartes", () => {
    const { remaining } = dealCards(createShuffledDeck(), 51);
    expect(() => dealHoleCards(remaining, 1)).toThrow();
  });
});
