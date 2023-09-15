import { IMatch } from "@live-bet/dto";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectMatchFeature = createFeatureSelector<IMatch>('match');
export const selectMatch = createSelector(selectMatchFeature, (match: IMatch) => match);
