import { MatchOfferDTO } from '@live-bet/dto';
import { WsMessages } from '@live-bet/enums';
import { UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Subject } from 'rxjs';
import { BookmakerGuard } from '../auth/bookmaker.role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LiveService } from './live.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LiveGateway {

  constructor(
    private liveService: LiveService,
  ) { }

  @UseGuards(JwtAuthGuard, BookmakerGuard)
  @SubscribeMessage(WsMessages.sendOffer)
  sendOffer(@MessageBody() data: MatchOfferDTO): void {
    return this.liveService.sendOffer(data);
  }

  @SubscribeMessage(WsMessages.sub2Offers)
  sub2Offer(): Subject<WsResponse<MatchOfferDTO>> {
    return this.liveService.sub2Offer();
 }

  @SubscribeMessage(WsMessages.completeOffer)
  async getCompleteOffer(@ConnectedSocket() client: any): Promise<void>  { 
    return await this.liveService.getCompleteOffer(client);
  }

  @UseGuards(JwtAuthGuard, BookmakerGuard)
  @SubscribeMessage(WsMessages.startMatch)
  async startMatch(@MessageBody() data: MatchOfferDTO): Promise<void> {
    return await this.liveService.startMatch(data);
  }

  @UseGuards(JwtAuthGuard, BookmakerGuard)
  @SubscribeMessage(WsMessages.endMatch)
  async endMatch(@MessageBody() id: number): Promise<void> {
    return await this.liveService.endMatch(id);
  }
}
