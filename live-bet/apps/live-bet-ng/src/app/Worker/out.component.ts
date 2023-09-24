import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'worker-out',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,],
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

  private snackBar: MatSnackBar = inject(MatSnackBar);

  payOut(): void {
    this.snackBar.open("The ticket was successfully paid.", undefined, {
      duration: 2000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
    this.ticketId = 0;
  }
}
