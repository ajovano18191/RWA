import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IGame, ISubgame } from 'libs/dto/src';

@Component({
  selector: 'live-bet-add-game-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  providers: [MatDialog],
  template: `
    <div mat-dialog-content>
      <h1><b>Add game</b></h1>
      <mat-form-field class="game-name">
        <mat-label>Game</mat-label>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field>
      <div class="subgames">
        <mat-form-field>
          <mat-label>Subgame 1</mat-label>
          <input matInput [(ngModel)]="data.subgames[0].name">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Subgame 2</mat-label>
          <input matInput [(ngModel)]="data.subgames[1].name">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Subgame 3</mat-label>
          <input matInput [(ngModel)]="data.subgames[2].name">
        </mat-form-field>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
    </div>
  `,
  styles: [
    ".mat-mdc-dialog-actions { justify-content: flex-end; }",
    ".mat-mdc-dialog-content { display: flex; flex-direction: column; align-items: center; overflow-x: hidden; }",
    ".game-name { max-width: 200px }",
    ".subgames { display: flex;  flex-direction: row; flex-wrap: wrap; }",
    "@media (max-width: 900px) { .subgames { flex-direction: column; } }",
    ".subgames > * { margin: 0px 4px 0px 4px; }",
  ],
})
export class AddGameDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGame,
  ) {
    data.subgames = Array<ISubgame>(
      { id: 1, name: '', game: data, },
      { id: 2, name: '', game: data, },
      { id: 3, name: '', game: data, },
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
