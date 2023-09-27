import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Odds } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import IEvent from '../ievent.model';
import { clearEvents } from '../store/ticket.actions';
import { selectAllEvents } from '../store/ticket.selectors';
import { EventComponent } from './event.component';
import { SummaryComponent } from './summary.component';

@Component({
  selector: 'ticket',
  standalone: true,
  imports: [CommonModule, EventComponent, SummaryComponent, MatButtonModule,],
  template: `
    <div class="header">
      <h1 class="title">TICKET</h1>
      <button mat-raised-button class="clear-button"  (click)="clearEvents()">CLEAR</button>
    </div>
    <ticket-event *ngFor="let event of (event$ | async)" [event]="event" (oddChangeEvent)="onOddChange($event)" />
    <ticket-summary [summaryOdds]="summaryOdds"/>
  `,
  styles: [
    ":host { display: flex; flex-direction: column; padding: 16px; }",
    ":host > * { font-size: 24px; }",
    ".header { display: flex; justify-content: space-between; margin-block: 16px; }",
    ".title { font-size: 30px; }",
    ".clear-button { background-color: rgb(100, 100, 100) !important; color: white !important; border: 2px solid white; }",
  ],
})
export class TicketComponent {
  private store = inject(Store);

  event$: Observable<IEvent[]> = this.store.select(selectAllEvents);

  ticketMap: Map<number, number> = new Map<number, number>();
  summaryOdds: number = 1;

  onOddChange(odds: Odds) {
    this.ticketMap.set(odds.oddsKey.matchId, odds.value);
    this.summaryOdds = Array.from(this.ticketMap.values()).reduce((previousValue, currentValue) => previousValue *= currentValue, 1);
  }

  clearEvents(): void {
    this.store.dispatch(clearEvents());
  }
}
