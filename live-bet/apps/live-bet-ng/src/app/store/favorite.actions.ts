import { IMatch } from "@live-bet/dto";
import { createAction, props } from "@ngrx/store";

export const setOrDeleteFavorite = createAction('[Favorite] SetOrDelete Favorite', props<{ match: IMatch }>());