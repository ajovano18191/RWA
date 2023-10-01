import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IGame, newIGame } from '@live-bet/dto';
import { SubgameComponent } from './subgame.component';

@Component({
  selector: 'match-details-game',
  standalone: true,
  imports: [CommonModule, SubgameComponent,],
  template: `
    <h1 class="game-name">{{ game.name }}</h1>
    <match-details-subgame *ngFor="let subgame of game.subgames" [subgame]="subgame" [ngClass]="subgame.isPlayable ?  'border-text-hover' : ''" class="back-text" />
  `,
  styles: [
    ":host { display: contents; }",
    ".game-name { grid-column: 1 / span 3;margin-top: 20px; margin-bottom: 5px; }",
  ],
})
export class GameComponent {
  @Input() game: IGame = newIGame();
}
