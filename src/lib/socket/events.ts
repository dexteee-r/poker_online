// Noms d'événements WebSocket partagés entre client et serveur

export const SOCKET_EVENTS = {
  // Client → Serveur
  JOIN_TABLE: "join_table",
  LEAVE_TABLE: "leave_table",
  PLAYER_ACTION: "player_action",

  // Serveur → Client
  GAME_STATE_UPDATE: "game_state_update",
  PLAYER_JOINED: "player_joined",
  PLAYER_LEFT: "player_left",
  ERROR: "error",
  HAND_RESULT: "hand_result",
} as const;
