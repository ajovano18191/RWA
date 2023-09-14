import { IMatch } from "@live-bet/dto";
import { MatchStatus } from "@live-bet/enums";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sport } from "../sports/sport.entity";
import { Odds } from "./odds.entity";

@Entity()
export class Match implements IMatch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    league: string;

    @Column()
    home: string;

    @Column()
    guest: string;

    @Column({default: MatchStatus.notStarted})
    status: string;

    @Column()
    sportId: number;

    @ManyToOne(() => Sport, (sport) => sport.matches)
    @JoinColumn({ name: "sportId" })
    sport: Sport;

    @OneToMany(() => Odds, (odds) => odds.match, {
        orphanedRowAction: "delete",
        cascade: true,
    })
    oddses: Odds[];
}