import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Game from "../games/game.model";

@Entity()
export default class Sport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Game, (game) => game.sport)
    games: Game[];
}