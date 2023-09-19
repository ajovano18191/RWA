import { createAction, props } from "@ngrx/store";
import IEvent from "../ievent.model";

export const setEvent = createAction('[Ticket] Set Event', props<{ event: IEvent }>());
export const deleteEvent = createAction('[Ticket] Delete Event', props<{ matchId: number }>());
export const clearEvents = createAction('[Ticket] Clear Events');