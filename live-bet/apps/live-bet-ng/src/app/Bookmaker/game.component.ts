import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IGame, newIGame } from '@live-bet/dto';
import { SportsService } from '../sports.service';
import Offer from './offer';
import { SubgameComponent } from './subgame.component';

@Component({
  selector: 'bookmaker-game',
  standalone: true,
  imports: [CommonModule, SubgameComponent, MatButtonModule, MatIconModule],
  template: `
    <div class="game">
      <div class="game-title">
        <span>{{ game.name }}</span>
      </div>
      <button mat-mini-fab [ngStyle]="{transform: 'scale(0.75)'}" class="delete-button" aria-label="Delete event" (click)="deleteGame()">
          <mat-icon>close</mat-icon>
      </button>
      <div class="subgames">
        <bookmaker-subgame *ngFor="let subgame of game.subgames" [matchId]="matchId" [subgame]="subgame" (oddChangeEvent)="changeOdd($event)"/>
      </div>
    </div>
  `,
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  @Input() game: IGame = newIGame();

  @Input() matchId: number = 0;

  @Output() oddChangeEvent = new EventEmitter<Offer>();

  changeOdd(offer: Offer) {
    this.oddChangeEvent.emit(offer);
  }

  private sportsService: SportsService = inject(SportsService);

  deleteGame() {
    this.sportsService.deleteGame(this.game.id);
  }
}
