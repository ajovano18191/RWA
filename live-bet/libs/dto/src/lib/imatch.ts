import { ISport } from "@live-bet/dto";

export interface IMatch {
    id: number;
    league: string;
    home: string;
    guest: string;
    status: string;
    sport: ISport;
}

export function newIMatch(): IMatch {
    return {
        id: 0,
        home: '',
        guest: '',
        league: '',
        status: 'live',
        sport: {
          id: 0,
          name: '',
          games: [],
          matches: [],
        },
    };
}