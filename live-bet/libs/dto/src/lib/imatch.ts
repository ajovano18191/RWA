import { ISport } from "@live-bet/dto";

export interface IMatch {
    id: number;
    league: string;
    home: string;
    guest: string;
    status: string;
    sport: ISport;
}