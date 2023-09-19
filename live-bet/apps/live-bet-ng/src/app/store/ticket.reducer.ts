import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import IEvent from '../ievent.model';
import * as TicketActions from "./ticket.actions";

export interface State extends EntityState<IEvent> {
    selectedEventId: number | null;
}

export const adapter: EntityAdapter<IEvent> = createEntityAdapter<IEvent>({
    selectId: (p) => p.oddsKey.matchId,
});

export const initialState: State = adapter.getInitialState({
    ids: [] = [],
    selectedEventId: null,
});

export const ticketReducer = createReducer(
    initialState,
    on(TicketActions.setEvent, (state, { event }) => {
        return adapter.setOne(event, state);
    }),
    on(TicketActions.deleteEvent, (state, { matchId }) => {
        return adapter.removeOne(matchId, state);
    }),
    on(TicketActions.clearEvents, (state) => {
        return adapter.removeAll({...state, selectedEventId: null});
    }),
);

export const getSelectedEventId = (state: State) => state.selectedEventId;

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();

// select the array of user ids
export const selectEventIds = selectIds;
 
// select the dictionary of user entities
export const selectEventEntities = selectEntities;

// select the array of users
export const selectAllEvents = selectAll;
 
// select the total user count
export const selectEventTotal = selectTotal;