import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Match } from "../matches/match.entity";
import { Subgame } from "../subgames/subgame.entity";
import { Ticket } from "./ticket.entity";

@Entity()
export class Event {

    @PrimaryColumn()
    ticketId: number;

    @ManyToOne(() => Ticket, (ticket) => ticket.events)
    @JoinColumn({ name: "ticketId" })
    ticket: Ticket;

    @PrimaryColumn()
    matchId: number;
    
    @ManyToOne(() => Match, (match) => match.events)
    @JoinColumn({ name: "matchId" })
    match: Match;

    @PrimaryColumn()
    subgameId: number;

    @ManyToOne(() => Subgame, (subgame) => subgame.events)
    @JoinColumn({ name: "subgameId" })
    subgame: Subgame;

    @Column({
        type: "float",
    })
    odds: number;

    constructor(ticketId: number, matchId: number, subgameId: number, odds: number) {
        this.ticketId = ticketId;
        this.matchId = matchId;
        this.subgameId = subgameId;
        this.odds = odds;
    }
}