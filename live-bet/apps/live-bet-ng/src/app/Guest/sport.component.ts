import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { SubgameComponent } from './subgame.component';
import { MatchComponent } from './match.component';
import { ISport, ISubgame } from '@live-bet/dto';

@Component({
  selector: 'guest-sport',
  standalone: true,
  imports: [CommonModule, GameComponent, SubgameComponent, MatchComponent,],
  template: `
      <div class="sport-name">{{ sport.name }}</div>
      <guest-game *ngFor="let game of sport.games" [game]="game"/>
      <div class="match-id">MatchID</div>
      <div class="league">League</div>
      <div class="home-guest">Home - Guest</div>
      <guest-subgame *ngFor="let subgame of getSubgames" [subgame]="subgame" />
      <guest-match *ngFor="let match of sport.matches" [match]="match" />
  `,
  styles: [
    ":host { display: grid; grid-template-columns: repeat(14, auto);  gap: 0px; background-color: #2196F3; padding: 10px; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
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


  get getSubgames(): ISubgame[] {
    return this.sport.games.map(p => p.subgames).flat();
  }
}

//     ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; }",
