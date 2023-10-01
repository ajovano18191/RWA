import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IGame, ISport, ISubgame, newISport } from '@live-bet/dto';
import { GameComponent } from './game.component';
import { MatchComponent } from './match.component';
import { SubgameComponent } from './subgame.component';

@Component({
  selector: 'guest-sport',
  standalone: true,
  imports: [CommonModule, GameComponent, SubgameComponent, MatchComponent,],
  template: `
      <div class="sport-name back-text">{{ sport.name }}</div>
      <ng-container *ngFor="let game of getGames">
        <div class="border-text"></div>
        <guest-game [game]="game"/>
      </ng-container>
      <div class="match-id back-text">ID</div>
      <div class="back-text">F</div>
      <div class="league back-text">League</div>
      <div class="home-guest back-text">Home - Guest</div>
      <ng-container *ngFor="let game of getGames">
        <div class="border-text"></div>
        <ng-container *ngFor="let subgame of game.subgames">
        <guest-subgame [subgame]="subgame" />
        </ng-container>
      </ng-container>
      
      <guest-match *ngFor="let match of sport.matches" [match]="match" />
  `,
  styles: [
                                                // ID          F           L    Home  -  Guest     Game1                         Game1     Game2                         Game2     Game3                         Game3
    ":host { display: grid; grid-template-columns: max-content max-content auto auto auto auto 2px max-content max-content max-content 2px max-content max-content max-content 2px max-content max-content max-content; row-gap: 2.5px; padding: 10px; overflow-x: auto; }",
    ":host > * { text-align: center; padding: 20px 0; font-size: 30px; }",
    ".match-id { grid-column-start: 1; }",
    ".sport-name { grid-column: 1 / span 6; }",
    ".home-guest { grid-column: span 3; }",
  ],
})
export class SportComponent {
  @Input() sport: ISport = newISport();

  get getGames(): IGame[] {
    return this.sport.games.slice(0, 3);
  }

  get getSubgames(): ISubgame[] {
    return this.getGames.map(p => p.subgames).flat();
  }
}