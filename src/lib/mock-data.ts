// Données mock temporaires — seront remplacées par les données serveur via WebSocket/API

export const MOCK_GAME_STATE = {
  pot: 2450.0,
  blinds: "50/100",
  heroStack: 12500,
  callAmount: 450,
  history: [
    { id: 1, player: "Elena_P", action: "Raise" as const, amount: 450 },
    { id: 2, player: "Micky_M", action: "Fold" as const, amount: null },
    { id: 3, player: "Julian_01", action: "Call" as const, amount: 450 },
  ],
  heroCards: [
    { suit: "\u2660", rank: "A" },
    { suit: "\u2660", rank: "J" },
  ],
};

export const MOCK_USER = {
  username: "Viper_01",
  clearance: "Level 4 - High Roller",
  memberSince: "2026",
  inviteToken: "VIP-8F92-A1B2",
  networkChips: 125000,
  stats: {
    handsPlayed: 14520,
    winRate: "+12.4 bb/100",
    vpip: 24.5,
    pfr: 18.2,
    threeBet: 7.1,
  },
  sessions: [
    { id: 1, device: "MacBook Pro", ip: "192.168.1.45", location: "Encrypted Node", active: true },
    { id: 2, device: "iPhone 15 Pro", ip: "85.27.12.99", location: "Relay Node BE", active: false },
  ],
};

export const MOCK_ADMIN_LOGS = [
  { time: "20:45:12", ip: "192.168.1.45", action: "AUTH_SUCCESS", user: "Viper_01", status: "ok" as const },
  { time: "20:42:05", ip: "85.27.12.99", action: "INVALID_TOKEN", user: "UNKNOWN", status: "warn" as const },
  { time: "20:30:00", ip: "45.14.22.11", action: "BRUTE_FORCE_BLOCKED", user: "UNKNOWN", status: "danger" as const },
  { time: "20:15:11", ip: "10.0.0.5", action: "CHIPS_MINTED", user: "ROOT", status: "ok" as const },
];
