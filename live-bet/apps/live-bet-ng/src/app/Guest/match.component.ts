import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OddsComponent } from './odds.component';
import { IMatch, ISubgame } from 'libs/dto/src';

@Component({
  selector: 'guest-match',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="match-id">{{ match.id }}</div>
    <div class="league">{{ match.league }}</div>
    <div class="home-guest-match">
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
}
