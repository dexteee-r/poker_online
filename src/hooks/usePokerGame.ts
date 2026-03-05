"use client";

import { useState } from "react";
import type { GameState, PlayerAction } from "@/lib/types/game";

/**
 * Hook principal — pont entre l'UI et le serveur.
 * Pour l'instant : état local uniquement.
 * Plus tard : connexion WebSocket (Socket.io).
 */
export function usePokerGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Actions du joueur (seront envoyées au serveur via WebSocket)
  function fold() {
    sendAction({ type: "fold" });
  }

  function check() {
    sendAction({ type: "check" });
  }

  function call() {
    sendAction({ type: "call" });
  }

  function raise(amount: number) {
    sendAction({ type: "raise", amount });
  }

  function allIn() {
    sendAction({ type: "all-in" });
  }

  // TODO: Envoyer via Socket.io au lieu de console.log
  function sendAction(action: PlayerAction) {
    console.log("Action envoyée:", action);
  }

  return {
    gameState,
    isConnected,
    fold,
    check,
    call,
    raise,
    allIn,
  };
}
