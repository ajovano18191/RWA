import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../games/game.entity";
import { ISubgame } from "libs/dto/src";

@Entity()
export class Subgame implements ISubgame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Game, (game) => game.subgames)
    game: Game;

    constructor(name: string, game: Game) {
        this.name = name;
        this.game = game;
    }
}