import { OddsKey } from "@live-bet/dto";

export default interface IEvent {
    home: string,
    guest: string,
    gameId: number,
    gameName: string,
    subgameName: string,
    oddsKey: OddsKey,
}