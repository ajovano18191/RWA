import { UserDTO } from "@live-bet/dto";
import { createActionGroup, props } from "@ngrx/store";

export const UserActions = createActionGroup({
    source: 'user',
    events: {
      'Set User': props<UserDTO>(),
      'Clear User': props<any>(),
    },
});