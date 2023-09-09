import { IGame } from "libs/dto/src"

export interface ISubgame {
    id: number;
    name: string;
    game: IGame;
}