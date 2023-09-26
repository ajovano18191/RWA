import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorite from './favorite.reducer';

export interface State {
    favorites: fromFavorite.State;
}

export const reducers: ActionReducerMap<State> = {
    favorites: fromFavorite.favoriteReducer,
};

export const selectFavoriteState = createFeatureSelector<fromFavorite.State>('favorite');

export const selectFavoriteIds = createSelector(
    selectFavoriteState,
    fromFavorite.selectFavoriteIds
);

export const selectFavoriteEntities = createSelector(
    selectFavoriteState,
    fromFavorite.selectFavoriteEntities
);

export const selectAllFavorites = createSelector(
    selectFavoriteState,
    fromFavorite.selectAllFavorites
);

export const selectFavoriteTotal = createSelector(
    selectFavoriteState,
    fromFavorite.selectFavoriteTotal
);