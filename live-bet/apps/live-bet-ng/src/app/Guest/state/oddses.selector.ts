import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OddsKey } from "../sport.component";

export const selectOddsesWithoutParameters = createFeatureSelector<Map<number, Map<number, Map<number, number>>>>('oddses');
export const selectOddses = (oddsKey: OddsKey) =>
    createSelector(selectOddsesWithoutParameters, (oddses) => oddses.get(oddsKey.sportId)?.get(oddsKey.matchId)?.get(oddsKey.subgameId));

export const selectMatchesWithoutParameters = createFeatureSelector<Map<number, Map<number, Map<number, number>>>>('oddses');
export const selectMatches = (sportId: number, matchId: number) =>
    createSelector(selectMatchesWithoutParameters, (oddses) => oddses.get(sportId)?.get(matchId))

