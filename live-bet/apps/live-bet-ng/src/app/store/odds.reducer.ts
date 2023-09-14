import { createReducer, on } from '@ngrx/store';
import { OddsActions } from './odds.actions';
import { MatchMap, OfferMap, SportMap } from './types';

const initialState: OfferMap = new Map<number, SportMap>();

export const oddsReducer = createReducer(
  initialState,
  on(OddsActions.setOdds, (state, { oddsKey, value }) => {
    const newMap: OfferMap = new Map<number, SportMap> (state.entries());

    let sport = newMap.get(oddsKey.sportId)//?.get(odds.matchId)?.set(odds.subgameId, odds);
    if(sport === undefined) {
      sport = new Map<number, MatchMap>();
      newMap.set(oddsKey.sportId, sport);
    }

    let match = sport.get(oddsKey.matchId);
    if(match === undefined) {
      match = new Map<number, number>();
      sport.set(oddsKey.matchId, match);
    }

    match.set(oddsKey.subgameId, value);
    return newMap;
  }),
  on(OddsActions.removeMatch, (state, { sportId, matchId }) => {
    const newMap: OfferMap = new Map<number, SportMap> (state.entries());
    newMap.get(sportId)?.delete(matchId);
    return newMap;
  })
);