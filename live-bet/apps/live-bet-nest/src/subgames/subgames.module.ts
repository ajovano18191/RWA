import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GamesModule } from "../games/games.module";
import { Subgame } from "./subgame.entity";
import { SubgamesController } from "./subgames.controller";
import { SubgamesService } from "./subgames.service";

@Module({
    imports: [TypeOrmModule.forFeature([Subgame]), GamesModule,],
    providers: [SubgamesService,],
    controllers: [SubgamesController,],
    exports: [SubgamesService,],
})
export class SubgamesModule {

}