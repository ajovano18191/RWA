import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from './sport.component';
import { OddsComponent } from './odds.component';
import { Store } from '@ngrx/store';
import { selectOddses } from './state/oddses.selector';
import { OdssesActions } from './state/oddses.actions';
import { filter, map } from 'rxjs';

@Component({
  selector: 'guest-match',
  standalone: true,
  imports: [CommonModule, OddsComponent],
  template: `
    <div class="match-id">{{ match.id }}</div>
    <div class="league">{{ match.league }}</div>
    <div class="home-guest-match">
      {{ match.home }} <br> {{ match.guest }}
    </div>
    <guest-odds  *ngFor="let odds of match.oddses" [odds]="odds"/>
  `,
  styles: [
    ":host { display: contents; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
    ".home-guest-match { grid-column: span 3; }",
  ],
})
export class MatchComponent {
  @Input() match: Match = {
    id: 0,
    home: '',
    guest: '',
    league: '',
    oddses: [],
  }
}
