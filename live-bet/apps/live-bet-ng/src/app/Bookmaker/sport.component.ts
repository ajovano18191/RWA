import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { filter, map } from 'rxjs';
import { AddMatchDialogComponent } from './add-match-dialog.component';
import { AddGameDialogComponent } from './add-game-dialog.component';
import { MatchComponent } from './match.component';
import { GameDTO, ISport, MatchDTO, newIGame, newIMatch, newISport } from '@live-bet/dto';
import { SportsService } from '../sports.service';

@Component({
  selector: 'bookmaker-sport',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatchComponent],
  template: `
    <div class="sport">
      <div class="sport-header">
        <h1  class="sport-header-text">{{ sport.name }}</h1>
        <div class="sport-header-buttons-container">
          <button mat-fab extended color="primary" class="sport-header-button" (click)="openAddMatchDialog()">
            <mat-icon class="button-icon">add</mat-icon>
            Add match
          </button>
          <button mat-fab extended color="primary" class="sport-header-button" (click)="openAddGameDialog()">
            <mat-icon class="button-icon">add</mat-icon>
            Add game
          </button>
        </div>
      </div>
        <bookmaker-match *ngFor="let match of sport?.matches" [match]="match" />
    </div>
  `,
  styles: [
    ".sport-header { display: flex; flex-wrap: wrap; align-content: flex-start; align-items: center; }",
    ".sport-header-text { padding-top: 16px; padding-left: 16px; width: fit-content; }",
    ".sport-header-button { flex: 1; margin-left: 8px; height: 30px; font-size: smaller; }",
    ".button-icon { margin-right: 4px !important; }",
  ],
  providers: [SportComponent],
})
export class SportComponent {
  @Input() sport: ISport = newISport();

  public dialog: MatDialog = inject(MatDialog);
  private sportsService: SportsService = inject(SportsService);

  public openAddMatchDialog() {
    const dialogRef = this.dialog.open(AddMatchDialogComponent, {
      data: newIMatch(),
    });

    dialogRef.afterClosed()
    .pipe(
      filter(p => p !== undefined),
      map(p => p as MatchDTO),
    )
    .subscribe(result => {
      this.sportsService.postMatch(result);
    });
  }

  public openAddGameDialog() {
    const dialogRef = this.dialog.open(AddGameDialogComponent, {
      panelClass: 'disable-horizontal-scroll',
      data: newIGame(),
    });

    dialogRef.afterClosed()
    .pipe(
      filter(p => p !== undefined),
      map(p => p as GameDTO),
    )
    .subscribe(result => {
      this.sportsService.postGame(result);
    });
  }
}