import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubgamesService } from "./subgames.service";
import { SubgamesController } from "./subgames.controller";
import { GamesModule } from "../games/games.module";
import { Subgame } from "./subgame.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Subgame]), GamesModule,],
    providers: [SubgamesService,],
    controllers: [SubgamesController,]
})
export class SubgamesModule {

}