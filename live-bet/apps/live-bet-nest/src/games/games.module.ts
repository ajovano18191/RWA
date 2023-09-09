import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";
import { SportsModule } from "../sports/sports.module";
import { Game } from "./game.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Game]), SportsModule],
    providers: [GamesService,],
    controllers: [GamesController,],
    exports: [GamesService,],
})
export class GamesModule {

}