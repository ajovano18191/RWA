import { MatchOfferDTO } from '@live-bet/dto';
import { WsMessages } from '@live-bet/enums';
import { UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Subject } from 'rxjs';
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

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(WsMessages.sendOffer)
  sendOffer(@MessageBody() data: MatchOfferDTO, @ConnectedSocket() client: any): void {
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

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(WsMessages.startMatch)
  async startMatch(@MessageBody() data: MatchOfferDTO): Promise<void> {
    return await this.liveService.startMatch(data);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(WsMessages.endMatch)
  async endMatch(@MessageBody() id: number): Promise<void> {
    return await this.liveService.endMatch(id);
  }
}
