import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IMatch } from '@live-bet/dto';
import { MatchStatus } from '@live-bet/enums';
import { EndMatchDialogComponent } from './end-match-dialog.component';
import { SendOfferService } from './send-offer.service';

@Component({
  selector: 'bookmaker-match-actions',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, EndMatchDialogComponent,],
  template: `
    <div class="buttons-container">
      <button mat-fab extended color="primary" class="send-offer-button" (click)="sendMatchOffer()">
        <mat-icon class="button-icon">send</mat-icon>
        Send
      </button>
      <button mat-fab extended *ngIf="isStartButtonEnabled()" class="start-match-button" (click)="start()">
        <mat-icon class="button-icon">not_started</mat-icon>
        Start
      </button>
      <button mat-fab extended class="end-match-button" (click)="end()">
        <mat-icon class="button-icon">done</mat-icon>
        End
      </button>
    </div>
  `,
  styles: [
    ".buttons-container {  display: flex; flex-direction: column; align-items: stretch; justify-content: space-around;  }",
    "button { font-weight: bold; display: flex; flex-direction: row-reverse; margin-block: 8px; }",
    ".send-offer-button { color: white; }",
    ".start-match-button { background-color: limegreen; color: white; }",
    ".end-match-button { background-color: red; color: white; }",
    ".button-icon { margin-left: 0.2em; margin-right: 0px; }",
  ],
})
export class MatchActionsComponent {
  @Input() match: IMatch = {
    id: 0,
    home: '',
    guest: '',
    league: '',
    status: 'not-started',
    sport: {
      id: 0,
      name: '',
      games: [],
      matches: [],
    },
  };

  @Input() matchOffer: Map<number, number> = new Map<number, number>();

  isStartButtonEnabled(): boolean {
    return this.match.status === MatchStatus.notStarted;
  }

  private sendOfferService: SendOfferService = inject(SendOfferService);

  public sendMatchOffer() {
    this.sendOfferService.sendMatchOffer(this.match, this.matchOffer);
  }

  start() {
    this.sendOfferService.startMatch(this.match, this.matchOffer);
  }

  private dialog: MatDialog = inject(MatDialog);

  end() {
    this.dialog.open(EndMatchDialogComponent, {
      data: this.match,
    });
  }
}
