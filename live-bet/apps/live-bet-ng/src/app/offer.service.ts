import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Observable, concatMap, from, map, merge } from 'rxjs';
import { Odds } from './odds.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private socket = inject(Socket);
  private store = inject(Store);

  getOdds(): Observable<Odds> {
    this.socket.emit('completeOffer');
    const x = this.socket.fromEvent('completeOffer')
    .pipe(
      map(p => p as Send[]),      
      concatMap(p => from(p)),
    );

    this.socket.emit('sub2Offers');
    const y = this.socket.fromEvent('offer')
    .pipe(
      map(p => p as Send),
    );
    
    return merge(x, y).pipe(
      map(send => send.matchOffer.map(p => ({
          oddsKey: {
            sportId: send.sportId,
            matchId: send.matchId,
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

interface Send {
  sportId: number,
  matchId: number,
  matchOffer: number[][],
}