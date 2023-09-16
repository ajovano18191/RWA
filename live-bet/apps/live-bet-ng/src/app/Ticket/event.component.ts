import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import IEvent from '../ievent.model';
import { OddsComponent } from '../Guest/odds.component';

@Component({
  selector: 'ticket-event',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="row">
      <div class="match-id">{{ event.oddsKey.matchId }}</div>
      <div class="teams">{{ event.home }} - {{ event.guest }}</div>
      <div class="x">X</div>
    </div>
    <div class="row">
      <div class="game-name">{{ event.gameName }}</div>
      <div class="subgame-name">{{ event.subgameName }}</div>
      <guest-odds [odds]="event.oddsKey" />
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
}
