import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Match from './match';
import { GameComponent } from './game.component';

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
      <div class="games">
        <bookmaker-game *ngFor="let game of match.sport.games" [game]="game"/>
        <button mat-fab extended color="green" class="send-tips-button" (click)="sendTips(match)">
          <mat-icon class="button-icon">send</mat-icon>
          Send
        </button>
      </div>
    </mat-expansion-panel>
  `,
  styles: [
    "mat-panel-title { color: rgba(0, 0, 0, 0.54); flex: 0 0 5%; min-width: 4em; }",
    "mat-panel-description { color: black; }",
    ".games { display: flex; flex-flow: row wrap; justify-content: space-around; align-items: center; }",
    ".send-tips-button { background-color: limegreen; color: white; font-weight: bold; display: flex; flex-direction: row-reverse; }",
    ".send-tips-button .button-icon { margin-left: 0.2em; margin-right: 0px; }",
  ],
})
export class MatchComponent {
  @Input() match: Match = {
    id: 0,
    home: '',
    guest: '',
    league: '',
    sport: {
      id: 0,
      name: '',
      matches: [],
      games: [],
    },
  }

  public sendTips(match: Match) {

  }
}
