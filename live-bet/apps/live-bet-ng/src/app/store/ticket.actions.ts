import { IMatch, ISubgame } from "@live-bet/dto";
import { createAction, props } from "@ngrx/store";

export const setOrDeleteEvent = createAction('[Ticket] SetOrDelete Event', props<{ match: IMatch, subgame: ISubgame, }>());
export const deleteEvent = createAction('[Ticket] Delete Event', props<{ matchId: number }>());
export const clearEvents = createAction('[Ticket] Clear Events');