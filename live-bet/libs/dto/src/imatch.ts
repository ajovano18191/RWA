import { ISport } from "libs/dto/src";

export interface IMatch {
    id: number;
    league: string;
    home: string;
    guest: string;
    status: string;
    sport: ISport;
}