import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISubgame } from '@live-bet/dto';

@Component({
  selector: 'guest-subgame',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="subgame-name">{{ subgame.name }}</div>`,
  styles: [
    ":host { display: contents; }",
    ":host > *:hover {background-color: red; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
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
      }
    },
  }
}
