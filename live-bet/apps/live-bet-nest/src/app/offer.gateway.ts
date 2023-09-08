import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Observable, Subject, interval, map } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OfferGateway {

  completeOffer: Map<number, Send> = new Map<number, Send>();
  offer$: Subject<WsResponse<Send>> = new Subject<WsResponse<Send>>();

  @SubscribeMessage('sendOffer')
  sendOffer(@MessageBody() data: Send): void {
    this.completeOffer.set(data.matchId, data);
    this.offer$.next({ event: 'offer', data: data });
    console.log("sendOffer", data);
  }

  @SubscribeMessage('sub2Offers')
  sub2Offer(): Subject<WsResponse<Send>> {
    console.log("sub2Offers");
    return this.offer$;
 }

  @SubscribeMessage('completeOffer')
  start(@ConnectedSocket() client: Socket): void  { 
    const x = this.map2JSON();
    client.emit('completeOffer', x);
    console.log("completeOffer", x);
  }

  private map2JSON(): Send[] {
    const arr: Send[] = [];
    for(const kvp of this.completeOffer) {
      arr.push(kvp[1]);
    }
    return arr;
  }
}

interface Send {
  sportId: number,
  matchId: number,
  matchOffer: number[][],
}