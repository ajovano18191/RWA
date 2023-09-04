import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'guest-sport',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="sports">
    <ng-container *ngFor="let sport of SPORTS | keyvalue">
      <div class="sport-name">{{ sport.value.name }}</div>
      <ng-container *ngFor="let game of sport.value.games">
        <div class="game-name">{{ game.name }}</div>
      </ng-container>
      <div class="match-id">MatchID</div>
      <div class="league">League</div>
      <div class="home-guest">Home - Guest</div>
      <ng-container *ngFor="let game of sport.value.games">
        <ng-container *ngFor="let subgame of game.subgames">
          <div class="subgame-name">{{ subgame.name }}</div>
        </ng-container>
      </ng-container>
      <ng-container *ngFor="let match of sport.value.matches">
        <div class="match-id">{{ match.id }}</div>
        <div class="league">{{ match.league }}</div>
        <div class="home-guest">{{ match.home }} - {{ match.guest }}</div>
        <div class="subgame">1.00</div>
        <div class="subgame">1.00</div>
        <div class="subgame">1.00</div>
        <div class="subgame">1.00</div>
        <div class="subgame">1.00</div>
        <div class="subgame">1.00</div>
        <div class="subgame">1.00</div>
        <div class="subgame">1.00</div>
        <div class="subgame">1.00</div>
      </ng-container>    
    </ng-container>
  </div>
  `,
  styles: [
    ".sports { display: grid; grid-template-columns: repeat(14, auto);  gap: 0px; background-color: #2196F3; padding: 10px; }",
    ".sports > div { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; }",
    ".sport-name { grid-column: 1 / span 5; }",
    ".game-name { grid-column: span 3; }",
    ".match-id { }",
    ".league { }",
    ".home-guest { grid-column: span 3; }",
    ".subgame-name { }",
  ],
})
export class SportComponent {
  public SPORTS: Map<number, Sport> = new Map<number, Sport>();
  
  constructor() {
    this.SPORTS.set(1, 
      { id: 1, 
        name: 'Football', 
        games: [
          {
            id: 1,
            name: 'Final result',
            subgames: [
              { id: 1, name: '1', },
              { id: 2, name: 'X', },
              { id: 3, name: '2', },
            ],
          },
          {
            id: 1,
            name: 'Next goal',
            subgames: [
              { id: 4, name: '1', },
              { id: 5, name: 'X', },
              { id: 6, name: '2', },
            ],
          },
          {
            id: 1,
            name: 'Final result',
            subgames: [
              { id: 7, name: '1', },
              { id: 8, name: 'X', },
              { id: 9, name: '2', },
            ],
          },
        ],
        matches: []
      }
    );
    
    this.SPORTS.get(1)!.matches = [
      {id: 1, league: 'France 1', home: 'Rennes', guest: 'Ac Le Havre', sport: this.SPORTS.get(1)!,},
      {id: 2, league: 'England 2', home: 'Watford', guest: 'Blackburn', sport: this.SPORTS.get(1)!,},
      {id: 3, league: 'Ukraine 1', home: 'Fc Minaj', guest: 'Zorja', sport: this.SPORTS.get(1)!,},
      {id: 4, league: 'Germany 2', home: 'Sr. Paull', guest: 'Fc Magdeburg', sport: this.SPORTS.get(1)!,},
      {id: 5, league: 'Germany 2', home: 'Karlsruher', guest: 'Braunschwelg', sport: this.SPORTS.get(1)!,},
    ];

    this.SPORTS.set(2, 
      { 
        id: 2, 
        name: 'Basketball', 
        games: [
          {
            id: 1,
            name: 'Final result',
            subgames: [
              { id: 1, name: '1', },
              { id: 1, name: 'X', },
              { id: 1, name: '2', },
            ],
          },
          {
            id: 1,
            name: 'Final result',
            subgames: [
              { id: 1, name: 'abc', },
              { id: 1, name: 'abc', },
              { id: 1, name: 'abc', },
            ],
          },
          {
            id: 1,
            name: 'Finalresult',
            subgames: [
              { id: 1, name: 'abc', },
              { id: 1, name: 'abc', },
              { id: 1, name: 'abc', },
            ],
          },
        ],
        matches: [],
      }
    );
    this.SPORTS.get(2)!.matches = [
      {id: 1, league: 'China 1', home: 'Changsha Wantin Yongsheng', guest: 'Guangxi Weizhuang ', sport: this.SPORTS.get(2)!, },
    ]
  }
}

export interface Sport {
  id: number,
  name: string,
  matches: Match[],
  games: Game[],
}

export interface Match {
  id: number,
  home: string,
  guest: string,
  league: string,
  sport: Sport,
}

export interface Game {
  id: number,
  name: string,
  subgames: Subgame[],
}

export interface Subgame {
  id: number,
  name: string,
}