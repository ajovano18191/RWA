import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEvent from './ticket.reducer';

const selectors = fromEvent.adapter.getSelectors();

export interface State {
    events: fromEvent.State;
}

export const reducers: ActionReducerMap<State> = {
    events: fromEvent.ticketReducer,
};

export const selectEventState = createFeatureSelector<fromEvent.State>('ticket');

export const selectEventIds = createSelector(
    selectEventState,
    selectors.selectIds
);

export const selectEventEntities = createSelector(
    selectEventState,
    selectors.selectEntities
);

export const selectAllEvents = createSelector(
    selectEventState,
    selectors.selectAll
);

export const selectEventTotal = createSelector(
    selectEventState,
    selectors.selectTotal
);