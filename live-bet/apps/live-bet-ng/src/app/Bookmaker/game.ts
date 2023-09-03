import Subgame from "./subgame";

export default interface Game {
    id: number,
    name: string,
    subgames: Subgame[],
  }