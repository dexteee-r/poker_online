import { describe, it, expect } from "vitest";
import {
  rankToValue,
  evaluateHand,
  findBestHand,
  compareHands,
  determineWinners,
} from "../hand-evaluator";
import type { Card, Player } from "../../types/game";

// Helper: crée une carte rapidement
function c(rank: Card["rank"], suit: Card["suit"] = "spades"): Card {
  return { rank, suit };
}

function makePlayer(id: string, hand: Card[], chips = 1000, currentBet = 0, status: Player["status"] = "active"): Player {
  return { id, name: `Player ${id}`, chips, status, hand, currentBet, seatIndex: Number(id) };
}

// --- rankToValue ---

describe("rankToValue", () => {
  it("mappe les rangs numériques correctement", () => {
    expect(rankToValue("2")).toBe(2);
    expect(rankToValue("9")).toBe(9);
    expect(rankToValue("10")).toBe(10);
  });

  it("mappe les figures correctement", () => {
    expect(rankToValue("J")).toBe(11);
    expect(rankToValue("Q")).toBe(12);
    expect(rankToValue("K")).toBe(13);
    expect(rankToValue("A")).toBe(14);
  });
});

// --- evaluateHand ---

describe("evaluateHand", () => {
  it("throw si pas exactement 5 cartes", () => {
    expect(() => evaluateHand([c("A"), c("K"), c("Q")])).toThrow();
    expect(() => evaluateHand([c("A"), c("K"), c("Q"), c("J"), c("10"), c("9")])).toThrow();
  });

  // Royal Flush
  it("détecte un royal flush", () => {
    const hand = [c("A", "hearts"), c("K", "hearts"), c("Q", "hearts"), c("J", "hearts"), c("10", "hearts")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("royal_flush");
    expect(result.rankValue).toBe(10);
    expect(result.kickers).toEqual([14]);
  });

  // Straight Flush
  it("détecte un straight flush", () => {
    const hand = [c("9", "clubs"), c("8", "clubs"), c("7", "clubs"), c("6", "clubs"), c("5", "clubs")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("straight_flush");
    expect(result.rankValue).toBe(9);
    expect(result.kickers).toEqual([9]);
  });

  it("détecte un straight flush wheel (A-2-3-4-5)", () => {
    const hand = [c("A", "diamonds"), c("2", "diamonds"), c("3", "diamonds"), c("4", "diamonds"), c("5", "diamonds")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("straight_flush");
    expect(result.kickers).toEqual([5]); // high card = 5
  });

  // Four of a Kind
  it("détecte un carré", () => {
    const hand = [c("K", "hearts"), c("K", "diamonds"), c("K", "clubs"), c("K", "spades"), c("3")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("four_of_a_kind");
    expect(result.rankValue).toBe(8);
    expect(result.kickers).toEqual([13, 3]);
  });

  it("départage deux carrés par la valeur du carré", () => {
    const quadsA = evaluateHand([c("A"), c("A", "hearts"), c("A", "diamonds"), c("A", "clubs"), c("2")]);
    const quadsK = evaluateHand([c("K"), c("K", "hearts"), c("K", "diamonds"), c("K", "clubs"), c("2")]);
    expect(compareHands(quadsA, quadsK)).toBe(1);
  });

  it("départage deux carrés égaux par le kicker", () => {
    const quadsHigh = evaluateHand([c("K"), c("K", "hearts"), c("K", "diamonds"), c("K", "clubs"), c("A")]);
    const quadsLow = evaluateHand([c("K"), c("K", "hearts"), c("K", "diamonds"), c("K", "clubs"), c("2")]);
    expect(compareHands(quadsHigh, quadsLow)).toBe(1);
  });

  // Full House
  it("détecte un full house", () => {
    const hand = [c("Q"), c("Q", "hearts"), c("Q", "diamonds"), c("7"), c("7", "hearts")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("full_house");
    expect(result.rankValue).toBe(7);
    expect(result.kickers).toEqual([12, 7]);
  });

  it("départage deux full houses par le brelan", () => {
    const fullA = evaluateHand([c("A"), c("A", "hearts"), c("A", "diamonds"), c("2"), c("2", "hearts")]);
    const fullK = evaluateHand([c("K"), c("K", "hearts"), c("K", "diamonds"), c("Q"), c("Q", "hearts")]);
    expect(compareHands(fullA, fullK)).toBe(1);
  });

  it("départage deux full houses de même brelan par la paire", () => {
    const fullHigh = evaluateHand([c("A"), c("A", "hearts"), c("A", "diamonds"), c("K"), c("K", "hearts")]);
    const fullLow = evaluateHand([c("A"), c("A", "hearts"), c("A", "diamonds"), c("2"), c("2", "hearts")]);
    expect(compareHands(fullHigh, fullLow)).toBe(1);
  });

  // Flush
  it("détecte un flush", () => {
    const hand = [c("A", "hearts"), c("J", "hearts"), c("8", "hearts"), c("5", "hearts"), c("3", "hearts")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("flush");
    expect(result.rankValue).toBe(6);
    expect(result.kickers).toEqual([14, 11, 8, 5, 3]);
  });

  it("départage deux flushs par les kickers", () => {
    const flushA = evaluateHand([c("A", "hearts"), c("K", "hearts"), c("8", "hearts"), c("5", "hearts"), c("3", "hearts")]);
    const flushB = evaluateHand([c("A", "clubs"), c("Q", "clubs"), c("8", "clubs"), c("5", "clubs"), c("3", "clubs")]);
    expect(compareHands(flushA, flushB)).toBe(1);
  });

  // Straight
  it("détecte un straight", () => {
    const hand = [c("8"), c("7", "hearts"), c("6", "clubs"), c("5", "diamonds"), c("4")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("straight");
    expect(result.rankValue).toBe(5);
    expect(result.kickers).toEqual([8]);
  });

  it("détecte la wheel (A-2-3-4-5)", () => {
    const hand = [c("A"), c("2", "hearts"), c("3", "clubs"), c("4", "diamonds"), c("5")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("straight");
    expect(result.kickers).toEqual([5]); // carte haute = 5
  });

  it("le broadway straight a carte haute = 14", () => {
    const hand = [c("A"), c("K", "hearts"), c("Q", "clubs"), c("J", "diamonds"), c("10")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("straight");
    expect(result.kickers).toEqual([14]);
  });

  it("Q-K-A-2-3 n'est PAS un straight (wrap-around interdit)", () => {
    const hand = [c("Q"), c("K", "hearts"), c("A", "clubs"), c("2", "diamonds"), c("3")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("high_card");
  });

  // Three of a Kind
  it("détecte un brelan", () => {
    const hand = [c("J"), c("J", "hearts"), c("J", "diamonds"), c("7"), c("3", "clubs")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("three_of_a_kind");
    expect(result.rankValue).toBe(4);
    expect(result.kickers).toEqual([11, 7, 3]);
  });

  it("départage deux brelans par les kickers", () => {
    const tripA = evaluateHand([c("J"), c("J", "hearts"), c("J", "diamonds"), c("A"), c("3", "clubs")]);
    const tripB = evaluateHand([c("J"), c("J", "hearts"), c("J", "diamonds"), c("K"), c("3", "clubs")]);
    expect(compareHands(tripA, tripB)).toBe(1);
  });

  // Two Pair
  it("détecte deux paires", () => {
    const hand = [c("K"), c("K", "hearts"), c("4"), c("4", "clubs"), c("9")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("two_pair");
    expect(result.rankValue).toBe(3);
    expect(result.kickers).toEqual([13, 4, 9]);
  });

  it("départage deux double-paires par la haute paire", () => {
    const tpA = evaluateHand([c("A"), c("A", "hearts"), c("3"), c("3", "clubs"), c("2")]);
    const tpB = evaluateHand([c("K"), c("K", "hearts"), c("Q"), c("Q", "clubs"), c("J")]);
    expect(compareHands(tpA, tpB)).toBe(1);
  });

  it("départage deux double-paires de même haute paire par la basse paire", () => {
    const tpA = evaluateHand([c("A"), c("A", "hearts"), c("K"), c("K", "clubs"), c("2")]);
    const tpB = evaluateHand([c("A"), c("A", "hearts"), c("3"), c("3", "clubs"), c("2")]);
    expect(compareHands(tpA, tpB)).toBe(1);
  });

  it("départage deux double-paires identiques par le kicker", () => {
    const tpA = evaluateHand([c("A"), c("A", "hearts"), c("K"), c("K", "clubs"), c("Q")]);
    const tpB = evaluateHand([c("A"), c("A", "diamonds"), c("K"), c("K", "diamonds"), c("2")]);
    expect(compareHands(tpA, tpB)).toBe(1);
  });

  // One Pair
  it("détecte une paire", () => {
    const hand = [c("10"), c("10", "hearts"), c("A"), c("8", "clubs"), c("5")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("one_pair");
    expect(result.rankValue).toBe(2);
    expect(result.kickers).toEqual([10, 14, 8, 5]);
  });

  it("départage deux paires égales par les kickers", () => {
    const pairA = evaluateHand([c("10"), c("10", "hearts"), c("A"), c("K"), c("5")]);
    const pairB = evaluateHand([c("10"), c("10", "hearts"), c("A"), c("Q"), c("5")]);
    expect(compareHands(pairA, pairB)).toBe(1);
  });

  // High Card
  it("détecte high card", () => {
    const hand = [c("A"), c("J", "hearts"), c("8", "clubs"), c("5", "diamonds"), c("3")];
    const result = evaluateHand(hand);
    expect(result.rank).toBe("high_card");
    expect(result.rankValue).toBe(1);
    expect(result.kickers).toEqual([14, 11, 8, 5, 3]);
  });

  it("départage deux high cards", () => {
    const hcA = evaluateHand([c("A"), c("K", "hearts"), c("8", "clubs"), c("5", "diamonds"), c("3")]);
    const hcB = evaluateHand([c("A"), c("Q", "hearts"), c("8", "clubs"), c("5", "diamonds"), c("3")]);
    expect(compareHands(hcA, hcB)).toBe(1);
  });

  // Descriptions
  it("génère une description correcte", () => {
    expect(evaluateHand([c("A", "hearts"), c("K", "hearts"), c("Q", "hearts"), c("J", "hearts"), c("10", "hearts")]).description).toBe("Royal Flush");
    expect(evaluateHand([c("A"), c("2", "hearts"), c("3", "clubs"), c("4", "diamonds"), c("5")]).description).toContain("Straight");
    expect(evaluateHand([c("K"), c("K", "hearts"), c("4"), c("4", "clubs"), c("9")]).description).toContain("Two Pair");
  });
});

// --- compareHands ---

describe("compareHands", () => {
  it("main supérieure bat main inférieure", () => {
    const flush = evaluateHand([c("A", "hearts"), c("J", "hearts"), c("8", "hearts"), c("5", "hearts"), c("3", "hearts")]);
    const straight = evaluateHand([c("8"), c("7", "hearts"), c("6", "clubs"), c("5", "diamonds"), c("4")]);
    expect(compareHands(flush, straight)).toBe(1);
    expect(compareHands(straight, flush)).toBe(-1);
  });

  it("mains identiques = 0", () => {
    const handA = evaluateHand([c("8"), c("7", "hearts"), c("6", "clubs"), c("5", "diamonds"), c("4")]);
    const handB = evaluateHand([c("8", "diamonds"), c("7", "clubs"), c("6", "hearts"), c("5"), c("4", "clubs")]);
    expect(compareHands(handA, handB)).toBe(0);
  });

  it("wheel perd contre straight 6-high", () => {
    const wheel = evaluateHand([c("A"), c("2", "hearts"), c("3", "clubs"), c("4", "diamonds"), c("5")]);
    const sixHigh = evaluateHand([c("6"), c("5", "hearts"), c("4", "clubs"), c("3", "diamonds"), c("2")]);
    expect(compareHands(wheel, sixHigh)).toBe(-1);
  });

  it("hiérarchie complète des mains", () => {
    const royalFlush = evaluateHand([c("A", "hearts"), c("K", "hearts"), c("Q", "hearts"), c("J", "hearts"), c("10", "hearts")]);
    const straightFlush = evaluateHand([c("9", "clubs"), c("8", "clubs"), c("7", "clubs"), c("6", "clubs"), c("5", "clubs")]);
    const fourKind = evaluateHand([c("K"), c("K", "hearts"), c("K", "diamonds"), c("K", "clubs"), c("3")]);
    const fullHouse = evaluateHand([c("Q"), c("Q", "hearts"), c("Q", "diamonds"), c("7"), c("7", "hearts")]);
    const flush = evaluateHand([c("A", "hearts"), c("J", "hearts"), c("8", "hearts"), c("5", "hearts"), c("3", "hearts")]);
    const straight = evaluateHand([c("8"), c("7", "hearts"), c("6", "clubs"), c("5", "diamonds"), c("4")]);
    const threeKind = evaluateHand([c("J"), c("J", "hearts"), c("J", "diamonds"), c("7"), c("3", "clubs")]);
    const twoPair = evaluateHand([c("K"), c("K", "hearts"), c("4"), c("4", "clubs"), c("9")]);
    const onePair = evaluateHand([c("10"), c("10", "hearts"), c("A"), c("8", "clubs"), c("5")]);
    const highCard = evaluateHand([c("A"), c("J", "hearts"), c("8", "clubs"), c("5", "diamonds"), c("3")]);

    const hands = [royalFlush, straightFlush, fourKind, fullHouse, flush, straight, threeKind, twoPair, onePair, highCard];
    for (let i = 0; i < hands.length - 1; i++) {
      expect(compareHands(hands[i], hands[i + 1])).toBe(1);
      expect(compareHands(hands[i + 1], hands[i])).toBe(-1);
    }
  });
});

// --- findBestHand ---

describe("findBestHand", () => {
  it("trouve la meilleure main parmi 7 cartes", () => {
    const hole: Card[] = [c("A", "hearts"), c("K", "hearts")];
    const community: Card[] = [c("Q", "hearts"), c("J", "hearts"), c("10", "hearts"), c("2", "clubs"), c("3", "diamonds")];
    const result = findBestHand(hole, community);
    expect(result.rank).toBe("royal_flush");
  });

  it("choisit la meilleure combinaison possible", () => {
    const hole: Card[] = [c("A"), c("A", "hearts")];
    const community: Card[] = [c("A", "diamonds"), c("A", "clubs"), c("K"), c("K", "hearts"), c("Q")];
    const result = findBestHand(hole, community);
    expect(result.rank).toBe("four_of_a_kind");
    expect(result.kickers[0]).toBe(14); // quad aces
  });

  it("board plays : les 5 community cards sont la meilleure main", () => {
    const hole: Card[] = [c("2"), c("3")];
    const community: Card[] = [c("A", "hearts"), c("K", "hearts"), c("Q", "hearts"), c("J", "hearts"), c("10", "hearts")];
    const result = findBestHand(hole, community);
    expect(result.rank).toBe("royal_flush");
  });

  it("throw si moins de 5 cartes au total", () => {
    expect(() => findBestHand([c("A")], [c("K"), c("Q")])).toThrow();
  });
});

// --- determineWinners ---

describe("determineWinners", () => {
  it("détermine un seul gagnant", () => {
    const community: Card[] = [c("2", "clubs"), c("7", "diamonds"), c("8", "hearts"), c("J", "clubs"), c("3", "diamonds")];
    const players: Player[] = [
      makePlayer("1", [c("A"), c("K")], 1000, 100),
      makePlayer("2", [c("4"), c("5", "hearts")], 1000, 100),
    ];
    const result = determineWinners(players, community);
    expect(result.winners).toHaveLength(1);
    expect(result.winners[0].playerId).toBe("1"); // A-high > 8-high
  });

  it("gère le split pot en cas d'égalité", () => {
    const community: Card[] = [c("A", "hearts"), c("K", "hearts"), c("Q", "hearts"), c("J", "hearts"), c("10", "hearts")];
    const players: Player[] = [
      makePlayer("1", [c("2"), c("3")], 1000, 50),
      makePlayer("2", [c("4"), c("5", "diamonds")], 1000, 50),
    ];
    const result = determineWinners(players, community);
    expect(result.winners).toHaveLength(2);
    expect(result.winners[0].amountWon).toBe(50);
    expect(result.winners[1].amountWon).toBe(50);
  });

  it("ignore les joueurs foldés", () => {
    const community: Card[] = [c("2", "clubs"), c("6", "diamonds"), c("8", "hearts"), c("J", "clubs"), c("3", "diamonds")];
    const players: Player[] = [
      makePlayer("1", [c("A"), c("K")], 1000, 100),
      makePlayer("2", [c("A", "hearts"), c("A", "diamonds")], 1000, 100, "folded"), // would win but folded
      makePlayer("3", [c("4"), c("5", "hearts")], 1000, 100),
    ];
    const result = determineWinners(players, community);
    expect(result.winners).toHaveLength(1);
    expect(result.winners[0].playerId).toBe("1");
  });

  it("inclut les joueurs all-in", () => {
    const community: Card[] = [c("2", "clubs"), c("6", "diamonds"), c("8", "hearts"), c("J", "clubs"), c("3", "diamonds")];
    const players: Player[] = [
      makePlayer("1", [c("A"), c("K")], 0, 100, "all-in"),
      makePlayer("2", [c("4"), c("5", "hearts")], 1000, 100),
    ];
    const result = determineWinners(players, community);
    expect(result.winners).toHaveLength(1);
    expect(result.winners[0].playerId).toBe("1");
  });

  it("retourne les mains révélées de tous les joueurs actifs", () => {
    const community: Card[] = [c("2", "clubs"), c("7", "diamonds"), c("8", "hearts"), c("J", "clubs"), c("3", "diamonds")];
    const players: Player[] = [
      makePlayer("1", [c("A"), c("K")]),
      makePlayer("2", [c("9"), c("10", "hearts")]),
    ];
    const result = determineWinners(players, community);
    expect(result.revealedHands).toHaveLength(2);
    expect(result.revealedHands[0].cards).toHaveLength(2);
  });
});
