import { ISport, ISubgame } from "@live-bet/dto";

export interface IGame {
    id: number;
    name: string;
    subgames: ISubgame[];
    sport: ISport;
}