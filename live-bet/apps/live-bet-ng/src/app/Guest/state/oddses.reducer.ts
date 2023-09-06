import { createReducer, on } from '@ngrx/store';
import { Match, Odds } from '../sport.component';
import { OdssesActions } from './oddses.actions';

                           // sport    // match   
export const initialState: Map<number, Map<number, Map<number, Odds>>> = new Map<number, Map<number, Map<number, Odds>>>();

export const oddsesReducer = createReducer(
  initialState,
  on(OdssesActions.setOdds, (state, { odds }) => {
    const newMap = new Map<number, Map<number, Map<number, Odds>>> (state.entries())

    let sports = newMap.get(odds.sportId)//?.get(odds.matchId)?.set(odds.subgameId, odds);
    if(sports === undefined) {
      sports = new Map<number, Map<number, Odds>>();
      newMap.set(odds.sportId, sports);
    }

    let matches = sports.get(odds.matchId);
    if(matches === undefined) {
      matches = new Map<number, Odds>();
      sports.set(odds.matchId, matches);
    }

    matches.set(odds.subgameId, odds);
    return newMap;
  })
);