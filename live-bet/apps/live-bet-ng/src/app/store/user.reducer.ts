import { UserDTO } from "@live-bet/dto";
import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";

const initialState: UserDTO = {
    accessToken: "",
    role: "",
}

export const userReducer = createReducer(
    initialState,
    on(UserActions.setUser, (state: UserDTO, user: UserDTO) => {
      return user;
    }),
    on(UserActions.clearUser, (state: UserDTO) => {
        return initialState;
    }),
  );