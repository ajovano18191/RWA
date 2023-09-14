import { Module } from '@nestjs/common';
import { MatchesModule } from '../matches/matches.module';
import { LiveGateway } from './live.gateway';
import { LiveService } from './live.service';

@Module({
  imports: [MatchesModule,],
  exports: [LiveGateway, LiveService,],
  providers: [LiveGateway, LiveService,],
})
export class LiveModule {}
