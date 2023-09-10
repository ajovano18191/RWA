import { createReducer, on } from '@ngrx/store';
import { OddsActions } from './odds.actions';
import { MatchMap, OfferMap, SportMap } from './types';

const initialState: OfferMap = new Map<number, SportMap>();

export const oddsReducer = createReducer(
  initialState,
  on(OddsActions.setOdds, (state, { oddsKey, value }) => {
    const newMap: OfferMap = new Map<number, SportMap> (state.entries())

    let sports = newMap.get(oddsKey.sportId)//?.get(odds.matchId)?.set(odds.subgameId, odds);
    if(sports === undefined) {
      sports = new Map<number, MatchMap>();
      newMap.set(oddsKey.sportId, sports);
    }

    let matches = sports.get(oddsKey.matchId);
    if(matches === undefined) {
      matches = new Map<number, number>();
      sports.set(oddsKey.matchId, matches);
    }

    matches.set(oddsKey.subgameId, value);
    return newMap;
  })
);