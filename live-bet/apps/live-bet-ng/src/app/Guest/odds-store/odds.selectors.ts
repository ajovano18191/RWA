import { createFeatureSelector, createSelector } from "@ngrx/store";
import OddsKey from "../odds-key.model";
import { OfferMap } from "../types";

const selectOddsWithoutParams = createFeatureSelector<OfferMap>('odds');
export const selectOdds = (oddsKey: OddsKey) =>
    createSelector(selectOddsWithoutParams, (offer) => offer.get(oddsKey.sportId)?.get(oddsKey.matchId)?.get(oddsKey.subgameId));