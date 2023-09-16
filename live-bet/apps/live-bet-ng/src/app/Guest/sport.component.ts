import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IGame, ISport, ISubgame } from '@live-bet/dto';
import { GameComponent } from './game.component';
import { MatchComponent } from './match.component';
import { SubgameComponent } from './subgame.component';

@Component({
  selector: 'guest-sport',
  standalone: true,
  imports: [CommonModule, GameComponent, SubgameComponent, MatchComponent],
  template: `
      <div class="sport-name grey-white">{{ sport.name }}</div>
      <guest-game *ngFor="let game of getGames" [game]="game"/>
      <div class="match-id grey-white">MatchIdddD</div>
      <div class="league grey-white">League</div>
      <div class="home-guest grey-white">Home - Guest</div>
      <guest-subgame *ngFor="let subgame of getSubgames" [subgame]="subgame" />
      <guest-match *ngFor="let match of sport.matches" [match]="match" />
  `,
  styles: [
    ":host { display: grid; grid-template-columns: repeat(14, auto); row-gap: 2.5px; padding: 10px; }",
    ":host > * { text-align: center; padding: 20px 0; font-size: 30px; }",
    ".match-id { grid-column-start: 1; }",
    ".sport-name { grid-column: 1 / span 5; }",
    ".home-guest { grid-column: span 3; }",
  ],
})
export class SportComponent {
  @Input() sport: ISport = {
    id: 0,
    name: '',
    matches: [],
    games: [],
  };

  get getGames(): IGame[] {
    return this.sport.games.slice(0, 3);
  }

  get getSubgames(): ISubgame[] {
    return this.getGames.map(p => p.subgames).flat();
  }
}