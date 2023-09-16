import { IMatch } from "@live-bet/dto";
import { createActionGroup, props } from "@ngrx/store";

export const MatchActions = createActionGroup({
    source: 'match',
    events: {
      'Set Match': props<IMatch>(),
    },
  });