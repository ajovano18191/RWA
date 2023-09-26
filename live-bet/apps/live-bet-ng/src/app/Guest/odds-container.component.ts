import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener, Input, OnInit, inject } from '@angular/core';
import { IMatch, ISubgame, OddsKey } from '@live-bet/dto';
import { MatchStatus } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import IEvent from '../ievent.model';
import { setOrDeleteEvent } from '../store/ticket.actions';
import { selectAllEvents } from '../store/ticket.selectors';
import { OddsComponent } from './odds.component';

@Component({
  selector: 'guest-odds-container',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="container" [ngStyle]="{'background-color': classe$ | async}" [ngClass]="subgame.isPlayable ? 'grey-white-hover' : ''">
      <guest-odds 
        [odds]="oddsKey" 
        class="grey-white"
      />
    </div>
  `,
  styles: [
    ".container { display: flex; justify-content: center; align-items: center; text-align: center; font-size: 30px; width: 100%; height: 100%; } ",
    ".container > * { width: 100%; height: 100%; }",
  ],
})
export class OddsContainerComponent implements OnInit {
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
      }
    },
  };

  @HostBinding('class') hoverClass = '';

  ngOnInit(): void {
    this.hoverClass = this.subgame.isPlayable ? 'grey-white-hover' : '';
    this.classe$ = this.store.select(selectAllEvents)
    .pipe(
      map(events => events.map(event => event.oddsKey)),
      map(oddsKeys => oddsKeys.filter(odssKey => odssKey.sportId === this.oddsKey.sportId && odssKey.matchId === this.oddsKey.matchId && odssKey.subgameId === this.oddsKey.subgameId)[0]),
      map(p => {
        if(p) {
          return 'rgb(200, 200, 200)';
        }
        else {
          return 'rgb(100, 100, 100)';
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

  private store = inject(Store);

  classe$ = new Observable<string>();

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
    }
    if(this.subgame.isPlayable) {
      this.store.dispatch(setOrDeleteEvent({ event }));
    }
  }
}