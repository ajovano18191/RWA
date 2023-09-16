import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ISubgame } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { OddsComponent } from '../Guest/odds.component';
import { selectMatch } from '../store/match.selector';

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
