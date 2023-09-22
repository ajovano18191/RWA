import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IMatch } from '@live-bet/dto';
import { EndMatchGameComponent } from './end-match-game.component';
import { SendOfferService } from './send-offer.service';

@Component({
  selector: 'live-bet-end-match-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, EndMatchGameComponent],
  template: `
    <div mat-dialog-content>
      <div class="grid" [ngStyle]="{'grid-template-columns': getMaxNumOfSubgames()}">
        <ng-container *ngFor="let game of match.sport.games">
          <guest-end-match-game [game]="game" (subgameChangeEvent)="onSubgameChange($event)" />
        </ng-container>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button cdkFocusInitial (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="match" (click)="onEndClick()">End</button>
    </div>
  `,
  styles: [
    ".grid { display: grid; }",
  ],
})
export class EndMatchDialogComponent {
  public match: IMatch = inject(MAT_DIALOG_DATA);

  getMaxNumOfSubgames(): string {
    const numOfGridColumns = this.match.sport.games.map(game => game.subgames.length).reduce((acc, curr) => Math.max(acc, curr), 0) + 1;
    return `repeat(${numOfGridColumns}, auto)`;
  }

  private winnerSubgames: Map<number, number> = new Map<number, number>()

  onSubgameChange(subgameKey: any): void {
    this.winnerSubgames.set(subgameKey.gameId, subgameKey.subgameId);
  }

  public dialogRef: MatDialogRef<EndMatchDialogComponent> = inject(MatDialogRef<EndMatchDialogComponent>);
  private sendOfferService: SendOfferService = inject(SendOfferService);

  onEndClick(): void {
    this.sendOfferService.endMatch(this.match!.id, this.winnerSubgames);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
