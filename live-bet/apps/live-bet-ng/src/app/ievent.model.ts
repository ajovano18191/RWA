import { OddsKey } from "@live-bet/dto";
import { MatchStatus } from "@live-bet/enums";

export default interface IEvent {
    home: string,
    guest: string,
    matchStatus: MatchStatus,
    gameId: number,
    gameName: string,
    subgameName: string,
    oddsKey: OddsKey,
}

export function newIEvent(): IEvent {
    return {
        home: 'string',
        guest: 'string',
        matchStatus: MatchStatus.notStarted,
        gameId: 0,
        gameName: 'string',
        subgameName: 'string',
        oddsKey: {
          sportId: 0,
          matchId: 0,
          subgameId: 0,
        },
    };
}