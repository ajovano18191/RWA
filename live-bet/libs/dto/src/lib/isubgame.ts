import { IGame } from "@live-bet/dto"

export interface ISubgame {
    id: number;
    name: string;
    isPlayable: boolean;
    game: IGame;
}

export function newISubgame(): ISubgame {
    return {
        id: 0,
        name: '',
        isPlayable: true,
        game: {
          id: 0,
          name: '',
          subgames: [],
          sport: {
            id: 0,
            name: '',
            games: [],
            matches: [],
          }
        },
    };
}