import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IGame } from '@live-bet/dto';
import { SubgameComponent } from './subgame.component';

@Component({
  selector: 'match-details-game',
  standalone: true,
  imports: [CommonModule, SubgameComponent,],
  template: `
    <h1 class="game-name">{{ game.name }}</h1>
    <match-details-subgame *ngFor="let subgame of game.subgames" [subgame]="subgame" [ngClass]="subgame.isPlayable ?  'white-grey-hover' : ''" class="white-grey" />
  `,
  styles: [
    ":host { display: contents; }",
    ".game-name { grid-column: 1 / span 3; color: white; margin-top: 20px; margin-bottom: 5px; }",
  ],
})
export class GameComponent {
  @Input() game: IGame = {
    id: 0,
    name: '',
    subgames: [],
    sport: {
      id: 0,
      name: '',
      games: [],
      matches: [],
    },
  };
}
