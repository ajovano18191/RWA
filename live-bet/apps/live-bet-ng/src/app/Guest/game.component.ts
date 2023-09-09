import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Game from './game.model';

@Component({
  selector: 'guest-game',
  standalone: true,
  imports: [CommonModule],
  template:  `<div class="game-name">{{ game.name }}</div>`,
  styles: [
    ":host { display: contents; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
    ".game-name { grid-column: span 3; }"
  ],
})
export class GameComponent {
  @Input() game: Game = {
    id: 0,
    name: '',
    subgames: [],
  };
}