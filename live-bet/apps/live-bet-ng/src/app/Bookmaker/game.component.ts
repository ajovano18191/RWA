import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Game from './game';
import { SubgameComponent } from './subgame.component';

@Component({
  selector: 'bookmaker-game',
  standalone: true,
  imports: [CommonModule, SubgameComponent, ],
  template: `
    <div class="game">
      <div class="game-title">{{ game.name }}</div>
      <div class="subgames">
        <bookmaker-subgame *ngFor="let subgame of game.subgames" [subgame]="subgame"/>
      </div>
    </div>
  `,
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  @Input() game: Game = {
    id: 0,
    name: '',
    subgames: [],
  }
}
