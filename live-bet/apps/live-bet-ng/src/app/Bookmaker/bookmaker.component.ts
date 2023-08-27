import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { filter } from 'rxjs';

@Component({
  selector: 'live-bet-bookmaker',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <mat-accordion>
      <div *ngFor="let sport of SPORTS">
        <div class="sport-name">
          <h1  class="sport-name-text">{{ sport.name }}</h1>
          <button mat-fab extended color="primary" class="sport-name-button" (click)="openAddMatchDialog(sport.id)">
            <mat-icon class="button-icon">add</mat-icon>
            Add match
          </button>
        </div>
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

  public dialog: MatDialog = inject(MatDialog);

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

  public openAddMatchDialog(sportId: number) {
    //this.SPORTS.filter(sport => sport.id === sportId).forEach(sport => sport.matches)
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {},
    });

    dialogRef.afterClosed()
    .pipe(
      filter(result => result),
    )
    .subscribe(result => {
      console.log('The dialog was closed');
      this.SPORTS.filter(sport => sport.id === sportId).forEach(sport => sport.matches.push(result))
    });
  }
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


@Component({
  selector: 'dialog-overview-example-dialog',
  styles: [
    ".mat-mdc-dialog-actions { justify-content: flex-end; }"
  ],
  template: `
    <div mat-dialog-content>
      <h1><b>Add match</b></h1>
      <mat-form-field>
        <mat-label>League</mat-label>
        <input matInput [(ngModel)]="data.league">
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>Home</mat-label>
        <input matInput [(ngModel)]="data.home">
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>Guest</mat-label>
        <input matInput [(ngModel)]="data.guest">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  providers: [MatDialog]
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Match,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}