import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { IGame } from '@live-bet/dto';

@Component({
  selector: 'guest-end-match-game',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule,],
  template: `
    <mat-radio-group class="row" [(ngModel)]="subgameKey" (change)="subgameChangeEvent.emit(subgameKey)" >
      <div class="cell first-cell">{{ game.name }}</div>
      <ng-container *ngFor="let subgame of game.subgames">
        <mat-radio-button class="cell" color="primary" [value]="{ gameId: game.id, subgameId: subgame.id }">
          {{ subgame.name }}
        </mat-radio-button>
      </ng-container>
    </mat-radio-group>
  `,
  styles: [
    ":host { display: contents; }",
    "mat-radio-group { display: contents; }",
    ".first-cell { grid-column: 1 / span 1; display: flex; align-items: center; }",
  ],
})
export class EndMatchGameComponent {
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

  subgameKey: {
    gameId: number,
    subgameId: number,
  } = {
    gameId: 0,
    subgameId: 0,
  };

  @Output() subgameChangeEvent = new EventEmitter<{
    gameId: number,
    subgameId: number,
  }>();
}
