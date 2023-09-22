import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IMatch, MatchOfferDTO } from '@live-bet/dto';
import { MatchStatus, WsMessages } from '@live-bet/enums';
import { Socket } from 'ngx-socket-io';
import { tap } from 'rxjs';
import { SportsService } from '../sports.service';

@Injectable({
  providedIn: 'root'
})
export class SendOfferService {
  private readonly baseURL = "http://localhost:3000/api";
  private socket = inject(Socket);
  private httpClient: HttpClient = inject(HttpClient);

  public sendMatchOffer(match: IMatch, mapMatchOffer: Map<number, number>) {
    const matchOfferDTO: MatchOfferDTO = {
      sportId: match.sport.id,
      matchId: match.id,
      offers: this.map2Array(mapMatchOffer),
    }
    if(match.status === MatchStatus.live) {
      this.socket.emit(WsMessages.sendOffer, matchOfferDTO);
    }
    else {
      this.httpClient.put(`${this.baseURL}/matches/${match.id}/offer`, matchOfferDTO).subscribe(p => p);
    }
  }

  public startMatch(match: IMatch, mapMatchOffer: Map<number, number>) {
    const matchOfferDTO: MatchOfferDTO = {
      sportId: match.sport.id,
      matchId: match.id,
      offers: this.map2Array(mapMatchOffer),
    }
    this.socket.emit(WsMessages.startMatch, matchOfferDTO);
  }

  private sportsService: SportsService = inject(SportsService);

  public endMatch(matchId: number, winnerSubgames: Map<number, number>) {
    this.socket.emit(WsMessages.endMatch, matchId);

    const arrWinnerSubgames: [number, number][] = Array.from(winnerSubgames.entries());
    this.httpClient
    .put(`${this.baseURL}/matches/${matchId}/end-match`, arrWinnerSubgames)
    .pipe(
      tap(() => this.sportsService.refresh()),
    )
    .subscribe(p => p);
  }

  private map2Array(matchOffer: Map<number, number>): number[][] {
    const arr: number[][] = [];
    for(const keyValuePair of matchOffer) {
      arr.push([keyValuePair[0], keyValuePair[1]])
    }
    return arr;
  }
}
