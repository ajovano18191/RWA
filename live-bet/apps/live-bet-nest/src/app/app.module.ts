import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferGateway } from './offer.gateway';
import { SportsModule } from '../sports/sports.module';
import { GamesModule } from '../games/games.module';
import { SubgamesModule } from '../subgames/subgames.module';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'live-bet-nest',
        password: 'live-bet-nest',
        database: 'live-bet',
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    SportsModule,
    GamesModule,
    SubgamesModule,
    MatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService, OfferGateway, ],
})
export class AppModule {}
