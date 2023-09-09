import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameDTO, SubgameDTO } from 'libs/dto/src';

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
        <input matInput [(ngModel)]="gameDTO!.name">
      </mat-form-field>
      <div class="subgames">
        <mat-form-field>
          <mat-label>Subgame 1</mat-label>
          <input matInput [(ngModel)]="gameDTO!.subgames[0].name">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Subgame 2</mat-label>
          <input matInput [(ngModel)]="gameDTO!.subgames[1].name">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Subgame 3</mat-label>
          <input matInput [(ngModel)]="gameDTO!.subgames[2].name">
        </mat-form-field>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="gameDTO" cdkFocusInitial>Ok</button>
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

  public gameDTO: GameDTO | undefined = inject(MAT_DIALOG_DATA);

  constructor(
    public dialogRef: MatDialogRef<AddGameDialogComponent>,
  ) {
    this.gameDTO!.subgames = Array<SubgameDTO>(
      { name: '' },
      { name: '' },
      { name: '' },
    );
  }

  onNoClick(): void {
    this.gameDTO = undefined;
    this.dialogRef.close();
  }
}
