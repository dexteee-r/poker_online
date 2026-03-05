import { randomInt } from "crypto";

/**
 * Retourne un entier aléatoire cryptographiquement sécurisé dans [min, max).
 * Utilise crypto.randomInt() de Node.js (CSPRNG) — jamais Math.random().
 */
export function secureRandomInt(min: number, max: number): number {
  return randomInt(min, max);
}
