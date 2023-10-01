import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameDTO, SubgameDTO } from '@live-bet/dto';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'bookmaker-add-game-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatSlideToggleModule,],
  providers: [MatDialog],
  template: `
    <div mat-dialog-content>
      <h1><b>Add game</b></h1>
      <mat-form-field class="game-name">
        <mat-label>Game</mat-label>
        <input matInput [(ngModel)]="gameDTO!.name">
      </mat-form-field>
      <div class="subgames">
        <mat-form-field *ngFor="let subgame of gameDTO!.subgames">
          <mat-label>Subgame</mat-label>
          <input matInput [(ngModel)]="subgame.name">
          <mat-slide-toggle color="primary" [(ngModel)]="subgame.isPlayable">Playable?</mat-slide-toggle>
        </mat-form-field>
        <button mat-fab extended color="primary" class="sport-header-button" (click)="addSubgame()">
          <mat-icon class="button-icon">add</mat-icon>
          Add subgame
        </button>
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
    ".subgames { display: flex;  flex-direction: row; flex-wrap: wrap; align-items: center; }",
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
      { name: '', isPlayable: true, },
      { name: '', isPlayable: true, },
      { name: '', isPlayable: true, },
    );
  }

  addSubgame() {
    this.gameDTO!.subgames.push({ name: '', isPlayable: true, } as SubgameDTO);
  }

  onNoClick(): void {
    this.gameDTO = undefined;
    this.dialogRef.close();
  }
}
