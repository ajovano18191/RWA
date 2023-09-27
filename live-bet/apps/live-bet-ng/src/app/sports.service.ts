import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { GameDTO, ISport, MatchDTO } from "@live-bet/dto";
import { OfferType } from "@live-bet/enums";
import { BehaviorSubject, Observable, exhaustMap, shareReplay, tap } from "rxjs";
import { baseURL } from "./const";

@Injectable({
    providedIn: 'root',
  })
export class SportsService {
    private httpClient: HttpClient = inject(HttpClient);

    private getResponse$ = new BehaviorSubject<ISport[]>([]);

    getAllSports(offerType: OfferType): Observable<ISport[]> {
        return this.getResponse$.pipe(
            exhaustMap(() => 
                this.httpClient
                .get<ISport[]>(`${baseURL}/sports`, {
                    params: {
                        offerType: offerType,
                    },
                })
                .pipe(
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
        this.httpClient.post(`${baseURL}/games`, gameDTO).subscribe(() => this.refresh());
    }

    deleteGame(gameId: number) {
        this.httpClient.delete(`${baseURL}/games/${gameId}`).subscribe(() => this.refresh());
    }

    postMatch(matchDTO: MatchDTO) {
        this.httpClient.post(`${baseURL}/matches`, matchDTO).subscribe(() => this.refresh());
    }

    refresh(): void {
        this.getResponse$.next([]);
    }
}