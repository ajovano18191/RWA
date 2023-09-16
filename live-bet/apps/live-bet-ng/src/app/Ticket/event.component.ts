import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { OddsComponent } from '../Guest/odds.component';
import IEvent from '../ievent.model';
import { Odds } from '../odds.model';
import { deleteEvent } from '../store/ticket.actions';

@Component({
  selector: 'ticket-event',
  standalone: true,
  imports: [CommonModule, OddsComponent, MatButtonModule, MatIconModule],
  template: `
    <div class="row">
      <div class="match-id">{{ event.oddsKey.matchId }}</div>
      <div class="teams">{{ event.home }} - {{ event.guest }}</div>
      <button mat-mini-fab color="warn" aria-label="Delete event" (click)="deleteEvent()">
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
    ":host { display: flex; flex-direction: column; border: 1px solid black; margin-block: 12px; padding: 8px; }",
    ".row { display: flex; justify-content: space-between; }",
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
