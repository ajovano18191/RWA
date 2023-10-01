export interface OddsKey {
    sportId: number,
    matchId: number,
    subgameId: number,
}

export function newOddsKey(): OddsKey {
  return {
    sportId: 0,
    matchId: 0,
    subgameId: 0,
  };
}