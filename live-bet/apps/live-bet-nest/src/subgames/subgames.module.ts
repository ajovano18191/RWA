import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Subgame from "./subgame.model";
import { SubgamesService } from "./subgames.service";
import { SubgamesController } from "./subgames.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Subgame]),],
    providers: [SubgamesService,],
    controllers: [SubgamesController,]
})
export class SubgamesModule {

}