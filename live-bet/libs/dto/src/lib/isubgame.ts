import { IGame } from "@live-bet/dto"

export interface ISubgame {
    id: number;
    name: string;
    game: IGame;
}