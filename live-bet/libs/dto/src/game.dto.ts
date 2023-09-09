import { SubgameDTO } from "libs/dto/src";

export interface GameDTO {
    name: string;
    sportId: number;
    subgames: SubgameDTO[];
}