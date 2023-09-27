import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatchStatus } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, exhaustMap, map, take } from 'rxjs';
import IEvent from '../ievent.model';
import { selectAllEvents, selectEventTotal } from '../store/ticket.selectors';
import { selectUser } from '../store/user.selector';
import { TicketService } from '../ticket.service';
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
        <button mat-raised-button class="place-bet-button" *ngIf="(isTicketPlayable() | async); else notExpress" (click)="placeBet()">PLACE BET</button>
        <ng-template #notExpress>Ticket with live events can't be express.</ng-template>
      </div>
      <div class="row">
        <div class="payout-label">Payout (RSD):</div>
        <div class="payout-value"><b>{{ summaryOdds * stake | number:'1.2-2' }}</b></div>
      </div>
    </ng-container>
    <ng-template #emptyTicket>
      <p class="empty-ticket">
        Your ticket is empty.
        <br>
        Make your bets, please.
      <p>
    </ng-template>
  `,
  styles: [
    ".row { display: flex; justify-content: space-between; margin-block: 16px; }",
    ".stake { width: 100%; }",
    "input { text-align: right; }",
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }",
    "input[type=number] { -moz-appearance: textfield; }",
    ".place-bet-button { width: 100%; margin-top: -12px; background-color: rgb(100, 100, 100) !important; color: white !important; border: 2px solid white; }",
    ".empty-ticket {text-align: center; }",
  ],
})
export class SummaryComponent {
  private store = inject(Store);

  event$: Observable<IEvent[]> = this.store.select(selectAllEvents);
  eventTotal$ = this.store.select(selectEventTotal);
  stake: number = 20;
  
  @Input() summaryOdds: number = 1;

  isTicketPlayable(): Observable<boolean> {
    return combineLatest([
      this.event$
      .pipe(
        map(events => !events.some(event => event.matchStatus === MatchStatus.live)),
      ),
      this.store.select(selectUser)
      .pipe(
        map(userDTO => userDTO.role === 'worker'),
      ),
    ])
    .pipe(
      map(p => p[0] || p[1]),
    );
  }

  private ticketService: TicketService = inject(TicketService);
  private dialog: MatDialog = inject(MatDialog);

  placeBet(): void {
    this.event$.pipe(
      take(1),
      exhaustMap(events =>
        this.ticketService.placeBet({
          stake: this.stake,
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
