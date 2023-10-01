import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { SportsModule } from "../sports/sports.module";
import { Game } from "./game.entity";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";

@Module({
    imports: [TypeOrmModule.forFeature([Game]), SportsModule, AuthModule],
    providers: [GamesService,],
    controllers: [GamesController,],
    exports: [GamesService,],
})
export class GamesModule {

}