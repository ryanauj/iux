// ABOUTME: Static game seed data for the sports demo: 9 final games (2026-05-15 to 05-22), one live game (2026-05-23 at Q3), and 5 scheduled future games; quarter scores and top-performer lines are included for all finished games.

import type { Game } from '../types'

// Anchor window: today's "live" game is 2026-05-23. Earlier dates are
// final, later dates are scheduled. Dates are baked so the data doesn't
// drift with the host clock.
export const GAMES: Game[] = [
  // ----- Finals (past) -----
  {
    id: 'game-001',
    date: '2026-05-15',
    homeTeamId: 'team-bos',
    awayTeamId: 'team-nyk',
    status: 'final',
    homeScore: 118,
    awayScore: 109,
    quarterScores: [
      { home: 28, away: 24 },
      { home: 31, away: 29 },
      { home: 27, away: 30 },
      { home: 32, away: 26 },
    ],
    topPerformers: [
      { playerId: 'player-tatum', line: '34 PTS, 9 REB, 5 AST' },
      { playerId: 'player-brunson', line: '31 PTS, 4 REB, 7 AST' },
      { playerId: 'player-brown', line: '24 PTS, 6 REB, 3 AST' },
    ],
  },
  {
    id: 'game-002',
    date: '2026-05-16',
    homeTeamId: 'team-den',
    awayTeamId: 'team-lal',
    status: 'final',
    homeScore: 124,
    awayScore: 117,
    quarterScores: [
      { home: 33, away: 30 },
      { home: 29, away: 28 },
      { home: 30, away: 28 },
      { home: 32, away: 31 },
    ],
    topPerformers: [
      { playerId: 'player-jokic', line: '38 PTS, 14 REB, 11 AST' },
      { playerId: 'player-lebron', line: '29 PTS, 6 REB, 9 AST' },
      { playerId: 'player-murray', line: '23 PTS, 3 REB, 6 AST' },
    ],
  },
  {
    id: 'game-003',
    date: '2026-05-17',
    homeTeamId: 'team-mil',
    awayTeamId: 'team-phi',
    status: 'final',
    homeScore: 112,
    awayScore: 114,
    quarterScores: [
      { home: 26, away: 31 },
      { home: 30, away: 27 },
      { home: 28, away: 28 },
      { home: 28, away: 28 },
    ],
    topPerformers: [
      { playerId: 'player-embiid', line: '37 PTS, 12 REB, 4 AST' },
      { playerId: 'player-giannis', line: '33 PTS, 11 REB, 6 AST' },
      { playerId: 'player-maxey', line: '28 PTS, 3 REB, 7 AST' },
    ],
  },
  {
    id: 'game-004',
    date: '2026-05-18',
    homeTeamId: 'team-gsw',
    awayTeamId: 'team-phx',
    status: 'final',
    homeScore: 121,
    awayScore: 119,
    quarterScores: [
      { home: 30, away: 28 },
      { home: 33, away: 32 },
      { home: 27, away: 28 },
      { home: 31, away: 31 },
    ],
    topPerformers: [
      { playerId: 'player-curry', line: '36 PTS, 5 REB, 8 AST' },
      { playerId: 'player-durant', line: '34 PTS, 7 REB, 4 AST' },
      { playerId: 'player-booker', line: '30 PTS, 4 REB, 6 AST' },
    ],
  },
  {
    id: 'game-005',
    date: '2026-05-19',
    homeTeamId: 'team-mia',
    awayTeamId: 'team-bos',
    status: 'final',
    homeScore: 102,
    awayScore: 115,
    quarterScores: [
      { home: 24, away: 31 },
      { home: 27, away: 29 },
      { home: 26, away: 27 },
      { home: 25, away: 28 },
    ],
    topPerformers: [
      { playerId: 'player-tatum', line: '29 PTS, 7 REB, 6 AST' },
      { playerId: 'player-butler', line: '24 PTS, 6 REB, 5 AST' },
      { playerId: 'player-porzingis', line: '22 PTS, 9 REB, 3 BLK' },
    ],
  },
  {
    id: 'game-006',
    date: '2026-05-20',
    homeTeamId: 'team-dal',
    awayTeamId: 'team-den',
    status: 'final',
    homeScore: 119,
    awayScore: 116,
    quarterScores: [
      { home: 31, away: 29 },
      { home: 28, away: 30 },
      { home: 30, away: 28 },
      { home: 30, away: 29 },
    ],
    topPerformers: [
      { playerId: 'player-doncic', line: '41 PTS, 10 REB, 12 AST' },
      { playerId: 'player-jokic', line: '32 PTS, 13 REB, 9 AST' },
      { playerId: 'player-irving', line: '27 PTS, 4 REB, 6 AST' },
    ],
  },
  {
    id: 'game-007',
    date: '2026-05-21',
    homeTeamId: 'team-nyk',
    awayTeamId: 'team-mil',
    status: 'final',
    homeScore: 108,
    awayScore: 105,
    quarterScores: [
      { home: 26, away: 30 },
      { home: 28, away: 25 },
      { home: 27, away: 26 },
      { home: 27, away: 24 },
    ],
    topPerformers: [
      { playerId: 'player-brunson', line: '34 PTS, 5 REB, 8 AST' },
      { playerId: 'player-giannis', line: '30 PTS, 10 REB, 5 AST' },
      { playerId: 'player-randle', line: '22 PTS, 11 REB, 4 AST' },
    ],
  },
  {
    id: 'game-008',
    date: '2026-05-22',
    homeTeamId: 'team-phi',
    awayTeamId: 'team-mia',
    status: 'final',
    homeScore: 117,
    awayScore: 110,
    quarterScores: [
      { home: 29, away: 26 },
      { home: 31, away: 28 },
      { home: 28, away: 27 },
      { home: 29, away: 29 },
    ],
    topPerformers: [
      { playerId: 'player-embiid', line: '33 PTS, 11 REB, 5 AST' },
      { playerId: 'player-adebayo', line: '24 PTS, 9 REB, 3 BLK' },
      { playerId: 'player-maxey', line: '26 PTS, 4 REB, 6 AST' },
    ],
  },
  {
    id: 'game-009',
    date: '2026-05-22',
    homeTeamId: 'team-lal',
    awayTeamId: 'team-gsw',
    status: 'final',
    homeScore: 113,
    awayScore: 121,
    quarterScores: [
      { home: 28, away: 31 },
      { home: 27, away: 30 },
      { home: 31, away: 29 },
      { home: 27, away: 31 },
    ],
    topPerformers: [
      { playerId: 'player-curry', line: '40 PTS, 4 REB, 7 AST' },
      { playerId: 'player-lebron', line: '28 PTS, 8 REB, 9 AST' },
      { playerId: 'player-davis', line: '26 PTS, 12 REB, 2 BLK' },
    ],
  },

  // ----- Live (today) -----
  {
    id: 'game-010',
    date: '2026-05-23',
    homeTeamId: 'team-bos',
    awayTeamId: 'team-mil',
    status: 'live',
    homeScore: 67,
    awayScore: 62,
    quarter: 3,
    timeRemaining: '5:23',
  },

  // ----- Scheduled (future) -----
  {
    id: 'game-011',
    date: '2026-05-24',
    homeTeamId: 'team-den',
    awayTeamId: 'team-dal',
    status: 'scheduled',
  },
  {
    id: 'game-012',
    date: '2026-05-25',
    homeTeamId: 'team-phx',
    awayTeamId: 'team-lal',
    status: 'scheduled',
  },
  {
    id: 'game-013',
    date: '2026-05-26',
    homeTeamId: 'team-mia',
    awayTeamId: 'team-nyk',
    status: 'scheduled',
  },
  {
    id: 'game-014',
    date: '2026-05-28',
    homeTeamId: 'team-phi',
    awayTeamId: 'team-bos',
    status: 'scheduled',
  },
  {
    id: 'game-015',
    date: '2026-05-30',
    homeTeamId: 'team-gsw',
    awayTeamId: 'team-den',
    status: 'scheduled',
  },
]

// ABOUTME: The "today" anchor used by the seed data; pages that show "Today's games" key off it.
/** The "today" anchor used by the seed data; pages that show "Today's games" key off it. */
export const TODAY = '2026-05-23'
