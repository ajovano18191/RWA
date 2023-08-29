import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { filter } from 'rxjs';
import { AddMatchDialogComponent } from './add-match-dialog.component';
import { AddGameDialogComponent } from './add-game-dialog.component';

@Component({
  selector: 'live-bet-bookmaker',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <mat-accordion>
      <div *ngFor="let sport of SPORTS | keyvalue">
        <div class="sport-name">
          <h1  class="sport-name-text">{{ sport.value.name }}</h1>
          <button mat-fab extended color="primary" class="sport-name-button" (click)="openAddMatchDialog(sport.key)">
            <mat-icon class="button-icon">add</mat-icon>
            Add match
          </button>
          <button mat-fab extended color="primary" class="sport-name-button" (click)="openAddGameDialog(sport.key)">
            <mat-icon class="button-icon">add</mat-icon>
            Add game
          </button>
        </div>
        <mat-expansion-panel hideToggle *ngFor="let match of sport.value.matches">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ match.league }}
            </mat-panel-title>
            <mat-panel-description>
              {{ match.home }} <br> {{ match.guest }}
            </mat-panel-description>        
          </mat-expansion-panel-header>
          <div class="games">
            <div *ngFor="let game of sport.value.games" class="game">
              <div class="game-title">{{ game.name }}</div>
              <div class="subgames">
                <mat-form-field *ngFor="let subgame of game.subgames" class="subgame">
                  <mat-label>{{ subgame.name }}</mat-label>
                  <input matInput type="number">
                </mat-form-field>
              </div>
            </div>
            <button mat-fab extended color="green" class="send-tips-button" (click)="sendTips(match)">
              <mat-icon class="button-icon">send</mat-icon>
              Send
            </button>
          </div>
        </mat-expansion-panel>
      </div>
    </mat-accordion>
  `,
  styleUrls: ['./bookmaker.component.scss'],
})
export class BookmakerComponent {

  public dialog: MatDialog = inject(MatDialog);

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
        matches: [
          {id: 1, league: 'France 1', home: 'Rennes', guest: 'Ac Le Havre'},
          {id: 2, league: 'England 2', home: 'Watford', guest: 'Blackburn'},
          {id: 3, league: 'Ukraine 1', home: 'Fc Minaj', guest: 'Zorja'},
          {id: 4, league: 'Germany 2', home: 'Sr. Paull', guest: 'Fc Magdeburg'},
          {id: 5, league: 'Germany 2', home: 'Karlsruher', guest: 'Braunschwelg'},
        ]
      }
    );
    this.SPORTS.set(2, 
      { id: 2, 
        name: 'Basketball', 
        games: [],
        matches: [
          {id: 1, league: 'China 1', home: 'Changsha Wantin Yongsheng', guest: 'Guangxi Weizhuang '},   
        ]
      },
    );
    this.SPORTS.set(3, 
      { id: 3, 
        name: 'Tennis', 
        games: [],
        matches: [
          {id: 1, league: 'France 1', home: 'Gulnard M.', guest: 'Martineau M.'},
          {id: 2, league: 'England 2', home: 'Kerhove L.', guest: 'Fett J.'},
          {id: 3, league: 'Ukraine 1', home: 'Horvlt M.', guest: 'Kuwata H.'},
        ]
      }
    );
  }

  public SPORTSa: Sport[] = [
    { id: 1, 
      name: 'Football', 
      games: [],
      matches: [
        {id: 1, league: 'France 1', home: 'Rennes', guest: 'Ac Le Havre'},
        {id: 2, league: 'England 2', home: 'Watford', guest: 'Blackburn'},
        {id: 3, league: 'Ukraine 1', home: 'Fc Minaj', guest: 'Zorja'},
        {id: 4, league: 'Germany 2', home: 'Sr. Paull', guest: 'Fc Magdeburg'},
        {id: 5, league: 'Germany 2', home: 'Karlsruher', guest: 'Braunschwelg'},
    ]},
    { id: 2, 
      name: 'Basketball', 
      games: [],
      matches: [
        {id: 1, league: 'China 1', home: 'Changsha Wantin Yongsheng', guest: 'Guangxi Weizhuang '},   
    ]},
    { id: 3, 
      name: 'Tennis', 
      games: [],
      matches: [
        {id: 1, league: 'France 1', home: 'Gulnard M.', guest: 'Martineau M.'},
        {id: 2, league: 'England 2', home: 'Kerhove L.', guest: 'Fett J.'},
        {id: 3, league: 'Ukraine 1', home: 'Horvlt M.', guest: 'Kuwata H.'},
    ]}
  ];

  public openAddMatchDialog(sportId: number) {
    const dialogRef = this.dialog.open(AddMatchDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed()
    .pipe(
      filter(result => result),
    )
    .subscribe(result => {
      console.log('The dialog was closed');
      this.SPORTS.get(sportId)?.matches.push(result);
      //this.SPORTS.filter(sport => sport.id === sportId).forEach(sport => sport.matches.push(result))
    });
  }

  public openAddGameDialog(sportId: number) {
    const dialogRef = this.dialog.open(AddGameDialogComponent, {
      panelClass: 'disable-horizontal-scroll',
      data: {},
    });

    dialogRef.afterClosed()
    .pipe(
      filter(result => result),
    )
    .subscribe(result => {
      this.SPORTS.get(sportId)?.games.push(result);
      //this.SPORTS.filter(sport => sport.id === sportId).forEach(sport => sport.matches.push(result))
    });
  }

  public sendTips(match: Match) {

  }
}

export interface Sport {
  id: number,
  name: string,
  matches: Match[],
  games: Game[],
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

export interface SubgameAndOdd extends Subgame {
  odd: number,
}

export interface Match {
  id: number,
  home: string,
  guest: string,
  league: string,
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