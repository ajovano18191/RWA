import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { GameDTO, IGame, IMatch, ISport, MatchDTO } from "libs/dto/src";
import { Observable, map, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class SportsService {
    private httpClient: HttpClient = inject(HttpClient);

    getAllSports(): Observable<ISport[]> {
        return this.httpClient
        .get("http://localhost:3000/api/sports")
        .pipe(
            map(p => <ISport[]>p),
            tap(sports => {
                sports.forEach(sport => {
                    sport.matches.forEach(match => match.sport = sport);
                    sport.games.forEach(game => {
                        game.sport = sport;
                        game.subgames.forEach(subgame => subgame.game = game);
                    });
                });
            }),
        );
    }

    postGame(gameDTO: GameDTO) {

    }

    postMatch(matchDTO: MatchDTO) {

    }
}