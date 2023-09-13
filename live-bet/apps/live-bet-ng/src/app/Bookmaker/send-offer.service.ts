import { Injectable, inject } from '@angular/core';
import { MatchOfferDTO } from '@live-bet/dto';
import { WsMessages } from '@live-bet/enums';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SendOfferService {

  private socket = inject(Socket);

  constructor() { }

  public sendMatchOffer(matchOffer: MatchOfferDTO) {
    this.socket.emit(WsMessages.sendOffer, matchOffer);
  }

  public startMatch(matchId: number) {

  }

  public endMatch(matchId: number) {

  }

  map2Array(matchOffer: Map<number, number>): number[][] {
    const arr: number[][] = [];
    for(const keyValuePair of matchOffer) {
      arr.push([keyValuePair[0], keyValuePair[1]])
    }
    return arr;
  }
}
