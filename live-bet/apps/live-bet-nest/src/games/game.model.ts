import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Subgame from "../subgames/subgame.model";
import Sport from "../sports/sport.model";

@Entity()
export default class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Subgame, (subgame) => subgame.game)
    subgames: Subgame[];

    @ManyToOne(() => Sport, (sport) => sport.games)
    sport: Sport;
}