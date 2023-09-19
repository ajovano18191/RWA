import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TicketType } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, take } from 'rxjs';
import IEvent from '../ievent.model';
import { selectAllEvents, selectEventTotal } from '../store/ticket.selectors';
import { TicketService } from '../ticket.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TicketIdDialogComponent } from './ticket-id-dialog.component';

@Component({
  selector: 'ticket-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule,],
  template: `
    <ng-container *ngIf="(eventTotal$ | async); else emptyTicket">
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
      <div class="row">
        <div class="payout-label">Payout (RSD):</div>
        <div class="payout-value">{{ summaryOdds * stake | number:'1.2-2' }}</div>
      </div>
    </ng-container>
    <ng-template #emptyTicket>
      Your ticket is empty.
      <br>
      Make your bets, please.
    </ng-template>
  `,
  styles: [
    ".row { display: flex; justify-content: space-between; margin-block: 12px; }",
    ".stake { width: 100%; }",
    "input { text-align: right; }",
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }",
    "input[type=number] { -moz-appearance: textfield; }",
    ".place-bet-button { width: 100%; margin-top: -12px; }",
  ],
})
export class SummaryComponent implements OnInit {
  private store = inject(Store);

  event$: Observable<IEvent[]> = new Observable<IEvent[]>();
  eventTotal$ = new Observable<number>();
  stake: number = 20;
  
  @Input() summaryOdds: number = 1;

  ngOnInit(): void {
    this.event$ = this.store.select(selectAllEvents);
    this.eventTotal$ = this.store.select(selectEventTotal);
  }

  private ticketService: TicketService = inject(TicketService);
  private dialog: MatDialog = inject(MatDialog);

  placeBet(): void {
    this.event$.pipe(
      take(1),
      exhaustMap(events =>
        this.ticketService.placeBet({
          stake: this.stake,
          type: TicketType.live,
          events: events.map(event => event.oddsKey),
        })
      )
    )
    .subscribe(ticket => {
      this.dialog.open(TicketIdDialogComponent, {
        data: ticket,
      });
    });
  }
}
