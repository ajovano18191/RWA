import { IGame, IMatch } from "libs/dto/src";

export interface ISport {
    id: number;
    name: string;
    games: IGame[];
    matches: IMatch[];
}