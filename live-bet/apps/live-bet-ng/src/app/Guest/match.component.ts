import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IMatch, ISubgame } from '@live-bet/dto';
import { MatchStatus } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import IEvent from '../ievent.model';
import { MatchActions } from '../store/match.actions';
import { setOrDeleteEvent } from '../store/ticket.actions';
import { FavoriteComponent } from './favorite.component';
import { OddsContainerComponent } from './odds-container.component';

@Component({
  selector: 'guest-match',
  standalone: true,
  imports: [CommonModule, MatIconModule, OddsContainerComponent, FavoriteComponent,],
  template: `
    <div class="match-id grey-white">{{ match.id }}</div>
    <div class="grey-white">
      <guest-favorite [match]="match" />
    </div>
    <div class="league grey-white">{{ match.league }}</div>
    <div class="home-guest-match grey-white grey-white-hover" (click)="go2MatchDetails()">
      {{ match.home }} <br> {{ match.guest }}
    </div>
    <guest-odds-container *ngFor="let subgame of getSubgames" [subgame]="subgame" [match]="match" class="grey-white" />
  `,
  styles: [
    ":host { display: contents; }",
    ":host > div { display: flex; justify-content: center; align-items: center; text-align: center; padding: 20px 16px; font-size: 30px; } ",
    ".home-guest-match { grid-column: span 3; line-height: 1.2em; }",
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
    },
  };

  get getSubgames(): ISubgame[] {
    return this.match.sport.games.slice(0, 3).map(p => p.subgames).flat();
  }

  private store = inject(Store);
  private router = inject(Router);


  go2MatchDetails() {
    this.store.dispatch(MatchActions.setMatch(this.match));
    this.router.navigate(['guest', 'match-details']);
  }

  add2Ticket(subgame: ISubgame) {
    const event: IEvent = {
      home: this.match.home,
      guest: this.match.guest,
      matchStatus: this.match.status as MatchStatus,
      gameId: subgame.game.id,
      gameName: subgame.game.name,
      subgameName: subgame.name,
      oddsKey: {
        sportId: this.match.sport.id,
        matchId: this.match.id,
        subgameId: subgame.id,
      }
    }
    if(subgame.isPlayable) {
      this.store.dispatch(setOrDeleteEvent({ event }));
    }
  }
}
