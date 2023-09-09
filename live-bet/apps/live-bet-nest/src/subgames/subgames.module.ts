import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubgamesService } from "./subgames.service";
import { SubgamesController } from "./subgames.controller";
import { Subgame } from "libs/dto/src";
import { GamesModule } from "../games/games.module";

@Module({
    imports: [TypeOrmModule.forFeature([Subgame]), GamesModule,],
    providers: [SubgamesService,],
    controllers: [SubgamesController,]
})
export class SubgamesModule {

}