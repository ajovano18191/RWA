import { Injectable, inject } from '@angular/core';
import { MatchOfferDTO } from '@live-bet/dto';
import { WsMessages } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Observable, concat, concatMap, filter, from, map, merge, share, take, tap } from 'rxjs';
import OddsKey from './odds-key.model';
import { Odds } from './odds.model';
import { SportsService } from './sports.service';
import { OddsActions } from './store/odds.actions';
import { selectOdds } from './store/odds.selectors';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private socket: Socket = inject(Socket);
  private sportsService: SportsService = inject(SportsService);

  private store: Store = inject(Store);

  getOdds(): Observable<Odds> {
    this.sub2EndMatches();

    const completeOffer$ = this.completeOffer();
    const offer$ = this.offer();
    const newMatche$ = this.newMatch();
    return merge(completeOffer$, offer$, newMatche$).pipe(
      share(),
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

  private completeOffer(): Observable<MatchOfferDTO> {
    this.socket.emit(WsMessages.completeOffer);
    return this.socket.fromEvent(WsMessages.completeOffer)
    .pipe(
      map(p => p as MatchOfferDTO[]),
      concatMap(p => from(p)),
    );
  }

  private offer(): Observable<MatchOfferDTO> {
    this.socket.emit(WsMessages.sub2Offers);
    return this.socket.fromEvent(WsMessages.oneOffer)
    .pipe(
      map(p => p as MatchOfferDTO),
    );
  }

  private newMatch(): Observable<MatchOfferDTO> {
    return this.socket.fromEvent(WsMessages.startMatch).pipe(
      tap(() => this.sportsService.refresh()),
      map(p => p as MatchOfferDTO),
    );
  }

  private sub2EndMatches() {
    this.socket.fromEvent(WsMessages.endMatch).subscribe((p) => {
      this.store.dispatch(OddsActions.removeMatch(p as MatchOfferDTO));
      this.sportsService.refresh();
    });
  }

  oddsSelector(oddsKey: OddsKey): Observable<number> {
    const currentStoreValue$ = this.store.select(selectOdds(oddsKey))
    .pipe(
      filter(p => p !== undefined),
      take(1),
      map(p => p!),
    );

    const storeValue$ = this.store.select(selectOdds(oddsKey))
    .pipe(
      filter(p => p !== undefined),
      map(p => p!),
    );

    return concat(currentStoreValue$, storeValue$).pipe(share());
  }
}