import { Module } from "@nestjs/common";
import Sport from "./sport.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SportsService } from "./sports.service";
import { SportsController } from "./sports.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Sport]),],
    providers: [SportsService,],
    controllers: [SportsController,]
})
export class SportsModule {

}