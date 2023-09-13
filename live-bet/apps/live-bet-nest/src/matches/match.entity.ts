import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IMatch } from "@live-bet/dto";
import { Sport } from "../sports/sport.entity";
import { MatchStatus } from "@live-bet/enums";

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

    @ManyToOne(() => Sport, (sport) => sport.matches)
    sport: Sport;
}