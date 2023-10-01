import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatchDTO } from '@live-bet/dto';

@Component({
  selector: 'live-bet-add-match-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  providers: [MatDialog],
  template: `
    <div mat-dialog-content>
      <h1><b>Add match</b></h1>
      <mat-form-field>
        <mat-label>League</mat-label>
        <input matInput [(ngModel)]="matchDTO!.league">
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>Home</mat-label>
        <input matInput [(ngModel)]="matchDTO!.home">
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>Guest</mat-label>
        <input matInput [(ngModel)]="matchDTO!.guest">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="matchDTO" cdkFocusInitial>Ok</button>
    </div>
  `,
  styles: [
    ".mat-mdc-dialog-actions { justify-content: flex-end; }"
  ],
})
export class AddMatchDialogComponent {

  public matchDTO: MatchDTO | undefined = inject(MAT_DIALOG_DATA);

  constructor(
    public dialogRef: MatDialogRef<AddMatchDialogComponent>,
  ) {}

  onNoClick(): void {
    this.matchDTO = undefined;
    this.dialogRef.close();
  }
}