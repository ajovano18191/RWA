import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEventTotal } from '../store/ticket.selectors';

@Component({
  selector: 'ticket-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule,],
  template: `
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
      <div class="payout-value">{{ summaryOdds * stake }}</div>
    </div>
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

  eventTotal$ = new Observable<number>();
  stake: number = 20;
  
  @Input() summaryOdds: number = 1;

  ngOnInit(): void {
    this.eventTotal$ = this.store.select(selectEventTotal);
  }

  placeBet() {

  }
}
