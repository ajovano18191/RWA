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
    <div class="match-id">{{ match.id }}</div>
    <div class="league">{{ match.league }}</div>
    <div class="home-guest-match" (click)="go2MatchDetails()">
      {{ match.home }} <br> {{ match.guest }}
    </div>
    <guest-odds *ngFor="let subgame of getSubgames" [odds]="{ sportId: match.sport.id, matchId: match.id, subgameId: subgame.id }"/>
  `,
  styles: [
    ":host { display: contents; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
    ".home-guest-match { grid-column: span 3; }",
    ".match-id { grid-column-start: 1; }",
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
    return this.match.sport.games.map(p => p.subgames).flat();
  }

  private store = inject(Store);
  private router = inject(Router);

  go2MatchDetails() {
    this.store.dispatch(MatchActions.setMatch(this.match));
    this.router.navigate(['match-details']);
  }
}
