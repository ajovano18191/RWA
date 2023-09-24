import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

@Component({
  selector: 'worker-in',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  template: `
    <mat-card class="example-card">
      <mat-card-header>
        <mat-card-title>IN</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Ticket ID</mat-label>
            <input matInput type="number" [(ngModel)]="ticketId">
          </mat-form-field>
        </div>
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Stake</mat-label>
            <input matInput type="number" [(ngModel)]="stake">
          </mat-form-field>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="payIn()">Pay in</button>
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
export class InComponent {
  ticketId: number = 0;
  stake: number = 0;

  private snackBar: MatSnackBar = inject(MatSnackBar);

  payIn(): void {
    this.snackBar.open("The ticket was successfully paid.", undefined, {
      duration: 2000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
    this.ticketId = 0;
    this.stake = 0;
  }
}
