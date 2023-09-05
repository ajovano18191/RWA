import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sport, SportComponent } from './sport.component';

@Component({
  selector: 'guest-complete-offer-view',
  standalone: true,
  imports: [CommonModule, SportComponent],
  template: `
    <div class="sports">
      <guest-sport *ngFor="let sport of SPORTS" [sport]="sport" />
    </div>
  `,
  styles: [
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; }",
  ],
})
export class CompleteOfferViewComponent {
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
          {id: 1, league: 'France 1', home: 'Rennes', guest: 'Ac Le Havre', tips: [12, 1.5, 1.25, 1.2, 1, 1, 1, 1, 1],},
          {id: 2, league: 'England 2', home: 'Watford', guest: 'Blackburn', tips: [12, 1.5, 1.25, 1.2, 1, 1, 1, 1, 1],},
          {id: 3, league: 'Ukraine 1', home: 'Fc Minaj', guest: 'Zorja', tips: [12, 1.5, 1.25, 1.2, 1, 1, 1, 1, 1],},
          {id: 4, league: 'Germany 2', home: 'Sr. Paull', guest: 'Fc Magdeburg', tips: [12, 1.5, 1.25, 1.2, 1, 1, 1, 1, 1],},
          {id: 5, league: 'Germany 2', home: 'Karlsruher', guest: 'Braunschwelg', tips: [12, 1.5, 1.25, 1.2, 1, 1, 1, 1, 1],},
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
          {id: 1, league: 'China 1', home: 'Changsha Wantin Yongsheng', guest: 'Guangxi Weizhuang ', tips: [12, 1.5, 1.25, 1.2, 1, 1, 1, 1, 1], },
        ]
      }
    ];
  }
}
