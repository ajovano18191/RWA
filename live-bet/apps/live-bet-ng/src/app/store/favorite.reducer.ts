import { IMatch } from '@live-bet/dto';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as FavoriteActions from "./favorite.actions";

export interface State extends EntityState<IMatch> {

}

export const adapter: EntityAdapter<IMatch> = createEntityAdapter<IMatch>({
    selectId: (p) => p.id,
});

export const initialState: State = adapter.getInitialState({
    ids: [] = [],
});

export const favoriteReducer = createReducer(
    initialState,
    on(FavoriteActions.setOrDeleteFavorite, (state, { match }) => {
        let matchId = (state.ids as number[]).filter((id: number) => id === match.id)[0];
        if(matchId) {
            return adapter.removeOne(match.id, state);
        }
        else {
            return adapter.setOne(match, state);
        }
    }),
);

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();

// select the array of user ids
export const selectFavoriteIds = selectIds;
 
// select the dictionary of user entities
export const selectFavoriteEntities = selectEntities;

// select the array of users
export const selectAllFavorites = selectAll;
 
// select the total user count
export const selectFavoriteTotal = selectTotal;