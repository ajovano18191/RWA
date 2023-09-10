import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { SportComponent } from './sport.component';
import { SportsService } from '../sports.service';
import { HttpClientModule } from '@angular/common/http';
import { ISport } from 'libs/dto/src';
import { Observable } from 'rxjs';

@Component({
  selector: 'live-bet-bookmaker',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, SportComponent, HttpClientModule],
  template: `
    <mat-accordion>
      <div *ngFor="let sport of sports$ | async">
        <bookmaker-sport [sport]="sport" />
      </div>
    </mat-accordion>
  `,
})
export class BookmakerComponent {

  private sportsService: SportsService = inject(SportsService);
  sports$: Observable<ISport[]> = this.sportsService.getAllSports();
}