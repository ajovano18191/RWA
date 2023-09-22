import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { IMatch } from '@live-bet/dto';
import { MatchStatus } from '@live-bet/enums';
import { EndMatchDialogComponent } from './end-match-dialog.component';
import { GameComponent } from './game.component';
import Offer from './offer';
import { SendOfferService } from './send-offer.service';

@Component({
  selector: 'bookmaker-match',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, MatButtonModule, MatIconModule, GameComponent, MatDialogModule, EndMatchDialogComponent,],
  template: `
    <mat-expansion-panel hideToggle>
      <mat-expansion-panel-header>
        <mat-panel-title>
          {{ match.league }}
        </mat-panel-title>
        <mat-panel-description>
          {{ match.home }} <br> {{ match.guest }}
        </mat-panel-description>        
      </mat-expansion-panel-header>
      <div class="mat-expansion-panel-content">
        <div class="games">
          <bookmaker-game *ngFor="let game of match.sport.games" [matchId]="match.id" [game]="game" (oddChangeEvent)="changeOffer($event)"/>
        </div>
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
      </div>
    </mat-expansion-panel>
  `,
  styles: [
    "mat-panel-title { color: rgba(0, 0, 0, 0.54); flex: 0 0 5%; min-width: 4em; }",
    "mat-panel-description { color: black; }",
    ".mat-expansion-panel-content { display: flex; flex-direction: row; justify-content: space-around; align-items: stretch; align-content: flex-start; }",
    "@media (max-width: 816px) { .mat-expansion-panel-content { flex-direction: column; } }",
    ".games { flex: 1; display: flex; flex-flow: row wrap; justify-content: space-around; align-items: stretch; align-content: flex-start; }",
    ".buttons-container {  display: flex; flex-direction: column; align-items: stretch; justify-content: space-around;  }",
    "button { font-weight: bold; display: flex; flex-direction: row-reverse; margin-block: 8px; }",
    ".send-offer-button { color: white; }",
    ".start-match-button { background-color: limegreen; color: white; }",
    ".end-match-button { background-color: red; color: white; }",
    ".button-icon { margin-left: 0.2em; margin-right: 0px; }",
  ],
})
export class MatchComponent implements OnInit {
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
  }

  private matchOffer: Map<number, number> = new Map<number, number>();

  ngOnInit(): void {
    for(let subgame of this.match.sport.games.map(p => (p.subgames)).flat()) {
      this.matchOffer.set(subgame.id, 1.00);
    }
  }

  isStartButtonEnabled(): boolean {
    return this.match.status === MatchStatus.notStarted;
  }

  changeOffer(offer: Offer) {
    this.matchOffer.set(offer.subgameId, offer.odd);
  }

  private sendOfferService = inject(SendOfferService);

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
