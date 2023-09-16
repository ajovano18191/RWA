import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IMatch, ISubgame } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { MatchActions } from '../store/match.actions';
import { OddsComponent } from './odds.component';

@Component({
  selector: 'guest-match',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="match-id grey-white">{{ match.id }}</div>
    <div class="league grey-white">{{ match.league }}</div>
    <div class="home-guest-match grey-white grey-white-hover" (click)="go2MatchDetails()">
      {{ match.home }} <br> {{ match.guest }}
    </div>
    <div class="odds-container grey-white grey-white-hover" *ngFor="let subgame of getSubgames">
      <guest-odds  [odds]="{ sportId: match.sport.id, matchId: match.id, subgameId: subgame.id }" class="grey-white grey-white-hover"/>
    </div>
  `,
  styles: [
    ":host { display: contents; }",
    ":host > div { display: flex; justify-content: center; align-items: center; text-align: center; padding: 20px 0; font-size: 30px; } ",
    ".home-guest-match { grid-column: span 3; line-height: 1.2em; }",
    ".match-id { grid-column-start: 1; }",
    ".odds-container > * { width: 100%; height: 100%; }",
  ],
})
export class MatchComponent {
  @Input() match: IMatch = {
    id: 0,
    home: '',
    guest: '',
    league: '',
    status: 'live',
    sport: {
      id: 0,
      name: '',
      games: [],
      matches: [],
    }
  };

  get getSubgames(): ISubgame[] {
    return this.match.sport.games.slice(0, 3).map(p => p.subgames).flat();
  }

  private store = inject(Store);
  private router = inject(Router);

  go2MatchDetails() {
    this.store.dispatch(MatchActions.setMatch(this.match));
    this.router.navigate(['match-details']);
  }
}
