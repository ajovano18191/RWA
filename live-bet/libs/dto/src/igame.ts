import { ISport, ISubgame } from "libs/dto/src";

export interface IGame {
    id: number;
    name: string;
    subgames: ISubgame[];
    sport: ISport;
}