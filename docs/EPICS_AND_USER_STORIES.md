# The High Roller — Epics & User Stories

> Document de référence produit pour le développement du Texas Hold'em multijoueur privé.
> Chaque User Story suit le format : **En tant que [rôle], je veux [action], afin de [bénéfice].**
> Estimation de complexité : S (Small), M (Medium), L (Large), XL (Extra-Large)

---

## EPIC 1 — Authentification & Gestion des Utilisateurs

> Système d'accès sécurisé par invitation. Pas d'inscription ouverte : chaque joueur reçoit un token d'invitation de l'admin.

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| AUTH-1 | En tant que **joueur invité**, je veux m'inscrire avec mon email, mot de passe et token d'invitation, afin d'accéder à la plateforme. | M | - Validation du token côté serveur<br>- Hash du mot de passe (bcrypt/argon2)<br>- Rejet si token invalide/expiré |
| AUTH-2 | En tant que **joueur inscrit**, je veux me connecter avec mon email et mot de passe, afin d'accéder à mon compte. | S | - Session JWT ou cookie httpOnly<br>- Rate limiting sur les tentatives<br>- Message d'erreur générique (pas de leak d'info) |
| AUTH-3 | En tant que **joueur connecté**, je veux me déconnecter, afin de sécuriser ma session. | S | - Invalidation de la session côté serveur<br>- Redirection vers la landing page |
| AUTH-4 | En tant que **joueur connecté**, je veux voir mes sessions actives et pouvoir les révoquer, afin de contrôler l'accès à mon compte. | M | - Liste des devices/IP avec timestamp<br>- Bouton "Kill Session" fonctionnel |
| AUTH-5 | En tant que **joueur**, je veux pouvoir cocher "Trust this device", afin de ne pas me reconnecter à chaque visite. | S | - Cookie persistant (refresh token)<br>- Durée configurable par l'admin |
| AUTH-6 | En tant que **joueur**, je veux récupérer l'accès à mon compte si j'ai perdu mon mot de passe, afin de ne pas être bloqué. | M | - Flow "Lost access?" par email<br>- Token de reset à usage unique, expire en 15min |

---

## EPIC 2 — Moteur de Jeu (Poker Engine)

> Toute la logique métier du Texas Hold'em. Exécuté **exclusivement côté serveur**. Le client ne reçoit jamais d'information qu'il ne devrait pas connaître.

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| ENGINE-1 | En tant que **serveur**, je veux créer et mélanger un deck de 52 cartes, afin de distribuer des mains aléatoires et équitables. | S | - Algorithme Fisher-Yates<br>- Seed crypto (pas Math.random) |
| ENGINE-2 | En tant que **serveur**, je veux distribuer 2 cartes à chaque joueur (preflop), afin de démarrer une main. | S | - Chaque joueur reçoit uniquement SES cartes<br>- Les autres joueurs ne voient rien |
| ENGINE-3 | En tant que **serveur**, je veux gérer les phases de jeu (preflop → flop → turn → river → showdown), afin de respecter les règles du Texas Hold'em. | L | - Machine à états stricte<br>- Impossible de sauter une phase<br>- Cartes communes révélées au bon moment |
| ENGINE-4 | En tant que **serveur**, je veux valider chaque action joueur (fold, check, call, raise, all-in), afin d'empêcher toute triche. | L | - Vérification : c'est bien le tour du joueur<br>- Vérification : le joueur a assez de jetons<br>- Vérification : le raise respecte le minimum |
| ENGINE-5 | En tant que **serveur**, je veux évaluer les mains au showdown et déterminer le(s) gagnant(s), afin d'attribuer le pot. | XL | - Classement complet (high card → royal flush)<br>- Gestion des égalités (split pot)<br>- Kicker comparison |
| ENGINE-6 | En tant que **serveur**, je veux gérer les side pots quand un joueur est all-in, afin que les règles de redistribution soient correctes. | L | - Calcul correct des side pots multiples<br>- Attribution du bon pot au bon gagnant |
| ENGINE-7 | En tant que **serveur**, je veux gérer la rotation du dealer, small blind et big blind, afin que les positions tournent correctement. | M | - Rotation clockwise<br>- Gestion heads-up (2 joueurs) spéciale |
| ENGINE-8 | En tant que **serveur**, je veux gérer un timer par joueur (ex: 30s par action), afin d'éviter le stalling. | M | - Auto-fold si timeout<br>- Timer visible côté client<br>- Pas de triche possible côté client sur le timer |
| ENGINE-9 | En tant que **serveur**, je veux gérer les joueurs qui se déconnectent en pleine partie, afin que le jeu continue. | M | - Auto-fold/check si déconnecté<br>- Possibilité de revenir (reconnexion)<br>- Timeout de reconnexion configurable |

---

## EPIC 3 — Temps Réel (WebSocket / Socket.io)

> Communication bidirectionnelle entre le serveur et les clients. Chaque joueur reçoit un état filtré (il ne voit pas les cartes des autres).

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| WS-1   | En tant que **joueur**, je veux me connecter à une table via WebSocket, afin de recevoir les mises à jour en temps réel. | M | - Connexion Socket.io authentifiée<br>- Rejection si pas de session valide |
| WS-2   | En tant que **joueur**, je veux recevoir l'état du jeu mis à jour après chaque action, afin de voir le board et les stacks actuels. | M | - State filtré par joueur (pas les cartes adverses)<br>- Broadcast après chaque changement d'état |
| WS-3   | En tant que **joueur**, je veux envoyer mes actions (fold, call, raise) via WebSocket, afin de jouer mon tour. | S | - Le serveur valide chaque action (voir ENGINE-4)<br>- Réponse d'erreur si action invalide |
| WS-4   | En tant que **joueur**, je veux être notifié quand un joueur rejoint ou quitte la table, afin de savoir qui est en jeu. | S | - Events `player_joined` / `player_left`<br>- Mise à jour de la liste des joueurs |
| WS-5   | En tant que **joueur**, je veux me reconnecter automatiquement après une coupure réseau, afin de ne pas perdre ma place. | M | - Reconnexion auto avec backoff exponentiel<br>- Récupération de l'état complet à la reconnexion |
| WS-6   | En tant que **joueur**, je veux recevoir les résultats d'une main (qui a gagné, avec quelles cartes), afin de voir le showdown. | S | - Event `hand_result` avec cartes révélées<br>- Montant gagné par chaque joueur |

---

## EPIC 4 — Interface Table de Jeu

> L'UI de la table de poker. Composants déjà prototypés, à connecter au hook `usePokerGame` + WebSocket.

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| TABLE-1 | En tant que **joueur**, je veux voir mes 2 cartes (hole cards) clairement identifiables, afin de prendre mes décisions. | S | - Cartes visibles uniquement pour le joueur concerné<br>- Animation d'apparition |
| TABLE-2 | En tant que **joueur**, je veux voir les cartes communes (flop, turn, river) apparaître au centre de la table, afin de suivre la progression de la main. | S | - Animation séquentielle (3 cartes flop, puis 1, puis 1)<br>- Cartes cachées des adversaires avant révélation |
| TABLE-3 | En tant que **joueur**, je veux voir le pot total et les blinds en cours, afin de calculer mes cotes. | S | - Affichage en temps réel<br>- Format monétaire lisible |
| TABLE-4 | En tant que **joueur**, je veux voir le stack de chaque joueur à la table, afin d'adapter ma stratégie. | S | - Mise à jour en temps réel après chaque action<br>- Indicateur visuel du joueur actif |
| TABLE-5 | En tant que **joueur**, je veux utiliser les boutons Fold, Call, Raise pour jouer mon tour, afin d'interagir avec le jeu. | M | - Boutons activés uniquement quand c'est mon tour<br>- Boutons désactivés sinon (pas de double-action) |
| TABLE-6 | En tant que **joueur**, je veux ajuster ma mise avec un slider et des presets (1/4, 1/2, Pot, Max), afin de choisir précisément mon montant. | S | - Slider borné (min raise → stack max)<br>- Presets calculés dynamiquement |
| TABLE-7 | En tant que **joueur**, je veux voir un timer visuel quand c'est mon tour, afin de savoir combien de temps il me reste. | S | - Barre de progression qui se vide<br>- Synchronisée avec le timer serveur |
| TABLE-8 | En tant que **joueur**, je veux voir l'historique des actions de la main en cours dans un panneau latéral, afin de suivre les mouvements. | S | - Scroll automatique vers la dernière action<br>- Code couleur par type d'action |
| TABLE-9 | En tant que **joueur**, je veux quitter la table proprement (bouton Leave), afin de sortir du jeu sans bug. | S | - Déconnexion WebSocket propre<br>- Retrait du joueur de la table côté serveur |
| TABLE-10 | En tant que **joueur**, je veux que l'interface soit responsive (mobile + desktop), afin de jouer depuis n'importe quel device. | M | - Layout adaptatif (déjà prototypé)<br>- Touch-friendly sur mobile |

---

## EPIC 5 — Lobby & Création de Table

> Espace pour rejoindre ou créer une table avant de jouer. C'est le hub central.

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| LOBBY-1 | En tant que **joueur**, je veux voir la liste des tables disponibles, afin de choisir laquelle rejoindre. | M | - Affichage : nom, nb joueurs, blinds, statut<br>- Refresh temps réel |
| LOBBY-2 | En tant que **joueur**, je veux rejoindre une table en cliquant dessus, afin de commencer à jouer. | S | - Vérification que la table n'est pas pleine<br>- Vérification du buy-in minimum |
| LOBBY-3 | En tant que **joueur**, je veux créer une table privée avec des paramètres personnalisés, afin d'inviter mes potes. | M | - Config : blinds, nb max joueurs, buy-in min/max<br>- Génération d'un lien/code de table |
| LOBBY-4 | En tant que **joueur**, je veux rejoindre une table privée via un code/lien, afin de rejoindre la partie de mes amis. | S | - Validation du code<br>- Redirection vers la table |

---

## EPIC 6 — Profil & Statistiques

> Dashboard personnel avec stats poker avancées (HUD) et gestion de compte. UI déjà prototypée.

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| PROF-1 | En tant que **joueur**, je veux voir mon profil (pseudo, clearance, date d'inscription), afin de connaître mon identité sur la plateforme. | S | - Données récupérées via API |
| PROF-2 | En tant que **joueur**, je veux voir mon solde de jetons (bankroll), afin de savoir combien je peux miser. | S | - Valeur synchronisée avec le serveur<br>- Tendance sur 7 jours |
| PROF-3 | En tant que **joueur**, je veux voir mes stats HUD (VPIP, PFR, 3-Bet, win rate, nb mains), afin de suivre ma progression. | M | - Calculs côté serveur<br>- Barres de progression visuelles |
| PROF-4 | En tant que **joueur**, je veux consulter mon historique de parties, afin de revoir mes sessions passées. | L | - Liste paginée des sessions<br>- Détail par main (optionnel V2) |
| PROF-5 | En tant que **joueur**, je veux gérer ma sécurité (sessions actives, 2FA), afin de protéger mon compte. | M | - Liste des sessions avec kill<br>- Activation/désactivation 2FA (TOTP) |

---

## EPIC 7 — Page Résultats Post-Partie

> Écran affiché après une partie terminée. Résumé des performances, gains/pertes, stats de la session.

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| RESULT-1 | En tant que **joueur**, je veux voir un résumé de mes gains/pertes après une partie, afin de savoir comment j'ai performé. | M | - Total gagné/perdu<br>- Classement à la table |
| RESULT-2 | En tant que **joueur**, je veux voir les mains clés de la session (biggest pot, bad beats), afin de revivre les moments forts. | L | - Sélection automatique des mains marquantes<br>- Replay visuel simplifié |
| RESULT-3 | En tant que **joueur**, je veux voir mes stats de session (VPIP, PFR, agressivité), afin de comparer avec mes stats globales. | M | - Comparaison session vs global<br>- Indicateurs de tendance |
| RESULT-4 | En tant que **joueur**, je veux pouvoir retourner au lobby ou quitter après le résumé, afin de décider de la suite. | S | - Boutons "Rejouer" / "Retour au lobby" |

---

## EPIC 8 — Administration

> Console root pour l'admin (toi). Gestion des joueurs, jetons, invitations, logs. UI déjà prototypée.

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| ADMIN-1 | En tant qu'**admin**, je veux générer des tokens d'invitation, afin d'onboarder de nouveaux joueurs. | M | - Génération crypto (16 chars)<br>- Stockage en DB avec expiration<br>- Copier en un clic |
| ADMIN-2 | En tant qu'**admin**, je veux ajouter (Mint) ou retirer (Burn) des jetons à un joueur, afin de gérer la bankroll du réseau. | M | - Validation du username/ID<br>- Historique de chaque opération (audit trail)<br>- Pas de solde négatif |
| ADMIN-3 | En tant qu'**admin**, je veux voir les logs de sécurité (connexions, tentatives échouées, bruteforce), afin de surveiller le réseau. | M | - Logs temps réel (WebSocket ou polling)<br>- Filtrage par statut (ok/warn/danger)<br>- Export CSV |
| ADMIN-4 | En tant qu'**admin**, je veux voir le statut du serveur WebSocket (latence, connexions, uptime), afin de monitorer la santé du système. | S | - Données actualisées en temps réel |
| ADMIN-5 | En tant qu'**admin**, je veux pouvoir bannir un joueur, afin de gérer les comportements problématiques. | M | - Ban par username/ID<br>- Déconnexion immédiate du joueur<br>- Inscription dans les logs |
| ADMIN-6 | En tant qu'**admin**, je veux protéger l'accès à la console admin, afin que seul le root puisse y accéder. | S | - Middleware de vérification du rôle<br>- Redirection si non-admin |

---

## EPIC 9 — Landing Page & Onboarding

> Vitrine publique de la plateforme. UI déjà convertie en TypeScript.

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| LAND-1 | En tant que **visiteur**, je veux voir une landing page présentant la plateforme, afin de comprendre le concept. | S | - Déjà implémentée (/) |
| LAND-2 | En tant que **visiteur**, je veux accéder à la page de connexion/inscription via la landing, afin de rejoindre la plateforme. | S | - Liens "Sign In" / "Play Now" fonctionnels |
| LAND-3 | En tant que **visiteur**, je veux voir les mentions légales (21+, jeu responsable), afin d'être informé des conditions. | S | - Déjà implémenté dans le footer |

---

## EPIC 10 — Sécurité & Anti-Triche

> Couche transversale de sécurité. Pas une feature visible, mais critique pour l'intégrité du jeu.

| ID     | User Story | Taille | Critères d'acceptation |
|--------|-----------|--------|----------------------|
| SEC-1  | En tant que **serveur**, je veux ne jamais envoyer les cartes des adversaires au client, afin qu'aucun sniffing réseau ne permette de tricher. | M | - État filtré par joueur<br>- Vérification par audit du payload WebSocket |
| SEC-2  | En tant que **serveur**, je veux valider chaque action côté serveur (jamais faire confiance au client), afin de prévenir toute manipulation. | M | - Rejet systématique des actions invalides<br>- Logging des tentatives suspectes |
| SEC-3  | En tant que **serveur**, je veux utiliser un CSPRNG (Cryptographically Secure PRNG) pour le mélange des cartes, afin de garantir un shuffle non prédictible. | S | - crypto.getRandomValues ou équivalent<br>- Pas de Math.random() |
| SEC-4  | En tant que **serveur**, je veux protéger les API Routes avec des tokens CSRF et rate limiting, afin de bloquer les attaques automatisées. | M | - Rate limiting (ex: 5 tentatives login / min)<br>- CSRF token sur les mutations |
| SEC-5  | En tant que **serveur**, je veux logger toutes les actions sensibles (login, mint/burn, ban), afin de maintenir un audit trail complet. | M | - Logs structurés avec timestamp, IP, action<br>- Stockage persistant |

---

## Résumé des Epics

| # | Epic | Nb US | Complexité globale |
|---|------|-------|--------------------|
| 1 | Authentification & Users | 6 | M |
| 2 | Moteur de Jeu (Engine) | 9 | XL |
| 3 | Temps Réel (WebSocket) | 6 | L |
| 4 | Interface Table de Jeu | 10 | M |
| 5 | Lobby & Création de Table | 4 | M |
| 6 | Profil & Statistiques | 5 | M |
| 7 | Page Résultats | 4 | L |
| 8 | Administration | 6 | M |
| 9 | Landing & Onboarding | 3 | S |
| 10 | Sécurité & Anti-Triche | 5 | L |
| **Total** | | **58 US** | |
