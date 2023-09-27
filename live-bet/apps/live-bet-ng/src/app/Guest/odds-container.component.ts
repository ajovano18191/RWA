import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener, Input, OnInit, inject } from '@angular/core';
import { IMatch, ISubgame, OddsKey } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { setOrDeleteEvent } from '../store/ticket.actions';
import { selectAllEvents } from '../store/ticket.selectors';
import { OddsComponent } from './odds.component';

@Component({
  selector: 'guest-odds-container',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="container grey-white" [ngStyle]="{'background-color': backgroundColor$ | async}" [ngClass]="subgame.isPlayable ? 'grey-white-hover' : ''">
      <guest-odds [odds]="oddsKey" class="grey-white" />
    </div>
  `,
  styles: [
    ":host { display: contents; }",
    ".container { display: flex; justify-content: flex-end; align-items: center; font-size: 30px; height: 100%; padding: 0px 16px;  } ",
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

  get oddsKey() {
    return {
      sportId: this.match.sport.id,
      matchId: this.match.id,
      subgameId: this.subgame.id,
    } as OddsKey;
  }

  @HostBinding('class') hoverClass = '';

  private store = inject(Store);
  backgroundColor$ = new Observable<string>();

  ngOnInit(): void {
    this.hoverClass = this.subgame.isPlayable ? 'grey-white-hover' : '';
    this.backgroundColor$ = this.store.select(selectAllEvents)
    .pipe(
      map(events => events.map(event => event.oddsKey)),
      map(oddsKeys => oddsKeys.filter(odssKey => odssKey.sportId === this.oddsKey.sportId && odssKey.matchId === this.oddsKey.matchId && odssKey.subgameId === this.oddsKey.subgameId)[0]),
      map(p => p ? 'rgb(200, 200, 200' : ''),
    );
  }

  @HostListener('click')
  add2Ticket() {
    if(this.subgame.isPlayable) {
      this.store.dispatch(setOrDeleteEvent({ match: this.match, subgame: this.subgame, }));
    }
  }
}