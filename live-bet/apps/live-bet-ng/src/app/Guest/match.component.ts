import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { IMatch, ISubgame } from '@live-bet/dto';
import { filter } from 'rxjs';
import { OfferService } from '../offer.service';
import { OddsComponent } from './odds.component';

@Component({
  selector: 'guest-match',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <ng-container *ngIf="isShown">
      <div class="match-id">{{ match.id }}</div>
      <div class="league">{{ match.league }}</div>
      <div class="home-guest-match">
        {{ match.home }} <br> {{ match.guest }}
      </div>
      <guest-odds *ngFor="let subgame of getSubgames" [odds]="{ sportId: match.sport.id, matchId: match.id, subgameId: subgame.id }"/>
    <ng-container>
  `,
  styles: [
    ":host { display: contents; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
    ".home-guest-match { grid-column: span 3; }",
    ".match-id { grid-column-start: 1; }",
  ],
})
export class MatchComponent implements OnInit {
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

  isShown: boolean = true;

  offerService: OfferService = inject(OfferService);

  ngOnInit(): void {
    this.offerService.endMatche$
    .pipe(
      filter(p => p === this.match.id),
    )
    .subscribe(p => {
        this.isShown = false;
    });
  }

  get getSubgames(): ISubgame[] {
    return this.match.sport.games.map(p => p.subgames).flat();
  }
}
