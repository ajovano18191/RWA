import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Game from "./game.model";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Game]),],
    providers: [GamesService,],
    controllers: [GamesController,]
})
export class GamesModule {

}