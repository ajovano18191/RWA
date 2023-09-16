import OddsKey from "./odds-key.model";

export default interface IEvent {
    home: string,
    guest: string,
    gameId: number,
    gameName: string,
    subgameName: string,
    oddsKey: OddsKey,
}