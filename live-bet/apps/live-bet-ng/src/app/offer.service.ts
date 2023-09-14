import { Injectable, inject } from '@angular/core';
import { MatchOfferDTO } from '@live-bet/dto';
import { WsMessages } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, concatMap, from, map, merge, share, tap } from 'rxjs';
import { Odds } from './odds.model';
import { SportsService } from './sports.service';
import { OddsActions } from './store/odds.actions';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private socket: Socket = inject(Socket);
  private sportsService: SportsService = inject(SportsService);

  private store: Store = inject(Store);

  endMatche$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

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

    const newMatche$ = this.socket.fromEvent(WsMessages.startMatch).subscribe((p) => {
      this.store.dispatch(OddsActions.removeMatch(p as MatchOfferDTO));
      //this.sportsService.refresh();
    });
    const endMatche$ = this.socket.fromEvent(WsMessages.endMatch).subscribe((p) => {
      this.store.dispatch(OddsActions.removeMatch(p as MatchOfferDTO));
      //this.sportsService.refresh()
      this.endMatche$.next((p as MatchOfferDTO).matchId);
    });

    const xy = merge(x, y).pipe(share());
    
    return xy.pipe(
      map(matchOffer => matchOffer.offers.map(p => ({
          oddsKey: {
            sportId: matchOffer.sportId,
            matchId: matchOffer.matchId,
            subgameId: p[0],
          },
          value: p[1],
        }))
      ),
      tap(p => console.log(p)),
      concatMap(p => from(p)),
      map(p => p as Odds),
    );
  }
}