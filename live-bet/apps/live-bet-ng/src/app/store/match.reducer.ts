import { IMatch } from "@live-bet/dto";
import { createReducer, on } from "@ngrx/store";
import { MatchActions } from "./match.actions";

const initialState: IMatch = {
    id: 0,
    home: '',
    guest: '',
    league: '',
    status: 'live',
    sport: {
        id: 0,
        name: '',
        games: [],
        matches: [],
    },
};

export const matchReducer = createReducer(
  initialState,
  on(MatchActions.setMatch, (state: IMatch, match: IMatch) => {
    return match;
  }),
);