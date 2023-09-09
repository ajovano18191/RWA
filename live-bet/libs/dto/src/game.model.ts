import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sport, Subgame } from "libs/dto/src";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Subgame, (subgame) => subgame.game)
    subgames: Subgame[];

    @ManyToOne(() => Sport, (sport) => sport.games)
    sport: Sport;
}