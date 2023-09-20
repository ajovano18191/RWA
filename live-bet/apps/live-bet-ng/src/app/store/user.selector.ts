import { UserDTO } from "@live-bet/dto";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const getUserFeature = createFeatureSelector<UserDTO>('user');
export const getUser = createSelector(getUserFeature, (user: UserDTO) => user);