import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEvent from './ticket.reducer';

export interface State {
    events: fromEvent.State;
}

export const reducers: ActionReducerMap<State> = {
    events: fromEvent.ticketReducer,
};

export const selectEventState = createFeatureSelector<fromEvent.State>('ticket');

export const selectEventIds = createSelector(
    selectEventState,
    fromEvent.selectEventIds
);

export const selectEventEntities = createSelector(
    selectEventState,
    fromEvent.selectEventEntities
);

export const selectAllEvents = createSelector(
    selectEventState,
    fromEvent.selectAllEvents
);

export const selectEventTotal = createSelector(
selectEventState,
fromEvent.selectEventTotal
);

export const selectCurrentEventId = createSelector(
    selectEventState,
    fromEvent.getSelectedEventId
);

export const selectCurrentEvent = createSelector(
    selectEventEntities,
    selectCurrentEventId,
    (eventEntities, eventId) => eventId && eventEntities[eventId]
);