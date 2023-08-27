import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'live-bet-bookmaker',
  standalone: true,
  imports: [MatExpansionModule, CommonModule],
  template: `
    <mat-accordion>
      <div *ngFor="let sport of SPORTS">
        <h1>{{ sport.name }}</h1>
        <mat-expansion-panel hideToggle *ngFor="let match of sport.matches">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ match.league }}
            </mat-panel-title>
            <mat-panel-description>
              {{ match.home }} <br> {{ match.guest }}
            </mat-panel-description>        
        </mat-expansion-panel-header>
        <p>This is the primary content of the panel.</p>
        </mat-expansion-panel>
      </div>
    </mat-accordion>
  `,
  styleUrls: ['./bookmaker.component.scss'],
})
export class BookmakerComponent {
  public SPORTS: Sport[] = [
    { id: 1, name: 'Football', matches: [
      {id: 1, league: 'France 1', home: 'Rennes', guest: 'Ac Le Havre'},
      {id: 2, league: 'England 2', home: 'Watford', guest: 'Blackburn'},
      {id: 3, league: 'Ukraine 1', home: 'Fc Minaj', guest: 'Zorja'},
      {id: 4, league: 'Germany 2', home: 'Sr. Paull', guest: 'Fc Magdeburg'},
      {id: 5, league: 'Germany 2', home: 'Karlsruher', guest: 'Braunschwelg'},
    ]},
    { id: 2, name: 'Basketball', matches: [
      {id: 1, league: 'China 1', home: 'Changsha Wantin Yongsheng', guest: 'Guangxi Weizhuang '},   
    ]},
    { id: 3, name: 'Tennis', matches: [
      {id: 1, league: 'France 1', home: 'Gulnard M.', guest: 'Martineau M.'},
      {id: 2, league: 'England 2', home: 'Kerhove L.', guest: 'Fett J.'},
      {id: 3, league: 'Ukraine 1', home: 'Horvlt M.', guest: 'Kuwata H.'},
    ]}
  ];
}

interface Sport {
  id: number,
  name: string,
  matches: Match[],
}

interface Match {
  id: number,
  home: string,
  guest: string,
  league: string,
}