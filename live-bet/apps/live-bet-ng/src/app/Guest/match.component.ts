import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Match from './match.model';
import { OddsComponent } from './odds.component';

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
    <guest-odds *ngFor="let subgameId of [0, 1, 2, 3, 4, 5, 6, 7, 8]" [odds]="{ sportId: this.match.sportId, matchId: this.match.id, subgameId: subgameId }"/>
  `,
  styles: [
    ":host { display: contents; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
    ".home-guest-match { grid-column: span 3; }",
    ".match-id { grid-column-start: 1; }",
  ],
})
export class MatchComponent {
  @Input() match: Match = {
    id: 0,
    sportId: 0,
    home: '',
    guest: '',
    league: '',
  }
}
