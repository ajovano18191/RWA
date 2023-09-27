import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatchOfferDTO, Odds, OddsKey } from '@live-bet/dto';
import { WsMessages } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Observable, concatMap, filter, from, map, merge, share, switchMap, take, tap } from 'rxjs';
import { SportsService } from './sports.service';
import { OddsActions } from './store/odds.actions';
import { selectOdds } from './store/odds.selectors';
import { baseURL } from './const';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  getOdds(): Observable<Odds> {
    this.sub2EndMatches();

    const noLiveOffer$ = this.noLiveOffer();
    const completeOffer$ = this.completeOffer();
    const offer$ = this.offer();
    const newMatche$ = this.newMatch();
    
    return merge(noLiveOffer$, completeOffer$, offer$, newMatche$).pipe(
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

  private httpClient: HttpClient = inject(HttpClient);

  private noLiveOffer(): Observable<MatchOfferDTO> {
    return this.httpClient.get(`${baseURL}/matches`).pipe(
      switchMap((matches: any) => from(matches)),
      map((match: any) => ({
        sportId: match.sportId,
        matchId: match.id,
        offers: match.oddses.map((odds: any) => [odds.subgameId, odds.value])
      } as MatchOfferDTO)),
    )
  }

  private socket: Socket = inject(Socket);

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

  private sportsService: SportsService = inject(SportsService);

  private newMatch(): Observable<MatchOfferDTO> {
    return this.socket.fromEvent(WsMessages.startMatch).pipe(
      tap(() => this.sportsService.refresh()),
      map(p => p as MatchOfferDTO),
    );
  }

  private store: Store = inject(Store);

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

    return merge(currentStoreValue$, storeValue$);
  }
}