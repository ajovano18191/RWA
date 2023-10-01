import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from '../games/games.module';
import { LiveModule } from '../live/live.module';
import { MatchesModule } from '../matches/matches.module';
import { SportsModule } from '../sports/sports.module';
import { SubgamesModule } from '../subgames/subgames.module';
import { TicketsModule } from '../tickets/tickets.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';

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
    LiveModule,
    TicketsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
