import { createReducer, on } from '@ngrx/store';
import { Match, OddsKey } from '../sport.component';
import { OdssesActions } from './oddses.actions';

                           // sport    // match   
export const initialState: Map<number, Map<number, Map<number, number>>> = new Map<number, Map<number, Map<number, number>>>();

export const oddsesReducer = createReducer(
  initialState,
  on(OdssesActions.setOdds, (state, { oddsKey, value }) => {
    const newMap = new Map<number, Map<number, Map<number, number>>> (state.entries())

    let sports = newMap.get(oddsKey.sportId)//?.get(odds.matchId)?.set(odds.subgameId, odds);
    if(sports === undefined) {
      sports = new Map<number, Map<number, number>>();
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