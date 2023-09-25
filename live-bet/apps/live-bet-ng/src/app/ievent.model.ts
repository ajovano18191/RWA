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