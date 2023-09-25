import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter } from 'rxjs';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'worker-out',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule,],
  template: `
    <mat-card class="example-card">
      <mat-card-header>
        <mat-card-title>OUT</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Ticket ID</mat-label>
            <input matInput type="number" [(ngModel)]="ticketId">
          </mat-form-field>
        </div>
        <div>
          For payout: {{ payOutValue | number:'1.2-2' }}
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="payOut()">Pay out</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    ":host { width: fit-content; }",
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }",
    "input[type=number] { -moz-appearance: textfield; }",
    "mat-card-actions { display: flex; justify-content: flex-end; }",
  ],
})
export class OutComponent {
  ticketId: number = 0;
  payOutValue: number = 0;

  private ticketService: TicketService = inject(TicketService);

  payOut(): void {
    this.payOutValue = 0;
    this.ticketService.payOut(this.ticketId)
    .pipe(
      filter(p => p !== 0),
    )
    .subscribe(p => {
      this.payOutValue = p;
      this.ticketId = 0;
    });
  }
}
