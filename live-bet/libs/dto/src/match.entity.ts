import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sport } from "libs/dto/src";

@Entity()
export class Match {
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