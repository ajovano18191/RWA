import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IGame, newIGame } from '@live-bet/dto';

@Component({
  selector: 'guest-game',
  standalone: true,
  imports: [CommonModule,],
  template:  `<div class="game-name back-text">{{ game.name }}</div>`,
  styles: [
    ":host { display: contents; }",
    ":host > * { text-align: center; padding: 20px 0; font-size: 30px; }",
    ".game-name { grid-column: span 3; }"
  ],
})
export class GameComponent {
  @Input() game: IGame = newIGame();
}
