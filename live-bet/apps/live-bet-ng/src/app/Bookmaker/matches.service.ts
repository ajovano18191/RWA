import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SportsService } from '../sports.service';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private readonly baseURL = "http://localhost:3000/api/matches";
  private httpClient: HttpClient = inject(HttpClient);
  private sportsService: SportsService = inject(SportsService);

  constructor() { }

  start(matchId: number) {
    this.httpClient.get(`${this.baseURL}/${matchId}/start`).subscribe(() => this.sportsService.refresh());
  }

  end(matchId: number) {
    this.httpClient.get(`${this.baseURL}/${matchId}/end`).subscribe(() => this.sportsService.refresh());
  }
}
