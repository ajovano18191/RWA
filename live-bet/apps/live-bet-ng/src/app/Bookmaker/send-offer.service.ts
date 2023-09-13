import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SendOfferService {

  private socket = inject(Socket);

  constructor() { }

  public sendOffer(matchId: number, sportId: number, matchOffer: Map<number, number>) {
    this.socket.emit('sendOffer', {
      matchId: matchId,
      sportId: sportId,
      matchOffer: this.map2Array(matchOffer),
    });
  }

  private map2Array(matchOffer: Map<number, number>): number[][] {
    const arr: number[][] = [];
    for(const keyValuePair of matchOffer) {
      arr.push([keyValuePair[0], keyValuePair[1]])
    }
    return arr;
  }

  public startMatch(matchId: number) {
    this.socket.emit('startMatch', {
      matchId: matchId,
    });
  }

  public endMatch(matchId: number) {
    this.socket.emit('endMatch', {
      matchId: matchId,
    });
  }
}
