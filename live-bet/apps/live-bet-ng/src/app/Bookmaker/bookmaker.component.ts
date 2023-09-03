import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import Sport from './sport';
import { SportComponent } from './sport.component';

@Component({
  selector: 'live-bet-bookmaker',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, SportComponent,],
  template: `
    <mat-accordion>
      <div *ngFor="let sport of SPORTS | keyvalue">
        <bookmaker-sport [sport]="sport.value" />
      </div>
    </mat-accordion>
  `,
})
export class BookmakerComponent {

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
              { id: 1, name: 'X', },
              { id: 1, name: '2', },
            ],
          },
          {
            id: 1,
            name: 'Next goal',
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
              { id: 1, name: '1', },
              { id: 1, name: 'X', },
              { id: 1, name: '2', },
            ],
          },
          {
            id: 1,
            name: 'Next goal',
            subgames: [
              { id: 1, name: '1', },
              { id: 1, name: 'X', },
              { id: 1, name: '2', },
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

    this.SPORTS.set(3, 
      { id: 3, 
        name: 'Tennis', 
        games: [],
        matches: []
      }
    );
    this.SPORTS.get(3)!.matches = [
      {id: 1, league: 'France 1', home: 'Gulnard M.', guest: 'Martineau M.', sport: this.SPORTS.get(3)!,},
      {id: 2, league: 'England 2', home: 'Kerhove L.', guest: 'Fett J.', sport: this.SPORTS.get(3)!,},
      {id: 3, league: 'Ukraine 1', home: 'Horvlt M.', guest: 'Kuwata H.', sport: this.SPORTS.get(3)!,},
    ];
  }
}




// { id: 1, name: 'Final result', subgames: [ { id: 1, name: '1' }, { id: 2, name: 'X' }, { id: 3, name: '2' }]},
// { id: 2, name: 'Next goal', subgames: [ { id: 1, name: '1' }, { id: 2, name: 'X' }, { id: 3, name: '2' }]},
// { id: 3, name: 'Total goals', subgames: [ { id: 1, name: '-/+' }, { id: 2, name: '-' }, { id: 3, name: '+' }]},

// { id: 1, name: 'Final result', subgames: [ { id: 1, name: '1' }, { id: 2, name: 'X' }, { id: 3, name: '2' }]},
// { id: 2, name: 'Handicap points', subgames: [ { id: 1, name: 'han.' }, { id: 2, name: '1' }, { id: 3, name: '2' }]},
// { id: 3, name: 'Total points', subgames: [ { id: 1, name: '-/+' }, { id: 2, name: '-' }, { id: 3, name: '+' }]},

// { id: 1, name: 'Winner', subgames: [ { id: 1, name: '1' }, { id: 2, name: '2' }]},
// { id: 2, name: 'Handicap games', subgames: [ { id: 1, name: 'han.' }, { id: 2, name: '1' }, { id: 3, name: '2' }]},
// { id: 3, name: 'Total games', subgames: [ { id: 1, name: '-/+' }, { id: 2, name: '-' }, { id: 3, name: '+' }]},