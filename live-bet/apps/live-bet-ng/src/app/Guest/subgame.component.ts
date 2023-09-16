import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ISubgame } from '@live-bet/dto';

@Component({
  selector: 'guest-subgame',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="subgame-name grey-white">{{ subgame.name }}</div>`,
  styles: [
    ":host { display: contents; }",
    ":host > * { text-align: center; padding: 20px 0; font-size: 30px; } ",
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
