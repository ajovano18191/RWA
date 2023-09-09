import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IMatch } from "libs/dto/src";
import { Sport } from "../sports/sport.entity";

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

    @ManyToOne(() => Sport, (sport) => sport.matches)
    sport: Sport;
}