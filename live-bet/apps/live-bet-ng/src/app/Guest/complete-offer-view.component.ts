import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sport, SportComponent } from './sport.component';
import { Store } from '@ngrx/store';
import { OdssesActions } from './state/oddses.actions';

@Component({
  selector: 'guest-complete-offer-view',
  standalone: true,
  imports: [CommonModule, SportComponent],
  template: `
    <div class="sports">
      <guest-sport *ngFor="let sport of SPORTS" [sport]="sport" />
    </div>
    <button (click)="onClick()" >Dodaj kvotu</button>
  `,
  styles: [
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; }",
  ],
})
export class CompleteOfferViewComponent {
  public SPORTS: Sport[] = [];

  store = inject(Store);

  onClick(): void {
    const x = {
      id: Math.floor(Math.random() * 1000),
      value: Math.random(),
      sportId: 1,//Math.floor(Math.random() * 2) + 1,
      matchId: Math.floor(Math.random() * 5) + 1,
      subgameId: Math.floor(Math.random() * 9) + 1,
    };
    //console.log(x);
    this.store.dispatch(OdssesActions.setOdds({
      odds: x
    }))
  }


  constructor() {
    this.SPORTS = [ 
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
        matches: [
          {id: 1, league: 'France 1', home: 'Rennes', guest: 'Ac Le Havre', oddses: [
            { id: 1, value: 0, sportId: 1, matchId: 1, subgameId: 1 },
            { id: 2, value: 0, sportId: 1, matchId: 1, subgameId: 2 },
            { id: 3, value: 0, sportId: 1, matchId: 1, subgameId: 3 },
            { id: 4, value: 0, sportId: 1, matchId: 1, subgameId: 4 },
            { id: 5, value: 0, sportId: 1, matchId: 1, subgameId: 5 },
            { id: 6, value: 0, sportId: 1, matchId: 1, subgameId: 6 },
            { id: 7, value: 0, sportId: 1, matchId: 1, subgameId: 7 },
            { id: 8, value: 0, sportId: 1, matchId: 1, subgameId: 8 },
            { id: 9, value: 0, sportId: 1, matchId: 1, subgameId: 9 },
          ],
        },
          {id: 2, league: 'England 2', home: 'Watford', guest: 'Blackburn', 
            oddses: [
              { id: 1, value: 0, sportId: 1, matchId: 2, subgameId: 1 },
              { id: 2, value: 0, sportId: 1, matchId: 2, subgameId: 2 },
              { id: 3, value: 0, sportId: 1, matchId: 2, subgameId: 3 },
              { id: 4, value: 0, sportId: 1, matchId: 2, subgameId: 4 },
              { id: 5, value: 0, sportId: 1, matchId: 2, subgameId: 5 },
              { id: 6, value: 0, sportId: 1, matchId: 2, subgameId: 6 },
              { id: 7, value: 0, sportId: 1, matchId: 2, subgameId: 7 },
              { id: 8, value: 0, sportId: 1, matchId: 2, subgameId: 8 },
              { id: 9, value: 0, sportId: 1, matchId: 2, subgameId: 9 },
            ],
          },
          {id: 3, league: 'Ukraine 1', home: 'Fc Minaj', guest: 'Zorja', 
            oddses: [
              { id: 1, value: 0, sportId: 1, matchId: 3, subgameId: 1 },
              { id: 2, value: 0, sportId: 1, matchId: 3, subgameId: 2 },
              { id: 3, value: 0, sportId: 1, matchId: 3, subgameId: 3 },
              { id: 4, value: 0, sportId: 1, matchId: 3, subgameId: 4 },
              { id: 5, value: 0, sportId: 1, matchId: 3, subgameId: 5 },
              { id: 6, value: 0, sportId: 1, matchId: 3, subgameId: 6 },
              { id: 7, value: 0, sportId: 1, matchId: 3, subgameId: 7 },
              { id: 8, value: 0, sportId: 1, matchId: 3, subgameId: 8 },
              { id: 9, value: 0, sportId: 1, matchId: 3, subgameId: 9 },
            ],
          },
          {id: 4, league: 'Germany 2', home: 'Sr. Paull', guest: 'Fc Magdeburg', oddses: [
              { id: 1, value: 0, sportId: 1, matchId: 4, subgameId: 1 },
              { id: 2, value: 0, sportId: 1, matchId: 4, subgameId: 2 },
              { id: 3, value: 0, sportId: 1, matchId: 4, subgameId: 3 },
              { id: 4, value: 0, sportId: 1, matchId: 4, subgameId: 4 },
              { id: 5, value: 0, sportId: 1, matchId: 4, subgameId: 5 },
              { id: 6, value: 0, sportId: 1, matchId: 4, subgameId: 6 },
              { id: 7, value: 0, sportId: 1, matchId: 4, subgameId: 7 },
              { id: 8, value: 0, sportId: 1, matchId: 4, subgameId: 8 },
              { id: 9, value: 0, sportId: 1, matchId: 4, subgameId: 9 },
            ],
          },
          {id: 5, league: 'Germany 2', home: 'Karlsruher', guest: 'Braunschwelg', oddses: [
              { id: 1, value: 0, sportId: 1, matchId: 5, subgameId: 1 },
              { id: 2, value: 0, sportId: 1, matchId: 5, subgameId: 2 },
              { id: 3, value: 0, sportId: 1, matchId: 5, subgameId: 3 },
              { id: 4, value: 0, sportId: 1, matchId: 5, subgameId: 4 },
              { id: 5, value: 0, sportId: 1, matchId: 5, subgameId: 5 },
              { id: 6, value: 0, sportId: 1, matchId: 5, subgameId: 6 },
              { id: 7, value: 0, sportId: 1, matchId: 5, subgameId: 7 },
              { id: 8, value: 0, sportId: 1, matchId: 5, subgameId: 8 },
              { id: 9, value: 0, sportId: 1, matchId: 5, subgameId: 9 },
            ],
          },
        ],
      },
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
        matches: [
          {id: 10, league: 'China 1', home: 'Changsha Wantin Yongsheng', guest: 'Guangxi Weizhuang ', oddses: [
              { id: 1, value: 0, sportId: 2, matchId: 10, subgameId: 1 },
              { id: 2, value: 0, sportId: 2, matchId: 10, subgameId: 2 },
              { id: 3, value: 0, sportId: 2, matchId: 10, subgameId: 3 },
              { id: 4, value: 0, sportId: 2, matchId: 10, subgameId: 4 },
              { id: 5, value: 0, sportId: 2, matchId: 10, subgameId: 5 },
              { id: 6, value: 0, sportId: 2, matchId: 10, subgameId: 6 },
              { id: 7, value: 0, sportId: 2, matchId: 10, subgameId: 7 },
              { id: 8, value: 0, sportId: 2, matchId: 10, subgameId: 8 },
              { id: 9, value: 0, sportId: 2, matchId: 10, subgameId: 9 },
            ], 
          },
        ]
      }
    ];
  }
}
