import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { IMatch, ISubgame } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { OddsComponent } from '../Guest/odds.component';
import IEvent from '../ievent.model';
import { selectMatch } from '../store/match.selector';
import { setEvent } from '../store/ticket.actions';

@Component({
  selector: 'match-details-subgame',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="subgame-name">{{ subgame.name }}</div>
    <guest-odds [odds]="{ sportId: subgame.game.sport.id, matchId: (matche$ | async)!.id, subgameId: subgame.id }" class="white-grey" />
  `,
  styles: [
    ":host { display: flex; justify-content: space-between; padding: 10px; font-size: 24px; }",
  ],
})
export class SubgameComponent implements OnInit {
  @Input() subgame: ISubgame = {
    id: 0,
    name: '',
    game: {
      id: 0,
      name: '',
      subgames: [],
      sport: {
        id: 0,
        name: '',
        games: [],
        matches: [],
      },
    },
  };

  private store = inject(Store);
  matche$ = this.store.select(selectMatch);

  private match: IMatch = {
    id: 0,
    league: '',
    home: '',
    guest: '',
    status: 'live',
    sport: {
      id: 0,
      name: '',
      games: [],
      matches: [],
    },
  };

  ngOnInit(): void {
    this.matche$.subscribe(match => this.match = match);
  }

  @HostListener('click')
  add2Ticket() {
    const event: IEvent = {
      home: this.match.home,
      guest: this.match.guest,
      gameId: this.subgame.game.id,
      gameName: this.subgame.game.name,
      subgameName: this.subgame.name,
      oddsKey: {
        sportId: this.match.sport.id,
        matchId: this.match.id,
        subgameId: this.subgame.id,
      }
    };
    this.store.dispatch(setEvent({ event }));
  }
}
