import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SportsModule } from '../sports/sports.module';
import { SubgamesModule } from '../subgames/subgames.module';
import { Match } from './match.entity';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { Odds } from './odds.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Odds]), SportsModule, SubgamesModule, AuthModule],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService,]
})
export class MatchesModule {}
