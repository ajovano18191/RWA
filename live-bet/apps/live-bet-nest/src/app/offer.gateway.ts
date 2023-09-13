import { MatchOfferDTO } from '@live-bet/dto';
import { WsMessages } from '@live-bet/enums';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Subject } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OfferGateway {

  completeOffer: Map<number, MatchOfferDTO> = new Map<number, MatchOfferDTO>();
  offer$: Subject<WsResponse<MatchOfferDTO>> = new Subject<WsResponse<MatchOfferDTO>>();

  @SubscribeMessage(WsMessages.sendOffer)
  sendOffer(@MessageBody() data: MatchOfferDTO): void {
    this.completeOffer.set(data.matchId, data);
    this.offer$.next({ event: WsMessages.oneOffer, data: data });
    console.log(WsMessages.sendOffer, data);
  }

  @SubscribeMessage(WsMessages.sub2Offers)
  sub2Offer(): Subject<WsResponse<MatchOfferDTO>> {
    console.log(WsMessages.sub2Offers);
    return this.offer$;
 }

  @SubscribeMessage(WsMessages.completeOffer)
  start(@ConnectedSocket() client: Socket): void  { 
    const x = this.map2JSON();
    client.emit(WsMessages.completeOffer, x);
    console.log(WsMessages.completeOffer, x);
  }

  private map2JSON(): MatchOfferDTO[] {
    const arr: MatchOfferDTO[] = [];
    for(const kvp of this.completeOffer) {
      arr.push(kvp[1]);
    }
    return arr;
  }
}