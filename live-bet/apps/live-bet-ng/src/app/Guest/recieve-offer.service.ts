import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { concatMap, from, map, merge } from 'rxjs';
import { OddsActions } from './odds-store/odds.actions';

@Injectable({
  providedIn: 'root'
})
export class RecieveOfferService {

  private socket = inject(Socket);
  private store = inject(Store);

  constructor() { 
    this.startSubscription();
  }

  startSubscription(): void {
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

    merge(x, y)
    .subscribe(p => {
      p.matchOffer.forEach(q => {
        const offer = {
          oddsKey: {
            sportId: p.sportId,
            matchId: p.matchId,
            subgameId: q[0],
          },
          value: q[1],
        };
        this.store.dispatch(OddsActions.setOdds(offer));
      });
    });
  }
}

interface Send {
  sportId: number,
  matchId: number,
  matchOffer: number[][],
}