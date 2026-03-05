import type { Card, Rank, HandRank, HandEvaluation, HandResult, Player } from "../types/game";

const RANK_VALUES: Record<Rank, number> = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8,
  "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14,
};

const HAND_RANK_VALUES: Record<HandRank, number> = {
  high_card: 1,
  one_pair: 2,
  two_pair: 3,
  three_of_a_kind: 4,
  straight: 5,
  flush: 6,
  full_house: 7,
  four_of_a_kind: 8,
  straight_flush: 9,
  royal_flush: 10,
};

const RANK_NAMES: Record<number, string> = {
  2: "Twos", 3: "Threes", 4: "Fours", 5: "Fives", 6: "Sixes", 7: "Sevens",
  8: "Eights", 9: "Nines", 10: "Tens", 11: "Jacks", 12: "Queens", 13: "Kings", 14: "Aces",
};

const RANK_NAME_SINGULAR: Record<number, string> = {
  2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven",
  8: "Eight", 9: "Nine", 10: "Ten", 11: "Jack", 12: "Queen", 13: "King", 14: "Ace",
};

export function rankToValue(rank: Rank): number {
  return RANK_VALUES[rank];
}

/**
 * Évalue exactement 5 cartes et retourne la classification.
 */
export function evaluateHand(fiveCards: Card[]): HandEvaluation {
  if (fiveCards.length !== 5) {
    throw new Error(`evaluateHand requires exactly 5 cards, got ${fiveCards.length}`);
  }

  const values = fiveCards.map((c) => rankToValue(c.rank)).sort((a, b) => b - a);

  // Frequency map
  const freq = new Map<number, number>();
  for (const v of values) {
    freq.set(v, (freq.get(v) ?? 0) + 1);
  }

  // Flush check
  const isFlush = fiveCards.every((c) => c.suit === fiveCards[0].suit);

  // Straight check
  let isStraight = false;
  let straightHigh = values[0];

  // Normal straight: 5 unique consecutive values
  if (freq.size === 5) {
    if (values[0] - values[4] === 4) {
      isStraight = true;
      straightHigh = values[0];
    }
    // Wheel: A-2-3-4-5
    if (values[0] === 14 && values[1] === 5 && values[2] === 4 && values[3] === 3 && values[4] === 2) {
      isStraight = true;
      straightHigh = 5; // A counts as 1
    }
  }

  // Classify
  const freqEntries = [...freq.entries()].sort((a, b) => {
    // Sort by count desc, then by value desc
    if (b[1] !== a[1]) return b[1] - a[1];
    return b[0] - a[0];
  });

  const counts = freqEntries.map(([, c]) => c);

  if (isStraight && isFlush) {
    if (straightHigh === 14) {
      return {
        rank: "royal_flush",
        rankValue: 10,
        bestCards: [...fiveCards],
        kickers: [14],
        description: "Royal Flush",
      };
    }
    return {
      rank: "straight_flush",
      rankValue: 9,
      bestCards: [...fiveCards],
      kickers: [straightHigh],
      description: `Straight Flush, ${RANK_NAME_SINGULAR[straightHigh]} High`,
    };
  }

  if (counts[0] === 4) {
    const quadVal = freqEntries[0][0];
    const kickerVal = freqEntries[1][0];
    return {
      rank: "four_of_a_kind",
      rankValue: 8,
      bestCards: [...fiveCards],
      kickers: [quadVal, kickerVal],
      description: `Four of a Kind, ${RANK_NAMES[quadVal]}`,
    };
  }

  if (counts[0] === 3 && counts[1] === 2) {
    const tripVal = freqEntries[0][0];
    const pairVal = freqEntries[1][0];
    return {
      rank: "full_house",
      rankValue: 7,
      bestCards: [...fiveCards],
      kickers: [tripVal, pairVal],
      description: `Full House, ${RANK_NAMES[tripVal]} over ${RANK_NAMES[pairVal]}`,
    };
  }

  if (isFlush) {
    return {
      rank: "flush",
      rankValue: 6,
      bestCards: [...fiveCards],
      kickers: values,
      description: `Flush, ${RANK_NAME_SINGULAR[values[0]]} High`,
    };
  }

  if (isStraight) {
    return {
      rank: "straight",
      rankValue: 5,
      bestCards: [...fiveCards],
      kickers: [straightHigh],
      description: `Straight, ${RANK_NAME_SINGULAR[straightHigh]} High`,
    };
  }

  if (counts[0] === 3) {
    const tripVal = freqEntries[0][0];
    const kickers = freqEntries.slice(1).map(([v]) => v);
    return {
      rank: "three_of_a_kind",
      rankValue: 4,
      bestCards: [...fiveCards],
      kickers: [tripVal, ...kickers],
      description: `Three of a Kind, ${RANK_NAMES[tripVal]}`,
    };
  }

  if (counts[0] === 2 && counts[1] === 2) {
    const highPair = freqEntries[0][0];
    const lowPair = freqEntries[1][0];
    const kickerVal = freqEntries[2][0];
    return {
      rank: "two_pair",
      rankValue: 3,
      bestCards: [...fiveCards],
      kickers: [highPair, lowPair, kickerVal],
      description: `Two Pair, ${RANK_NAMES[highPair]} and ${RANK_NAMES[lowPair]}`,
    };
  }

  if (counts[0] === 2) {
    const pairVal = freqEntries[0][0];
    const kickers = freqEntries.slice(1).map(([v]) => v);
    return {
      rank: "one_pair",
      rankValue: 2,
      bestCards: [...fiveCards],
      kickers: [pairVal, ...kickers],
      description: `One Pair, ${RANK_NAMES[pairVal]}`,
    };
  }

  return {
    rank: "high_card",
    rankValue: 1,
    bestCards: [...fiveCards],
    kickers: values,
    description: `High Card, ${RANK_NAME_SINGULAR[values[0]]}`,
  };
}

/**
 * Génère toutes les combinaisons C(n, k) d'un tableau.
 */
function combinations<T>(arr: T[], k: number): T[][] {
  const result: T[][] = [];
  function helper(start: number, current: T[]) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      helper(i + 1, current);
      current.pop();
    }
  }
  helper(0, []);
  return result;
}

/**
 * Teste les 21 combinaisons de 5 parmi 7 cartes, retourne la meilleure main.
 */
export function findBestHand(holeCards: Card[], communityCards: Card[]): HandEvaluation {
  const allCards = [...holeCards, ...communityCards];
  if (allCards.length < 5) {
    throw new Error(`Need at least 5 cards, got ${allCards.length}`);
  }

  const combos = combinations(allCards, 5);
  let best: HandEvaluation | null = null;

  for (const combo of combos) {
    const evaluation = evaluateHand(combo);
    if (best === null || compareHands(evaluation, best) > 0) {
      best = evaluation;
    }
  }

  return best!;
}

/**
 * Compare deux mains. Retourne +1 si a > b, -1 si a < b, 0 si égalité.
 */
export function compareHands(a: HandEvaluation, b: HandEvaluation): number {
  if (a.rankValue !== b.rankValue) {
    return a.rankValue > b.rankValue ? 1 : -1;
  }

  // Same hand rank: compare kickers
  for (let i = 0; i < Math.min(a.kickers.length, b.kickers.length); i++) {
    if (a.kickers[i] !== b.kickers[i]) {
      return a.kickers[i] > b.kickers[i] ? 1 : -1;
    }
  }

  return 0;
}

/**
 * Détermine le(s) gagnant(s) d'une main. Gère le split pot.
 */
export function determineWinners(players: Player[], communityCards: Card[]): HandResult {
  const activePlayers = players.filter(
    (p) => p.status === "active" || p.status === "all-in"
  );

  const evaluations = activePlayers.map((p) => ({
    playerId: p.id,
    cards: p.hand,
    hand: findBestHand(p.hand, communityCards),
  }));

  // Sort by hand strength descending
  evaluations.sort((a, b) => compareHands(b.hand, a.hand));

  // Find all winners (tied with the best hand)
  const bestHand = evaluations[0].hand;
  const winnerEvals = evaluations.filter(
    (e) => compareHands(e.hand, bestHand) === 0
  );

  // Calculate total pot from all players (including folded)
  const totalPot = players.reduce((sum, p) => sum + p.currentBet, 0);
  // Note: pot should be passed separately in real usage; here we use a simplified split
  const amountPerWinner = Math.floor(totalPot / winnerEvals.length);

  const winners = winnerEvals.map((e) => ({
    playerId: e.playerId,
    hand: e.hand,
    amountWon: amountPerWinner,
  }));

  return {
    winners,
    revealedHands: evaluations,
  };
}
