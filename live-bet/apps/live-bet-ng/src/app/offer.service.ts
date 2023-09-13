import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, concatMap, from, map, merge } from 'rxjs';
import { Odds } from './odds.model';
import { WsMessages } from '@live-bet/enums';
import { MatchOfferDTO } from '@live-bet/dto';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private socket = inject(Socket);

  getOdds(): Observable<Odds> {
    this.socket.emit(WsMessages.completeOffer);
    const x = this.socket.fromEvent(WsMessages.completeOffer)
    .pipe(
      map(p => p as MatchOfferDTO[]),      
      concatMap(p => from(p)),
    );

    this.socket.emit(WsMessages.sub2Offers);
    const y = this.socket.fromEvent(WsMessages.oneOffer)
    .pipe(
      map(p => p as MatchOfferDTO),
    );
    
    return merge(x, y).pipe(
      map(matchOffer => matchOffer.offers.map(p => ({
          oddsKey: {
            sportId: matchOffer.sportId,
            matchId: matchOffer.matchId,
            subgameId: p[0],
          },
          value: p[1],
        }))
      ),
      concatMap(p => from(p)),
      map(p => p as Odds),
    );
  }
}