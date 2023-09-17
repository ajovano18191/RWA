import { OddsKey } from "@live-bet/dto";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OfferMap } from "./types";

const selectOddsWithoutParams = createFeatureSelector<OfferMap>('odds');
export const selectOdds = (oddsKey: OddsKey) =>
    createSelector(selectOddsWithoutParams, (offer) => offer.get(oddsKey.sportId)?.get(oddsKey.matchId)?.get(oddsKey.subgameId));

const selectMatchesWithoutParams = createFeatureSelector<OfferMap>('odds');
export const selectMatches = (sportId: number) =>
    createSelector(selectMatchesWithoutParams, (offer) => offer.get(sportId));
