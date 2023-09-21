import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MatchesModule } from '../matches/matches.module';
import { LiveGateway } from './live.gateway';
import { LiveService } from './live.service';

@Module({
  imports: [MatchesModule, AuthModule],
  exports: [LiveGateway, LiveService,],
  providers: [LiveGateway, LiveService,],
})
export class LiveModule {}
