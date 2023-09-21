import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { GameDTO, ISport, MatchDTO } from "@live-bet/dto";
import { OfferType } from "@live-bet/enums";
import { BehaviorSubject, Observable, exhaustMap, map, shareReplay, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class SportsService {
    private readonly baseURL = "http://localhost:3000/api";
    private httpClient: HttpClient = inject(HttpClient);

    private getResponse$ = new BehaviorSubject<ISport[]>([]);

    getAllSports(offerType: OfferType): Observable<ISport[]> {
        return this.getResponse$.pipe(
            exhaustMap(() => 
                this.httpClient
                .get(`${this.baseURL}/sports`, {
                    params: {
                        offerType: offerType,
                    },
                })
                .pipe(
                    map(p => <ISport[]>p),
                    tap(sports => {
                        sports.forEach(sport => {
                            sport.matches.forEach(match => match.sport = sport);
                            sport.matches.sort((a, b) => a.id - b.id);
                            sport.games.forEach(game => {
                                game.sport = sport;
                                game.subgames.forEach(subgame => subgame.game = game);
                                game.subgames.sort((a, b) => a.id - b.id);
                            });
                            sport.games.sort((a, b) => a.id - b.id);
                        });
                    }),
                )
            ),
            shareReplay(),
        );
    }

    postGame(gameDTO: GameDTO) {
        this.httpClient.post(`${this.baseURL}/games`, gameDTO).subscribe(() => this.refresh());
    }

    deleteGame(gameId: number) {
        this.httpClient.delete(`${this.baseURL}/games/${gameId}`).subscribe(() => this.refresh());
    }

    postMatch(matchDTO: MatchDTO) {
        this.httpClient.post(`${this.baseURL}/matches`, matchDTO).subscribe(() => this.refresh());
    }

    refresh(): void {
        this.getResponse$.next([]);
    }
}