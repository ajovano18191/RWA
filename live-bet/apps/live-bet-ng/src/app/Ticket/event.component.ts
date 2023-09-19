import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Odds } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { OddsComponent } from '../Guest/odds.component';
import IEvent from '../ievent.model';
import { deleteEvent } from '../store/ticket.actions';

@Component({
  selector: 'ticket-event',
  standalone: true,
  imports: [CommonModule, OddsComponent, MatButtonModule, MatIconModule],
  template: `
    <div class="row">
      <div class="match-id">{{ event.oddsKey.matchId }}</div>
      <div class="teams">{{ event.home }} - {{ event.guest }}</div>
      <button mat-mini-fab [ngStyle]="{transform: 'scale(0.6)'}" class="delete-button" aria-label="Delete event" (click)="deleteEvent()">
          <mat-icon>close</mat-icon>
        </button>
    </div>
    <div class="row">
      <div class="game-name">{{ event.gameName }}</div>
      <div class="subgame-name">{{ event.subgameName }}</div>
      <guest-odds [odds]="event.oddsKey" (oddChangeEvent)="oddChangeEvent.emit($event)" />
    </div>
  `,
  styles: [
    ":host { display: flex; flex-direction: column; border: 2px solid white; border-radius: 16px; margin-block: 8px; padding-inline: 12px; }",
    ".row { display: flex; justify-content: space-between; margin-block: 8px; }",
    ".delete-button { margin-top: -12px; margin-right: -16px; background-color: rgb(100, 100, 100) !important; color: white !important; border: 2px solid white; }",
  ],
})
export class EventComponent {
  @Input() event: IEvent = {
    home: 'string',
    guest: 'string',
    gameId: 0,
    gameName: 'string',
    subgameName: 'string',
    oddsKey: {
      sportId: 0,
      matchId: 0,
      subgameId: 0,
    },
  };

  @Output() oddChangeEvent = new EventEmitter<Odds>();

  private store = inject(Store);

  deleteEvent() {
    this.store.dispatch(deleteEvent({ matchId: this.event.oddsKey.matchId }));
  }
}
