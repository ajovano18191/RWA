import { ISubgame } from "@live-bet/dto";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../games/game.entity";
import { Odds } from "../matches/odds.entity";

@Entity()
export class Subgame implements ISubgame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Game, (game) => game.subgames)
    game: Game;

    @OneToMany(() => Odds, (odds) => odds.subgame)
    oddses: Odds[];

    constructor(name: string, game: Game) {
        this.name = name;
        this.game = game;
    }
}