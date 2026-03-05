# The High Roller — Kanban de Priorisation

> Organisation des User Stories par release et priorité.
> **Logique** : on ne peut pas avoir de table de jeu sans moteur. On ne peut pas jouer sans auth. On priorise le chemin critique.

---

## Légende

- **Statut** : `Done` | `To Do` | `In Progress`
- **Priorité** : `P0` (bloquant) | `P1` (important) | `P2` (nice-to-have)
- **Dépendances** : US qui doivent être terminées avant de commencer celle-ci

---

## 🏁 MVP (Milestone 1) — "On peut jouer une partie entre potes"

> Objectif : une partie fonctionnelle de bout en bout. Auth basique, 1 table, moteur complet, WebSocket.
> Cible : ~25 US

### Colonne : DONE (UI déjà convertie)

| ID | US | Epic | Statut |
|----|----|------|--------|
| LAND-1 | Landing page | Landing | Done |
| LAND-2 | Liens Sign In / Play Now | Landing | Done |
| LAND-3 | Mentions légales 21+ | Landing | Done |
| TABLE-1 | Affichage hole cards | Table UI | Done (proto) |
| TABLE-2 | Affichage cartes communes | Table UI | Done (proto) |
| TABLE-3 | Affichage pot et blinds | Table UI | Done (proto) |
| TABLE-4 | Stacks des joueurs | Table UI | Done (proto) |
| TABLE-5 | Boutons Fold/Call/Raise | Table UI | Done (proto) |
| TABLE-6 | Slider bet sizing + presets | Table UI | Done (proto) |
| TABLE-8 | Historique actions | Table UI | Done (proto) |
| TABLE-10 | Responsive mobile/desktop | Table UI | Done (proto) |

> **Note** : "Done (proto)" = composant TypeScript créé avec mock data, pas encore connecté au serveur.

---

### Colonne : TO DO — Sprint 1 (Fondations Backend)

> Priorité absolue. Sans ça, rien ne fonctionne.

| ID | US | Epic | Priorité | Taille | Dépendances |
|----|-----|------|----------|--------|-------------|
| AUTH-1 | Inscription (email + token) | Auth | P0 | M | — |
| AUTH-2 | Connexion (email + mdp) | Auth | P0 | S | — |
| AUTH-3 | Déconnexion | Auth | P0 | S | AUTH-2 |
| ADMIN-6 | Protection accès admin (middleware rôle) | Admin | P0 | S | AUTH-2 |
| SEC-3 | CSPRNG pour le shuffle | Sécurité | P0 | S | — |
| ENGINE-1 | Création/mélange du deck | Engine | P0 | S | SEC-3 |
| ENGINE-2 | Distribution des hole cards | Engine | P0 | S | ENGINE-1 |
| ENGINE-7 | Rotation dealer/blinds | Engine | P0 | M | — |

---

### Colonne : TO DO — Sprint 2 (Game Engine Core)

> Le coeur du jeu. Machine à états + évaluation des mains.

| ID | US | Epic | Priorité | Taille | Dépendances |
|----|-----|------|----------|--------|-------------|
| ENGINE-3 | Phases de jeu (preflop→showdown) | Engine | P0 | L | ENGINE-1, ENGINE-2 |
| ENGINE-4 | Validation des actions joueur | Engine | P0 | L | ENGINE-3 |
| ENGINE-5 | Évaluation des mains (hand evaluator) | Engine | P0 | XL | ENGINE-3 |
| ENGINE-8 | Timer par joueur (30s) | Engine | P1 | M | ENGINE-4 |
| SEC-1 | Filtrage de l'état par joueur | Sécurité | P0 | M | ENGINE-3 |
| SEC-2 | Validation serveur de toutes les actions | Sécurité | P0 | M | ENGINE-4 |

---

### Colonne : TO DO — Sprint 3 (WebSocket + Connexion UI↔Serveur)

> Relier le front au back. Les proto UI deviennent fonctionnels.

| ID | US | Epic | Priorité | Taille | Dépendances |
|----|-----|------|----------|--------|-------------|
| WS-1 | Connexion WebSocket authentifiée | WebSocket | P0 | M | AUTH-2 |
| WS-2 | Broadcast de l'état filtré après chaque action | WebSocket | P0 | M | SEC-1, ENGINE-4 |
| WS-3 | Envoi des actions joueur (fold/call/raise) | WebSocket | P0 | S | WS-1 |
| WS-4 | Notifications join/leave | WebSocket | P1 | S | WS-1 |
| WS-6 | Résultats de main (showdown) | WebSocket | P0 | S | ENGINE-5 |
| TABLE-7 | Timer visuel synchronisé serveur | Table UI | P1 | S | ENGINE-8, WS-2 |
| TABLE-9 | Bouton Leave (déconnexion propre) | Table UI | P1 | S | WS-1 |

---

### Colonne : TO DO — Sprint 4 (Lobby + Admin MVP)

> Pouvoir créer/rejoindre une table. Admin peut gérer les jetons et invitations.

| ID | US | Epic | Priorité | Taille | Dépendances |
|----|-----|------|----------|--------|-------------|
| LOBBY-1 | Liste des tables disponibles | Lobby | P0 | M | WS-1 |
| LOBBY-2 | Rejoindre une table | Lobby | P0 | S | LOBBY-1 |
| LOBBY-3 | Créer une table privée | Lobby | P1 | M | LOBBY-1 |
| LOBBY-4 | Rejoindre via code/lien | Lobby | P1 | S | LOBBY-3 |
| ADMIN-1 | Générer tokens d'invitation | Admin | P0 | M | ADMIN-6 |
| ADMIN-2 | Mint/Burn jetons | Admin | P0 | M | ADMIN-6 |

---

## 📦 V1.1 (Milestone 2) — "Expérience complète"

> Profil, stats, résultats, side pots, reconnexion. Le jeu devient solide.

| ID | US | Epic | Priorité | Taille | Dépendances |
|----|-----|------|----------|--------|-------------|
| ENGINE-6 | Side pots (all-in) | Engine | P1 | L | ENGINE-5 |
| ENGINE-9 | Gestion déconnexion en partie | Engine | P1 | M | ENGINE-4, WS-1 |
| WS-5 | Reconnexion auto (backoff) | WebSocket | P1 | M | WS-1 |
| PROF-1 | Affichage profil | Profil | P1 | S | AUTH-2 |
| PROF-2 | Affichage bankroll | Profil | P1 | S | AUTH-2 |
| PROF-3 | Stats HUD (VPIP, PFR, 3-Bet) | Profil | P1 | M | ENGINE-5 |
| RESULT-1 | Résumé gains/pertes post-partie | Résultats | P1 | M | ENGINE-5, WS-6 |
| RESULT-4 | Navigation retour (Rejouer/Lobby) | Résultats | P1 | S | RESULT-1 |
| ADMIN-3 | Logs de sécurité temps réel | Admin | P1 | M | ADMIN-6, SEC-5 |
| ADMIN-4 | Statut serveur WebSocket | Admin | P2 | S | ADMIN-6 |
| SEC-4 | CSRF + Rate limiting | Sécurité | P1 | M | AUTH-2 |
| SEC-5 | Audit trail (logs actions sensibles) | Sécurité | P1 | M | — |

---

## 🚀 V2 (Milestone 3) — "Polish & Features avancées"

> Features avancées, sécurité renforcée, UX premium.

| ID | US | Epic | Priorité | Taille | Dépendances |
|----|-----|------|----------|--------|-------------|
| AUTH-4 | Sessions actives + révocation | Auth | P2 | M | AUTH-2, SEC-5 |
| AUTH-5 | "Trust this device" (refresh token) | Auth | P2 | S | AUTH-2 |
| AUTH-6 | Récupération mot de passe | Auth | P2 | M | AUTH-2 |
| PROF-4 | Historique des parties (paginé) | Profil | P2 | L | ENGINE-5 |
| PROF-5 | Gestion sécurité (2FA TOTP) | Profil | P2 | M | AUTH-2 |
| RESULT-2 | Mains clés de la session (biggest pot, bad beats) | Résultats | P2 | L | RESULT-1 |
| RESULT-3 | Stats de session vs stats globales | Résultats | P2 | M | PROF-3, RESULT-1 |
| ADMIN-5 | Ban joueur | Admin | P2 | M | ADMIN-6 |

---

## Vue d'ensemble par Sprint

```
┌─────────────────────────────────────────────────────────────────┐
│                          MVP ROADMAP                            │
├──────────┬──────────┬──────────┬──────────┬────────────────────┤
│  Sprint 1│  Sprint 2│  Sprint 3│  Sprint 4│  V1.1    │  V2     │
│ Fondation│  Engine  │ WebSocket│ Lobby+   │ Profil   │ Polish  │
│ Backend  │  Core    │ UI↔Back  │ Admin    │ Results  │ Advanced│
│          │          │          │          │ Reconnect│ 2FA/Ban │
│  8 US    │  6 US    │  7 US    │  6 US    │ 12 US    │  8 US   │
│  P0      │  P0      │  P0-P1   │  P0-P1   │ P1-P2    │  P2     │
└──────────┴──────────┴──────────┴──────────┴──────────┴─────────┘
```

---

## Chemin critique (dépendances bloquantes)

```
AUTH-2 (Login)
  └→ WS-1 (WebSocket auth)
       └→ WS-2 (Broadcast état)
            └→ TABLE connectée au serveur
                 └→ PARTIE JOUABLE

SEC-3 (CSPRNG)
  └→ ENGINE-1 (Deck)
       └→ ENGINE-2 (Distribution)
            └→ ENGINE-3 (Phases de jeu)
                 └→ ENGINE-4 (Validation actions)
                      └→ ENGINE-5 (Hand evaluator)
                           └→ WS-6 (Résultats)
                                └→ PARTIE COMPLÈTE
```

> **Conclusion** : Les deux branches (Auth + Engine) sont indépendantes et peuvent être développées **en parallèle**. Elles convergent au Sprint 3 (WebSocket).
