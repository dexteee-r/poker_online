import { describe, it, expect } from "vitest";
import { getNextDealerIndex, getBlindsPositions, postBlinds } from "../table";
import type { Player } from "../../types/game";

function makePlayer(overrides: Partial<Player> & { id: string; seatIndex: number }): Player {
  return {
    name: `Player ${overrides.id}`,
    chips: 1000,
    status: "active",
    hand: [],
    currentBet: 0,
    ...overrides,
  };
}

const threePlayers: Player[] = [
  makePlayer({ id: "1", seatIndex: 0 }),
  makePlayer({ id: "2", seatIndex: 1 }),
  makePlayer({ id: "3", seatIndex: 2 }),
];

const twoPlayers: Player[] = [
  makePlayer({ id: "1", seatIndex: 0 }),
  makePlayer({ id: "2", seatIndex: 1 }),
];

describe("getNextDealerIndex", () => {
  it("passe au joueur suivant", () => {
    expect(getNextDealerIndex(0, threePlayers)).toBe(1);
    expect(getNextDealerIndex(1, threePlayers)).toBe(2);
    expect(getNextDealerIndex(2, threePlayers)).toBe(0);
  });

  it("saute les joueurs éliminés", () => {
    const players = [
      makePlayer({ id: "1", seatIndex: 0 }),
      makePlayer({ id: "2", seatIndex: 1, status: "eliminated" }),
      makePlayer({ id: "3", seatIndex: 2 }),
    ];
    expect(getNextDealerIndex(0, players)).toBe(2);
  });

  it("saute les joueurs foldés", () => {
    const players = [
      makePlayer({ id: "1", seatIndex: 0 }),
      makePlayer({ id: "2", seatIndex: 1, status: "folded" }),
      makePlayer({ id: "3", seatIndex: 2 }),
    ];
    expect(getNextDealerIndex(0, players)).toBe(2);
  });

  it("fonctionne en heads-up", () => {
    expect(getNextDealerIndex(0, twoPlayers)).toBe(1);
    expect(getNextDealerIndex(1, twoPlayers)).toBe(0);
  });

  it("throw si aucun joueur actif", () => {
    const players = [
      makePlayer({ id: "1", seatIndex: 0, status: "eliminated" }),
      makePlayer({ id: "2", seatIndex: 1, status: "eliminated" }),
    ];
    expect(() => getNextDealerIndex(0, players)).toThrow();
  });
});

describe("getBlindsPositions", () => {
  it("place SB et BB correctement avec 3+ joueurs", () => {
    // Dealer = 0, SB = 1, BB = 2
    const { smallBlindIndex, bigBlindIndex } = getBlindsPositions(0, threePlayers);
    expect(smallBlindIndex).toBe(1);
    expect(bigBlindIndex).toBe(2);
  });

  it("rotate correctement les blinds", () => {
    // Dealer = 1, SB = 2, BB = 0
    const { smallBlindIndex, bigBlindIndex } = getBlindsPositions(1, threePlayers);
    expect(smallBlindIndex).toBe(2);
    expect(bigBlindIndex).toBe(0);
  });

  it("gère le heads-up : dealer = SB", () => {
    // Règle heads-up : dealer est la SB
    const { smallBlindIndex, bigBlindIndex } = getBlindsPositions(0, twoPlayers);
    expect(smallBlindIndex).toBe(0); // Dealer = SB
    expect(bigBlindIndex).toBe(1);   // L'autre = BB
  });

  it("saute les joueurs inactifs pour les blinds", () => {
    const players = [
      makePlayer({ id: "1", seatIndex: 0 }),
      makePlayer({ id: "2", seatIndex: 1, status: "eliminated" }),
      makePlayer({ id: "3", seatIndex: 2 }),
      makePlayer({ id: "4", seatIndex: 3 }),
    ];
    // Dealer = 0, skip joueur 1 (éliminé), SB = 2, BB = 3
    const { smallBlindIndex, bigBlindIndex } = getBlindsPositions(0, players);
    expect(smallBlindIndex).toBe(2);
    expect(bigBlindIndex).toBe(3);
  });

  it("throw si moins de 2 joueurs actifs", () => {
    const players = [
      makePlayer({ id: "1", seatIndex: 0 }),
      makePlayer({ id: "2", seatIndex: 1, status: "eliminated" }),
    ];
    expect(() => getBlindsPositions(0, players)).toThrow();
  });
});

describe("postBlinds", () => {
  it("déduit les blinds des stacks", () => {
    const result = postBlinds(threePlayers, 0, 10, 20);
    // SB = joueur 1, BB = joueur 2
    expect(result[1].chips).toBe(990);
    expect(result[1].currentBet).toBe(10);
    expect(result[2].chips).toBe(980);
    expect(result[2].currentBet).toBe(20);
    // Dealer inchangé
    expect(result[0].chips).toBe(1000);
    expect(result[0].currentBet).toBe(0);
  });

  it("ne mute pas le tableau original", () => {
    const original = threePlayers.map((p) => ({ ...p }));
    postBlinds(threePlayers, 0, 10, 20);
    expect(threePlayers).toEqual(original);
  });

  it("gère le all-in quand le stack < blind", () => {
    const players = [
      makePlayer({ id: "1", seatIndex: 0 }),
      makePlayer({ id: "2", seatIndex: 1, chips: 5 }), // stack < SB
      makePlayer({ id: "3", seatIndex: 2 }),
    ];
    const result = postBlinds(players, 0, 10, 20);
    expect(result[1].chips).toBe(0);
    expect(result[1].currentBet).toBe(5);
    expect(result[1].status).toBe("all-in");
  });

  it("gère les blinds en heads-up", () => {
    const result = postBlinds(twoPlayers, 0, 10, 20);
    // Heads-up : dealer (0) = SB, joueur 1 = BB
    expect(result[0].chips).toBe(990);
    expect(result[0].currentBet).toBe(10);
    expect(result[1].chips).toBe(980);
    expect(result[1].currentBet).toBe(20);
  });
});
