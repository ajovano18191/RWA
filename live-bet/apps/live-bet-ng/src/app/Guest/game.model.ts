import { Subgame } from "./subgame.model";

export default interface Game {
    id: number,
    name: string,
    subgames: Subgame[],
  }