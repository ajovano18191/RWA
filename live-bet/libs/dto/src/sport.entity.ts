import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game, Match } from "libs/dto/src";

@Entity()
export class Sport {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @OneToMany(() => Game, (game) => game.sport)
    games: Game[];

    @OneToMany(() => Match, (match) => match.sport)
    matches: Match[];
}