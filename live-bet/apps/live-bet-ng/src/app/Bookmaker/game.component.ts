import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import Game from './game';
import { SubgameComponent } from './subgame.component';
import Offer from './offer';

@Component({
  selector: 'bookmaker-game',
  standalone: true,
  imports: [CommonModule, SubgameComponent, ],
  template: `
    <div class="game">
      <div class="game-title">{{ game.name }}</div>
      <div class="subgames">
        <bookmaker-subgame *ngFor="let subgame of game.subgames" [subgame]="subgame" (oddChangeEvent)="changeOdd($event)"/>
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

  @Output() oddChangeEvent = new EventEmitter<Offer>();

  changeOdd(offer: Offer) {
    this.oddChangeEvent.emit(offer);
  }
}
