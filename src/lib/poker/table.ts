import type { Player } from "../types/game";

/**
 * Trouve le prochain dealer parmi les joueurs actifs (rotation clockwise).
 * Ne considère que les joueurs avec status "active" ou "waiting".
 */
export function getNextDealerIndex(
  currentDealerIndex: number,
  players: Player[]
): number {
  const len = players.length;
  for (let offset = 1; offset <= len; offset++) {
    const idx = (currentDealerIndex + offset) % len;
    if (players[idx].status === "active" || players[idx].status === "waiting") {
      return idx;
    }
  }
  throw new Error("No active players found for dealer rotation");
}

/**
 * Calcule les positions SB et BB à partir du dealer.
 * Gère le cas heads-up (2 joueurs actifs) : le dealer est la SB.
 */
export function getBlindsPositions(
  dealerIndex: number,
  players: Player[]
): { smallBlindIndex: number; bigBlindIndex: number } {
  const activePlayers = players.filter(
    (p) => p.status === "active" || p.status === "waiting"
  );

  if (activePlayers.length < 2) {
    throw new Error("Need at least 2 active players for blinds");
  }

  // Trouver les indices actifs suivants dans le tableau players
  const findNextActive = (fromIndex: number): number => {
    const len = players.length;
    for (let offset = 1; offset <= len; offset++) {
      const idx = (fromIndex + offset) % len;
      if (players[idx].status === "active" || players[idx].status === "waiting") {
        return idx;
      }
    }
    throw new Error("No active player found");
  };

  if (activePlayers.length === 2) {
    // Heads-up : dealer = SB, l'autre = BB
    return {
      smallBlindIndex: dealerIndex,
      bigBlindIndex: findNextActive(dealerIndex),
    };
  }

  // 3+ joueurs : SB = premier actif après dealer, BB = deuxième actif après dealer
  const smallBlindIndex = findNextActive(dealerIndex);
  const bigBlindIndex = findNextActive(smallBlindIndex);

  return { smallBlindIndex, bigBlindIndex };
}

/**
 * Poste les blinds : déduit les montants des stacks et met à jour currentBet.
 * Retourne une copie du tableau de joueurs (ne mute pas l'original).
 */
export function postBlinds(
  players: Player[],
  dealerIndex: number,
  smallBlind: number,
  bigBlind: number
): Player[] {
  const { smallBlindIndex, bigBlindIndex } = getBlindsPositions(
    dealerIndex,
    players
  );

  return players.map((player, index) => {
    if (index === smallBlindIndex) {
      const amount = Math.min(smallBlind, player.chips);
      return {
        ...player,
        chips: player.chips - amount,
        currentBet: amount,
        status: amount === player.chips ? "all-in" as const : player.status,
      };
    }
    if (index === bigBlindIndex) {
      const amount = Math.min(bigBlind, player.chips);
      return {
        ...player,
        chips: player.chips - amount,
        currentBet: amount,
        status: amount === player.chips ? "all-in" as const : player.status,
      };
    }
    return { ...player };
  });
}
