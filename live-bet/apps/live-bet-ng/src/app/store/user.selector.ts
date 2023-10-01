import { UserDTO } from "@live-bet/dto";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectUserFeature = createFeatureSelector<UserDTO>('user');
export const selectUser = createSelector(selectUserFeature, (user: UserDTO) => user);