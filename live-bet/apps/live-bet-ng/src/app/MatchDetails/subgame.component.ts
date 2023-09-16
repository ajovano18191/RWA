import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OddsComponent } from '../Guest/odds.component';
import { ISubgame } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { selectMatch } from '../store/match.selector';

@Component({
  selector: 'match-details-subgame',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="subgame-name">{{ subgame.name }}</div>
    <guest-odds [odds]="{ sportId: subgame.game.sport.id, matchId: (matche$ | async)!.id, subgameId: subgame.id }" />
  `,
  styles: [
    ":host { display: flex; justify-content: space-between; background-color: white; padding: 10px; color: black; }",
  ],
})
export class SubgameComponent {
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
}
