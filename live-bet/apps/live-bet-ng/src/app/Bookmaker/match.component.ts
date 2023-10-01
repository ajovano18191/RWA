import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { IMatch, newIMatch } from '@live-bet/dto';
import { GameComponent } from './game.component';
import { MatchActionsComponent } from './match-actions.component';
import Offer from './offer';

@Component({
  selector: 'bookmaker-match',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, GameComponent, MatchActionsComponent,],
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
        <bookmaker-match-actions [match]="match" [matchOffer]="matchOffer" />
      </div>
    </mat-expansion-panel>
  `,
  styles: [
    "mat-panel-title { color: rgba(0, 0, 0, 0.54); flex: 0 0 5%; min-width: 4em; }",
    "mat-panel-description { color: black; }",
    ".mat-expansion-panel-content { display: flex; flex-direction: row; justify-content: space-around; align-items: stretch; align-content: flex-start; }",
    "@media (max-width: 816px) { .mat-expansion-panel-content { flex-direction: column; } }",
    ".games { flex: 1; display: flex; flex-flow: row wrap; justify-content: space-around; align-items: stretch; align-content: flex-start; }",
  ],
})
export class MatchComponent implements OnInit {
  @Input() match: IMatch = newIMatch();

  matchOffer: Map<number, number> = new Map<number, number>();

  ngOnInit(): void {
    for(let subgame of this.match.sport.games.map(p => (p.subgames)).flat()) {
      this.matchOffer.set(subgame.id, 1.00);
    }
  }

  changeOffer(offer: Offer) {
    this.matchOffer.set(offer.subgameId, offer.odd);
  }
}
