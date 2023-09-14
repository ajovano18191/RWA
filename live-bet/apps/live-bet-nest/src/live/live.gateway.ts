import { MatchOfferDTO } from '@live-bet/dto';
import { WsMessages } from '@live-bet/enums';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Subject } from 'rxjs';
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

  @SubscribeMessage(WsMessages.sendOffer)
  sendOffer(@MessageBody() data: MatchOfferDTO): void {
    return this.liveService.sendOffer(data);
  }

  @SubscribeMessage(WsMessages.sub2Offers)
  sub2Offer(): Subject<WsResponse<MatchOfferDTO>> {
    return this.liveService.sub2Offer();
 }

  @SubscribeMessage(WsMessages.completeOffer)
  async getCompleteOffer(@ConnectedSocket() client: Socket): Promise<void>  { 
    return await this.liveService.getCompleteOffer(client);
  }

  @SubscribeMessage(WsMessages.startMatch)
  async startMatch(@MessageBody() data: MatchOfferDTO): Promise<void> {
    return await this.liveService.startMatch(data);
  }

  @SubscribeMessage(WsMessages.endMatch)
  async endMatch(@MessageBody() id: number): Promise<void> {
    return await this.liveService.endMatch(id);
  }
}