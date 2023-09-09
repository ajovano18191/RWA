import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../games/game.entity";

@Entity()
export class Subgame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Game, (game) => game.subgames)
    game: Game;
}