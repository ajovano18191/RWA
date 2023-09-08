import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferGateway } from './offer.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OfferGateway, ],
})
export class AppModule {}
