import { Component, Input, OnInit, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GameComponent } from './game.component';
import Offer from './offer';
import { SendOfferService } from './send-offer.service';
import { IMatch } from '@live-bet/dto';
import { MatchesService } from './matches.service';

@Component({
  selector: 'bookmaker-match',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, MatButtonModule, MatIconModule, GameComponent, ],
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
          <bookmaker-game *ngFor="let game of match.sport.games" [matchId]="match.id" [game]="game" (oddChangeEvent)="changeOdd($event)"/>
        </div>
        <div class="buttons-container">
            <button mat-fab extended color="primary" class="send-offer-button" (click)="sendTips()">
              <mat-icon class="button-icon">send</mat-icon>
              Send
            </button>
            <button mat-fab extended *ngIf="match.status === 'not-started'" class="start-match-button" (click)="start()">
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

  matchOffer: Map<number, number> = new Map<number, number>();

  ngOnInit(): void {
    for(let subgame of this.match.sport.games.map(p => (p.subgames)).flat()) {
      this.matchOffer.set(subgame.id, 1.00);
    }
  }

  changeOdd(offer: Offer) {
    this.matchOffer.set(offer.subgameId, offer.odd);
  }

  private sendOfferService = inject(SendOfferService);

  public sendTips() {
    this.sendOfferService.sendOffer(this.match.id, this.match.sport.id, this.matchOffer);
  }

  private matchesService: MatchesService = inject(MatchesService);

  start() {
    this.sendOfferService.sendOffer(this.match.id, this.match.sport.id, this.matchOffer);
    this.matchesService.start(this.match.id);
  }

  end() {
    this.matchesService.end(this.match.id);
  }
}
