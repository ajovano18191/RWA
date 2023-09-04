import {
  ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  import { from, Observable, interval, Subject } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class EventsGateway {
    @WebSocketServer()
    server: Server;

    completeOffer: Map<number, Map<number, number>> = new Map<number, Map<number, number>>();
    offer$: Subject<WsResponse<Send>> = new Subject<WsResponse<Send>>();
  
    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
      return interval(2000).pipe(map(item => ({ event: 'events', data: item })));
    }
  
    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
      return data;
    }

    @SubscribeMessage('sendOffer')
    sendOffer(@MessageBody() data: Send): void {
      const map: Map<number, number> = new Map<number, number>();
      for(const kvp of data.offer) {
        map.set(kvp[0], kvp[1]);
      }
      this.completeOffer.set(data.matchId, map);
      this.offer$.next({ event: 'offer', data: data });
    }

    @SubscribeMessage('sub2Offers')
    sub2Offer(): Subject<WsResponse<Send>> {
      return this.offer$;
    }

    @SubscribeMessage('completeOffer')
    start(@ConnectedSocket() client: Socket): void  { //Map<number, Map<number, number>>
      //return { event: 'completeOffer', data: this.completeOffer };
      let x = this.map2JSON();
      console.log(x);
      client.emit('completeOffer', x);
    }

    private map2JSON(): any {
      const arr: any[][] = [];
      for(const kvp of this.completeOffer) {
        const arr2: any[] = [];
        for(const kvp2 of kvp[1]) {
          let x = kvp2[1]
          arr2.push([kvp2[0], kvp2[1]])
        }
        arr.push(arr2)
      }
      return arr;
    }
  }

interface Send {
  matchId: number,
  offer: [number, number],
}
  