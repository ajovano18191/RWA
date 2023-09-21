import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { ISport } from '@live-bet/dto';
import { OfferType } from '@live-bet/enums';
import { Observable } from 'rxjs';
import { AccountService } from '../Login/account.service';
import { SportsService } from '../sports.service';
import { SportComponent } from './sport.component';

@Component({
  selector: 'live-bet-bookmaker',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, SportComponent, MatButtonModule],
  template: `
    <button mat-raised-button color="primary" class="logout-button" (click)="logout()">Log out</button>
    <mat-accordion>
      <div *ngFor="let sport of sports$ | async">
        <bookmaker-sport [sport]="sport" />
      </div>
    </mat-accordion>
  `,
  styles: [
    ".logout-button { position: fixed; top: 0; right: 0; margin-top: 12px; margin-right: 12px; }",
  ],
})
export class BookmakerComponent {

  private sportsService: SportsService = inject(SportsService);
  sports$: Observable<ISport[]> = this.sportsService.getAllSports(OfferType.all);

  private accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['guest']);
  }
}