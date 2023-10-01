import { ISport, ISubgame } from "@live-bet/dto";

export interface IGame {
    id: number;
    name: string;
    subgames: ISubgame[];
    sport: ISport;
}

export function newIGame(): IGame {
    return {
        id: 0,
        name: '',
        subgames: [],
        sport: {
          id: 0,
          name: '',
          games: [],
          matches: [],
        }
    };
}