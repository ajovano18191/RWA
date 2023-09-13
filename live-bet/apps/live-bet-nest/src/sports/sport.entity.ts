import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ISport } from "@live-bet/dto";
import { Game } from "../games/game.entity";
import { Match } from "../matches/match.entity";

@Entity()
export class Sport implements ISport {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @OneToMany(() => Game, (game) => game.sport)
    games: Game[];

    @OneToMany(() => Match, (match) => match.sport)
    matches: Match[];
}