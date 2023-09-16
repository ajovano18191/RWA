import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import IEvent from '../ievent.model';
import { Odds } from '../odds.model';
import { clearEvents } from '../store/ticket.actions';
import { selectAllEvents, selectEventTotal } from '../store/ticket.selectors';
import { EventComponent } from './event.component';

@Component({
  selector: 'ticket',
  standalone: true,
  imports: [CommonModule, EventComponent, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule,],
  template: `
    <div class="row">
      <div class="title">Ticket</div>
      <button mat-raised-button color="primary" (click)="clearEvents()">CLEAR</button>
    </div>
    <ticket-event *ngFor="let event of (event$ | async)" [event]="event" (oddChangeEvent)="onOddChange($event)" />
    <div class="summary">
      <div class="row">
        <div class="events-number">Events: {{ eventTotal$ | async }}</div>
        <div class="odds">Odds: {{ summaryOdds | number:'1.2-2' }}</div>
      </div>
      <div class="row">
        <mat-form-field class="stake">
          <mat-label>Stake (RSD):</mat-label>
          <input matInput type="number" [(ngModel)]="stake">
        </mat-form-field>
      </div>
      <div class="row">
        <button mat-raised-button color="primary" class="place-bet-button" (click)="placeBet()">PLACE BET</button>
      </div>
    </div>
  `,
  styles: [
    ":host { display: flex; flex-direction: column; padding: 12px; }",
    ".row { display: flex; justify-content: space-between; margin-block: 12px; }",
    ".stake { width: 100%; }",
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }",
    "input[type=number] { -moz-appearance: textfield; }",
    ".place-bet-button { width: 100%; }",
  ],
})
export class TicketComponent implements OnInit {
  private store = inject(Store);

  stake: number = 20;
  numberOfEvent$ = new Observable<number>();

  event$ = new Observable<IEvent[]>();
  eventTotal$ = new Observable<number>();

  ngOnInit(): void {
    this.event$ = this.store.select(selectAllEvents);
    this.eventTotal$ = this.store.select(selectEventTotal);
  }

  ticketMap: Map<number, number> = new Map<number, number>();
  summaryOdds: number = 1;

  onOddChange(odds: Odds) {
    this.ticketMap.set(odds.oddsKey.matchId, odds.value);
    this.summaryOdds = Array.from(this.ticketMap.values()).reduce((previousValue, currentValue) => previousValue *= currentValue, 1);
  }

  placeBet() {

  }

  clearEvents(): void {
    this.store.dispatch(clearEvents());
  }
}
