import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Subgame } from "../subgames/subgame.entity";
import { Match } from "./match.entity";

@Entity()
export class Odds {
    @PrimaryColumn()
    matchId: number;
  
    @PrimaryColumn()
    subgameId: number;

    @ManyToOne(() => Match, (match) => match.oddses)
    @JoinColumn({ name: "matchId" })
    match: Match;

    @ManyToOne(() => Subgame, (subgame) => subgame.oddses)
    @JoinColumn({ name: "subgameId" })
    subgame: Subgame;

    @Column({
        type: "float",
    })
    value: number;
}