import { IGame } from "libs/dto/src";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subgame } from "../subgames/subgame.entity";
import { Sport } from "../sports/sport.entity";

@Entity()
export class Game implements IGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Subgame, (subgame) => subgame.game, {
        cascade: true,
    })
    subgames: Subgame[];

    @ManyToOne(() => Sport, (sport) => sport.games)
    sport: Sport;
}