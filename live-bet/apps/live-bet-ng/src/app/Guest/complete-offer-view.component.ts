import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportComponent } from './sport.component';
import Sport from './sport.model';
import { Store } from '@ngrx/store';
import { OddsActions } from './odds-store/odds.actions';
import { RecieveOfferService } from './recieve-offer.service';

@Component({
  selector: 'guest-complete-offer-view',
  standalone: true,
  imports: [CommonModule, SportComponent],
  template: `
    <div class="sports">
      <guest-sport *ngFor="let sport of SPORTS" [sport]="sport" />
    </div>
    <button (click)="onClick()">Dodaj kvotu</button>
  `,
  styles: [
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; }",
  ],
})
export class CompleteOfferViewComponent {
  private store = inject(Store);

  onClick(): void {
    // for(let i = 0; i < 5; i++) {
      let x = {
        id: Math.floor(Math.random() * 100),
        sportId: 1,//Math.floor(Math.random() * 2) + 1,
        matchId: Math.floor(Math.random() * 5) + 1,
        subgameId: Math.floor(Math.random() * 9),
      };

      this.store.dispatch(OddsActions.setOdds({
        oddsKey: x,
        value: Math.random(),
      }))
    // }
  }

  private recieveOfferService = inject(RecieveOfferService);

  public SPORTS: Sport[] = [];

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
          {id: 1, sportId: 1, league: 'France 1', home: 'Rennes', guest: 'Ac Le Havre', },
          {id: 2, sportId: 1, league: 'England 2', home: 'Watfford', guest: 'Blackburn',},
          {id: 3, sportId: 1, league: 'Ukraine 1', home: 'Fc Minaj', guest: 'Zorja',},
          {id: 4, sportId: 1, league: 'Germany 2', home: 'Sr. Paull', guest: 'Fc Magdeburg',},
          {id: 5, sportId: 1, league: 'Germany 2', home: 'Karlsruher', guest: 'Braunschwelg',},
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
          {id: 10, sportId: 1, league: 'China 1', home: 'Changsha Wantin Yongsheng', guest: 'Guangxi Weizhuang ',},
        ]
      }
    ];
  }
}
