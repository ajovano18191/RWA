import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'libs/dto/src';
import { SportsModule } from '../sports/sports.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), SportsModule],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService,]
})
export class MatchesModule {}
