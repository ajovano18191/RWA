import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IGame, IMatch, ISubgame } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { MatchActions } from '../store/match.actions';
import { FavoriteComponent } from './favorite.component';
import { OddsContainerComponent } from './odds-container.component';

@Component({
  selector: 'guest-match',
  standalone: true,
  imports: [CommonModule, MatIconModule, OddsContainerComponent, FavoriteComponent,],
  template: `
    <div class="grey-white favorite">
      <guest-favorite [match]="match" />
    </div>
    <div class="match-id grey-white">{{ match.id }}</div>
    <div class="league grey-white">{{ match.league }}</div>
    <div class="home-guest-match grey-white grey-white-hover" (click)="go2MatchDetails()">
      {{ match.home }} - {{ match.guest }}
    </div>
    <ng-container *ngFor="let game of getGames">
      <div class="white-grey"></div>
      <ng-container *ngFor="let subgame of game.subgames">
        <guest-odds-container [subgame]="subgame" [match]="match" class="grey-white" />
      </ng-container>
    </ng-container>
  `,
  styles: [
    ":host { display: contents; }",
    ":host > div { display: flex; justify-content: center; align-items: center; text-align: center; padding: 20px 16px; font-size: 30px; } ",
    ".favorite { grid-column-start: 1; }",
    ".home-guest-match { grid-column: span 3; line-height: 1.2em; }",
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
    },
  };

  get getGames(): IGame[] {
    return this.match.sport.games.slice(0, 3);
  }

  get getSubgames(): ISubgame[] {
    return this.match.sport.games.slice(0, 3).map(p => p.subgames).flat();
  }

  private store = inject(Store);
  private router = inject(Router);

  go2MatchDetails() {
    this.store.dispatch(MatchActions.setMatch(this.match));
    this.router.navigate(['guest', 'match-details']);
  }
}
