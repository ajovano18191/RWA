import { SubgameDTO } from "@live-bet/dto";

export interface GameDTO {
    name: string;
    sportId: number;
    subgames: SubgameDTO[];
}