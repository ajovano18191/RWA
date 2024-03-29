import { IGame, IMatch } from "@live-bet/dto";

export interface ISport {
    id: number;
    name: string;
    games: IGame[];
    matches: IMatch[];
}

export function newISport(): ISport {
    return {
        id: 0,
        name: '',
        matches: [],
        games: [],
    };
}