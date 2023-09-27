import { IMatch, ISubgame } from '@live-bet/dto';
import { MatchStatus } from '@live-bet/enums';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import IEvent from '../ievent.model';
import * as TicketActions from "./ticket.actions";

export interface State extends EntityState<IEvent> { }

export const adapter: EntityAdapter<IEvent> = createEntityAdapter<IEvent>({
    selectId: (p) => p.oddsKey.matchId,
});

export const initialState: State = adapter.getInitialState({
    ids: [] = [],
});

export const ticketReducer = createReducer(
    initialState,
    on(TicketActions.setOrDeleteEvent, (state, { match, subgame, }) => {
        const matchId = (state.ids as number[]).filter((id: number) => id === match.id)[0];
        if(matchId) {
            const foundedEvent = state.entities[matchId]!;
            if(foundedEvent.oddsKey.subgameId === subgame.id) {
                return adapter.removeOne(match.id, state);
            }
        }
        return adapter.setOne(matchAndSubgame2Event(match, subgame), state);
    }),
    on(TicketActions.deleteEvent, (state, { matchId }) => {
        return adapter.removeOne(matchId, state);
    }),
    on(TicketActions.clearEvents, (state) => {
        return adapter.removeAll({...state, selectedEventId: null});
    }),
);

function matchAndSubgame2Event(match: IMatch, subgame: ISubgame): IEvent {
    return {
        home: match.home,
        guest: match.guest,
        matchStatus: match.status as MatchStatus,
        gameId: subgame.game.id,
        gameName: subgame.game.name,
        subgameName: subgame.name,
        oddsKey: {
          sportId: match.sport.id,
          matchId: match.id,
          subgameId: subgame.id,
        }
    };
}