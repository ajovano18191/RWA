import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ISport } from '@live-bet/dto';
import { OfferType } from '@live-bet/enums';
import { Observable } from 'rxjs';
import { LogoutComponent } from '../Login/logout.component';
import { SportsService } from '../sports.service';
import { SportComponent } from './sport.component';

@Component({
  selector: 'live-bet-bookmaker',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, SportComponent, LogoutComponent,],
  template: `
    <logout />
    <mat-accordion>
      <div *ngFor="let sport of sports$ | async">
        <bookmaker-sport [sport]="sport" />
      </div>
    </mat-accordion>
  `,
  styles: [
    ":host { overflow: auto; height: 100%; display: block; }",
  ],
})
export class BookmakerComponent {
  private sportsService: SportsService = inject(SportsService);
  sports$: Observable<ISport[]> = this.sportsService.getAllSports(OfferType.all);
}