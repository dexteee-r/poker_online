---
name: texas-holdem-poker
description: >
  Skill for mastering Texas Hold'em Poker rules, game flow, hand rankings, betting mechanics, 
  odds calculation, and table etiquette. Use this skill whenever the user asks about poker rules, 
  hand evaluation, betting strategy, pot odds, position play, game simulation, or poker terminology. 
  Also trigger when the user wants to simulate a poker hand, evaluate a board, compare hands, 
  calculate winning probabilities, or understand poker etiquette and table conduct.
---

# SKILL: Texas Hold'em Poker Mastery

## Overview

This skill enables an AI to fully understand, explain, simulate, and reason about Texas Hold'em Poker. 
It covers the complete game flow from blinds to showdown, hand ranking hierarchy, betting mechanics, 
probability fundamentals, positional awareness, and table etiquette. The AI should be able to guide 
beginners through learning the game while also providing accurate technical analysis for experienced 
players.

---

## Core Principles

1. **Always follow the official hand ranking hierarchy** — from Royal Flush (highest) to High Card (lowest), with no exceptions or invented hands
2. **Respect the strict order of game phases** — Preflop → Flop → Turn → River → Showdown
3. **Betting rules are absolute** — a player who says "call" cannot then raise in the same action
4. **Community cards belong to everyone** — always combine the 5 board cards with each player's 2 hole cards to form the best possible 5-card hand
5. **Position matters** — the dealer button, small blind, and big blind rotate clockwise after each hand
6. **Ties are possible** — when two or more players have equivalent hands, the pot is split equally
7. **Information integrity** — never reveal folded cards or discuss hands in progress

---

## Detailed Guidelines

### Game Setup

A standard game requires a 52-card deck with no jokers. Players sit around a table with a designated dealer position (marked by a "button"). The two players to the dealer's left post forced bets called "blinds" before any cards are dealt.

- **Small Blind (SB):** Posted by the player immediately to the dealer's left. Equals half the minimum bet.
- **Big Blind (BB):** Posted by the player two seats to the dealer's left. Equals the minimum bet.
- Example: If the minimum bet is 2 chips, SB = 1 chip, BB = 2 chips.

### Complete Game Flow

#### Phase 1 — Preflop
1. Blinds are posted (SB and BB)
2. Each player receives 2 cards face down (hole cards / pocket cards)
3. Action begins with the player to the LEFT of the big blind (called "Under the Gun")
4. Each player can: **Call** (match the BB), **Raise** (increase the bet), or **Fold** (discard hand)
5. Betting continues clockwise until all active players have put in equal amounts

#### Phase 2 — The Flop
1. Three community cards are dealt face up in the center of the table
2. Betting begins with the first active player to the dealer's LEFT
3. Players can: **Check** (pass without betting) or **Bet**
4. If someone bets, subsequent players can: **Call**, **Raise**, or **Fold**

#### Phase 3 — The Turn
1. A fourth community card is dealt face up
2. Another round of betting follows the same rules as the Flop

#### Phase 4 — The River
1. A fifth and final community card is dealt face up
2. A final round of betting occurs

#### Phase 5 — Showdown
1. Remaining players reveal their hole cards
2. Each player forms the best possible 5-card hand using ANY combination of their 2 hole cards and the 5 community cards
3. The player with the highest-ranking hand wins the pot
4. In case of a tie, the pot is split equally among winners

**Special case:** If the 5 community cards themselves form the best possible hand, all remaining players split the pot.

### Hand Rankings (Highest to Lowest)

| Rank | Hand            | Description                                                    | Odds (5 cards) |
|------|-----------------|----------------------------------------------------------------|-----------------|
| 1    | Royal Flush     | A-K-Q-J-10, all same suit                                     | 1 in 649,740    |
| 2    | Straight Flush  | Five consecutive cards, all same suit (not Ace-high)           | 1 in 72,193     |
| 3    | Four of a Kind  | Four cards of the same rank                                    | 1 in 4,165      |
| 4    | Full House      | Three of a kind + a pair                                       | 1 in 694        |
| 5    | Flush           | Five cards of the same suit (non-consecutive)                  | 1 in 508        |
| 6    | Straight        | Five consecutive cards of mixed suits                          | 1 in 254        |
| 7    | Three of a Kind | Three cards of the same rank                                   | 1 in 47         |
| 8    | Two Pair        | Two different pairs                                            | 1 in 21         |
| 9    | One Pair        | Two cards of the same rank                                     | 1 in 2.4        |
| 10   | High Card       | No combination; highest single card wins                       | 1 in 2.0        |

### Tie-Breaking Rules

- **Royal Flush:** Always a tie (suit doesn't matter) → split pot
- **Straight Flush / Straight:** Highest top card wins
- **Four of a Kind:** Higher quad wins; if same, compare the kicker (5th card)
- **Full House:** Higher three-of-a-kind wins; if tied, compare the pair
- **Flush:** Compare cards from highest to lowest until a difference is found
- **Three of a Kind:** Higher trips win
- **Two Pair:** Higher top pair wins; if tied, compare second pair; if still tied, compare kicker
- **One Pair:** Higher pair wins; if tied, compare kickers from highest to lowest
- **High Card:** Compare cards from highest to lowest

### Card Rankings

Cards are ranked from highest to lowest: **A > K > Q > J > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2**

- Aces are ALWAYS high, except in the low-end straight (A-2-3-4-5, known as "the wheel")
- Suits have NO ranking — no suit is better than another
- Straights CANNOT "wrap around" (e.g., Q-K-A-2-3 is NOT a valid straight)

### Betting Mechanics

#### Player Actions
- **Check:** Pass the action to the next player without betting (only available if no bet has been made in the current round)
- **Bet:** Place chips into the pot (initiates a betting round)
- **Call:** Match the current bet exactly
- **Raise:** Increase the current bet
- **Fold:** Surrender your hand and forfeit any chips already in the pot

#### Key Betting Rules
1. In the Preflop round, checking is NOT possible because the blinds are already in play — you must call, raise, or fold
2. A betting round ends when all active players have contributed equally to the pot
3. A round can be "checked around" (everyone checks, no new money in the pot) — except Preflop
4. You CANNOT borrow or add chips during a hand — only between hands
5. Once you say "call," you CANNOT then raise (no string bets)

---

## Technical Requirements

### For Hand Evaluation (Programmatic)

When implementing hand evaluation logic, the AI must:

```python
# Card representation
RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
SUITS = ['hearts', 'diamonds', 'clubs', 'spades']

# Hand ranking constants (higher = better)
HAND_RANKINGS = {
    'royal_flush':     10,
    'straight_flush':   9,
    'four_of_a_kind':   8,
    'full_house':       7,
    'flush':            6,
    'straight':         5,
    'three_of_a_kind':  4,
    'two_pair':         3,
    'one_pair':         2,
    'high_card':        1
}

def evaluate_best_hand(hole_cards, community_cards):
    """
    Given 2 hole cards and 5 community cards,
    evaluate ALL possible 5-card combinations (C(7,5) = 21 combos)
    and return the best hand.
    """
    from itertools import combinations
    all_cards = hole_cards + community_cards
    best_hand = None
    for combo in combinations(all_cards, 5):
        hand_rank = classify_hand(combo)
        if best_hand is None or hand_rank > best_hand:
            best_hand = hand_rank
    return best_hand
```

### For Odds Calculation

```python
# Basic pot odds calculation
def calculate_pot_odds(pot_size, call_amount):
    """
    Returns the pot odds as a ratio.
    If pot = 100 and call = 20, pot odds = 100:20 = 5:1
    You need to win >1/(5+1) = 16.7% of the time to break even.
    """
    ratio = pot_size / call_amount
    break_even_pct = 1 / (ratio + 1) * 100
    return {
        'ratio': f"{ratio:.1f}:1",
        'break_even_percentage': f"{break_even_pct:.1f}%"
    }

# Common drawing odds (approximate)
DRAWING_ODDS = {
    'flush_draw_flop_to_river':   '35%',   # 9 outs, 2 cards to come
    'flush_draw_turn_to_river':   '19.6%', # 9 outs, 1 card to come
    'open_straight_draw_flop':    '31.5%', # 8 outs, 2 cards to come
    'open_straight_draw_turn':    '17.4%', # 8 outs, 1 card to come
    'gutshot_straight_flop':      '16.5%', # 4 outs, 2 cards to come
    'gutshot_straight_turn':      '8.7%',  # 4 outs, 1 card to come
    'one_pair_to_two_pair_or_set':'8.4%',  # 5 outs, 1 card to come
}

# Rule of 2 and 4 (quick mental approximation)
def quick_odds(outs, cards_to_come):
    """
    Quick mental math for drawing odds.
    After the Flop (2 cards to come): outs * 4 = approximate %
    After the Turn (1 card to come): outs * 2 = approximate %
    """
    multiplier = 4 if cards_to_come == 2 else 2
    return f"~{outs * multiplier}%"
```

---

## Examples

### Example 1: Evaluating a Showdown

**Scenario:**
- Player A: K♠ Q♠ (hole cards)
- Player B: 8♥ 8♦ (hole cards)
- Board: 10♠ J♠ A♠ 3♦ 7♣

**Analysis:**
- Player A: Has K♠, Q♠ + 10♠, J♠, A♠ on the board → **Royal Flush** (A-K-Q-J-10, all spades)
- Player B: Has 8♥, 8♦ + best 3 from board → **One Pair** (pair of eights)
- **Winner: Player A** with a Royal Flush

### Example 2: Tie Scenario

**Scenario:**
- Player A: 4♣ 5♣
- Player B: 4♦ 6♦
- Board: A♠ A♥ A♦ A♣ K♠

**Analysis:**
- The board contains Four Aces + King
- Player A's best hand: A♠ A♥ A♦ A♣ K♠ (Four Aces, King kicker)
- Player B's best hand: A♠ A♥ A♦ A♣ K♠ (Four Aces, King kicker)
- Neither player's hole cards improve the board
- **Result: TIE** — pot is split

### Example 3: Betting Round Walkthrough

**Setup:** 3 players, blinds are 1/2 chips. Preflop round.

| Step | Player   | Action         | Pot  |
|------|----------|----------------|------|
| 1    | SB       | Posts 1 chip   | 1    |
| 2    | BB       | Posts 2 chips  | 3    |
| 3    | Player C | Calls 2        | 5    |
| 4    | SB       | Calls 1 more   | 6    |
| 5    | BB       | Checks         | 6    |

The round ends. All players have 2 chips in the pot. Flop is dealt.

---

## Common Pitfalls / Anti-patterns

❌ **DO NOT:**

- **Confuse hand rankings** — A Flush does NOT beat a Full House. Memorize the hierarchy.
- **Allow "wrap-around" straights** — Q-K-A-2-3 is NOT a valid straight. Only A-2-3-4-5 (wheel) and 10-J-Q-K-A (broadway) are valid Ace straights.
- **Rank suits** — No suit is higher than another in Texas Hold'em. Two identical hands with different suits are a tie.
- **Forget the kicker** — When two players have the same hand type, the kicker (highest unused card) often decides the winner.
- **Allow string bets** — A player who says "I call" cannot then add "...and raise." The action is locked at "call."
- **Let players add chips mid-hand** — Chips can only be added between hands, never during one.
- **Reveal folded cards** — Once folded, cards go into the muck face down. Showing them gives unfair information.
- **Splash the pot** — Never toss chips messily into the center. Stack them neatly in front of you.
- **Skip the blinds** — Blinds are mandatory. The game cannot proceed without them.
- **Evaluate only hole cards** — Always consider all 7 available cards (2 hole + 5 community) and pick the best 5.
- **Assume the best hand is always made from both hole cards** — Sometimes the best hand uses only 1 hole card, or even 0 (the board plays).

---

## Best Practices

✅ **DO:**

- **Always enumerate all 21 possible 5-card combinations** (C(7,5)) when evaluating the best hand programmatically
- **State the complete hand explicitly** — e.g., "Full House, Kings over Fours" not just "Full House"
- **Announce the winning hand AND explain why** it beats the other hands at the table
- **Track pot size continuously** through each betting round for accurate pot odds calculations
- **Consider position** — players who act later have more information and a strategic advantage
- **Apply the Rule of 2 and 4** for quick mental odds estimation: multiply outs by 4 after the Flop, by 2 after the Turn
- **Count outs accurately** — the number of unseen cards that would improve your hand
- **Verify board texture** — Is it suited? Connected? Paired? This affects the range of possible hands
- **Explain terminology** when interacting with beginners (e.g., define "outs," "kicker," "muck")
- **Respect etiquette rules** — they are as important as game rules for fair play

---

## Quality Criteria

A correct application of this skill meets ALL of the following:

1. ☑ Hand rankings are ALWAYS applied in the correct order (Royal Flush > Straight Flush > ... > High Card)
2. ☑ Game phases are ALWAYS described in the correct sequence (Preflop → Flop → Turn → River → Showdown)
3. ☑ Betting actions are accurate — no illegal moves (e.g., checking when a bet is pending in Preflop)
4. ☑ Tie-breaking logic is correctly applied with kickers
5. ☑ Straights are validated — no wrap-arounds, Ace can be high or low only
6. ☑ Community cards are properly shared among all players
7. ☑ Probability calculations are mathematically sound
8. ☑ Card counts are respected — a standard 52-card deck, no duplicates
9. ☑ Explanations are clear for the target audience (beginner vs. experienced)
10. ☑ Etiquette rules are mentioned when relevant to a scenario

---

## Edge Cases

### 1. The Board Plays
If the 5 community cards form a hand that no player can beat with their hole cards, all remaining players share the pot equally. Example: Board is A♠ K♠ Q♠ J♠ 10♠ (Royal Flush on the board) — no player can beat it.

### 2. The Wheel (Low Straight)
A-2-3-4-5 is a valid straight, with the 5 being the high card (not the Ace). This is the lowest possible straight.

### 3. Split Pot with Different Hole Cards
Player A: K♣ 2♦, Player B: K♥ 3♥, Board: A♠ A♦ A♣ A♥ Q♠. Both players' best hand is Four Aces with Queen kicker. The different hole cards are irrelevant → split pot.

### 4. Running Out of Chips (All-In)
A player who cannot match a bet can go "all-in" with their remaining chips. They are eligible to win only the portion of the pot they contributed to. A side pot is created for the remaining players.

### 5. Single Player Remaining
If all other players fold, the last remaining player wins the pot WITHOUT needing to show their cards.

### 6. Identical Pairs, Kicker Decides
Player A: K♠ 9♦, Player B: K♦ 10♣, Board: K♣ 5♥ 2♠ 8♦ 3♣. Both have a pair of Kings. Player B wins because their 10 kicker beats Player A's 9 kicker.

### 7. Three-of-a-Kind on the Board
If the board contains three-of-a-kind (e.g., 7-7-7-J-3), the player with the highest kicker among their hole cards wins. If both players' hole cards are lower than the board's remaining cards, it could be a split.

### 8. Flush with Shared Cards
Player A: A♥ 2♥, Player B: K♥ Q♥, Board: 10♥ 8♥ 5♥ J♣ 3♦. Both have a Heart flush, but Player A's Ace-high flush beats Player B's King-high flush.

---

## Glossary of Key Terms

| Term           | Definition                                                           |
|----------------|----------------------------------------------------------------------|
| Hole Cards     | The 2 private cards dealt face down to each player                   |
| Community Cards| The 5 shared cards dealt face up on the board                        |
| Flop           | The first 3 community cards dealt together                           |
| Turn           | The 4th community card                                               |
| River          | The 5th and final community card                                     |
| Blinds         | Forced bets posted before the deal (Small Blind + Big Blind)         |
| Pot            | The total chips wagered in the current hand                          |
| Kicker         | The highest unused card that breaks ties between identical hands     |
| Outs           | Cards remaining in the deck that would improve your hand             |
| Muck           | The pile of discarded/folded cards                                   |
| Showdown       | When remaining players reveal cards to determine the winner          |
| All-In         | Betting all remaining chips                                          |
| Side Pot       | A separate pot created when a player goes all-in                     |
| Button/Dealer  | The position that determines blinds and betting order                |
| Under the Gun  | The player first to act Preflop (left of Big Blind)                  |
| Check          | Pass without betting (only when no bet is pending)                   |
| String Bet     | An illegal bet where a player says "call" then tries to raise        |
| Splash the Pot | Throwing chips messily into the center (bad etiquette)               |
