import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Match } from './bookmaker.component';

@Component({
  selector: 'live-bet-add-match-dialog',
  styles: [
    ".mat-mdc-dialog-actions { justify-content: flex-end; }"
  ],
  template: `
    <div mat-dialog-content>
      <h1><b>Add match</b></h1>
      <mat-form-field>
        <mat-label>League</mat-label>
        <input matInput [(ngModel)]="data.league">
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>Home</mat-label>
        <input matInput [(ngModel)]="data.home">
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>Guest</mat-label>
        <input matInput [(ngModel)]="data.guest">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  providers: [MatDialog]
})
export class AddMatchDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddMatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Match,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}