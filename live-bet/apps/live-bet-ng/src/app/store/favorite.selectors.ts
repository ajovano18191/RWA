import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorite from './favorite.reducer';

const selectors = fromFavorite.adapter.getSelectors();

export interface State {
    favorites: fromFavorite.State;
}

export const reducers: ActionReducerMap<State> = {
    favorites: fromFavorite.favoriteReducer,
};

export const selectFavoriteState = createFeatureSelector<fromFavorite.State>('favorite');

export const selectFavoriteIds = createSelector(
    selectFavoriteState,
    selectors.selectIds
);

export const selectFavoriteEntities = createSelector(
    selectFavoriteState,
    selectors.selectEntities
);

export const selectAllFavorites = createSelector(
    selectFavoriteState,
    selectors.selectAll
);

export const selectFavoriteTotal = createSelector(
    selectFavoriteState,
    selectors.selectTotal
);