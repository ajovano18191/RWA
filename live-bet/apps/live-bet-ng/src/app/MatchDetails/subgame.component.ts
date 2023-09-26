import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { IMatch, ISubgame, OddsKey } from '@live-bet/dto';
import { MatchStatus } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { OddsComponent } from '../Guest/odds.component';
import IEvent from '../ievent.model';
import { selectMatch } from '../store/match.selector';
import { setOrDeleteEvent } from '../store/ticket.actions';
import { selectAllEvents } from '../store/ticket.selectors';

@Component({
  selector: 'match-details-subgame',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="container" [ngStyle]="{'background-color': classe$ | async}" [ngClass]="subgame.isPlayable ? 'grey-white-hover' : ''">
      <div class="subgame-name">{{ subgame.name }}</div>
      <guest-odds [odds]="{ sportId: subgame.game.sport.id, matchId: (matche$ | async)!.id, subgameId: subgame.id }" class="white-grey" />
    </div>
  `,
  styles: [
    
    ".container { display: flex; justify-content: space-between; font-size: 24px; padding: 10px; } ",
    ".container > * { width: 100%; height: 100%; }",
  ],
})
export class SubgameComponent implements OnInit {
  @Input() subgame: ISubgame = {
    id: 0,
    name: '',
    isPlayable: true,
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

  classe$ = new Observable<string>();

  ngOnInit(): void {
    this.matche$.subscribe(match => this.match = match);
    this.classe$ = this.store.select(selectAllEvents)
    .pipe(
      map(events => events.map(event => event.oddsKey)),
      map(oddsKeys => oddsKeys.filter(odssKey => odssKey.sportId === this.oddsKey.sportId && odssKey.matchId === this.oddsKey.matchId && odssKey.subgameId === this.oddsKey.subgameId)[0]),
      map(p => {
        if(p) {
          return 'rgb(200, 200, 200)';
        }
        else {
          return 'white';
        }
      })
    );
  }

  get oddsKey() {
    return {
      sportId: this.match.sport.id,
      matchId: this.match.id,
      subgameId: this.subgame.id,
    } as OddsKey;
  }

  @HostListener('click')
  add2Ticket() {
    const event: IEvent = {
      home: this.match.home,
      guest: this.match.guest,
      matchStatus: this.match.status as MatchStatus,
      gameId: this.subgame.game.id,
      gameName: this.subgame.game.name,
      subgameName: this.subgame.name,
      oddsKey: {
        sportId: this.match.sport.id,
        matchId: this.match.id,
        subgameId: this.subgame.id,
      }
    };
    if(this.subgame.isPlayable) {
      this.store.dispatch(setOrDeleteEvent({ event }));
    }
  }
}
// ":host { display: flex; justify-content: space-between; padding: 10px; font-size: 24px; }",