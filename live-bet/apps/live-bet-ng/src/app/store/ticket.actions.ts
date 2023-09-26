import { createAction, props } from "@ngrx/store";
import IEvent from "../ievent.model";

export const setOrDeleteEvent = createAction('[Ticket] SetOrDelete Event', props<{ event: IEvent }>());
export const deleteEvent = createAction('[Ticket] Delete Event', props<{ matchId: number }>());
export const clearEvents = createAction('[Ticket] Clear Events');