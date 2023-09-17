import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import IEvent from '../ievent.model';
import { Odds } from '../odds.model';
import { clearEvents } from '../store/ticket.actions';
import { selectAllEvents } from '../store/ticket.selectors';
import { EventComponent } from './event.component';
import { SummaryComponent } from './summary.component';

@Component({
  selector: 'ticket',
  standalone: true,
  imports: [CommonModule, EventComponent, SummaryComponent, ],
  template: `
    <div class="header">
      <div class="title">Ticket</div>
      <button mat-raised-button color="primary" (click)="clearEvents()">CLEAR</button>
    </div>
    <ticket-event *ngFor="let event of (event$ | async)" [event]="event" (oddChangeEvent)="onOddChange($event)" />
    <ticket-summary [summaryOdds]="summaryOdds" />
  `,
  styles: [
    ":host { display: flex; flex-direction: column; padding: 12px; }",
    ".header { display: flex; justify-content: space-between; margin-block: 12px; }",
  ],
})
export class TicketComponent implements OnInit {
  private store = inject(Store);

  event$ = new Observable<IEvent[]>();
  
  ngOnInit(): void {
    this.event$ = this.store.select(selectAllEvents);
  }

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
