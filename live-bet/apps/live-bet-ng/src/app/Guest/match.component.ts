import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from './sport.component';
import { OddsComponent } from './odds.component';
import { Store } from '@ngrx/store';
import { selectMatches, selectMatchesWithoutParameters, selectOddses } from './state/oddses.selector';
import { OdssesActions } from './state/oddses.actions';
import { Observable, filter, map, pairwise, startWith, tap } from 'rxjs';

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
    <guest-odds  *ngFor="let subgameId of [0,1,2,3,4, 5, 6, 7, 8]" [odds]="{ id: 0, sportId: this.match.sportId, matchId: this.match.id, subgameId: subgameId }"/>
    <!-- <guest-odds  *ngFor="let odds of mapOddses$ | async | keyvalue" [odds]="{ id: 0, sportId: this.match.sportId, matchId: this.match.id, subgameId: odds.key }"/> -->
  `,
  styles: [
    ":host { display: contents; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
    ".match-id { grid-column-start: 1; }",
    ".home-guest-match { grid-column: span 3; }",
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
