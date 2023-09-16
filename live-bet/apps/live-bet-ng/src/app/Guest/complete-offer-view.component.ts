import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ISport } from '@live-bet/dto';
import { OfferType } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SportsService } from '../sports.service';
import { OddsActions } from '../store/odds.actions';
import { SportComponent } from './sport.component';

@Component({
  selector: 'guest-complete-offer-view',
  standalone: true,
  imports: [CommonModule, SportComponent],
  template: `
    <div class="sports">
      <guest-sport *ngFor="let sport of sports$ | async" [sport]="sport" class="white-grey" />
    </div>
    <button (click)="onClick()">Dodaj kvotu</button>
  `,
  styles: [
    ":host > * { text-align: center; padding: 20px 0; font-size: 30px; }",
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

  //private recieveOfferService = inject(RecieveOfferService);

  private sportsService: SportsService = inject(SportsService);
  sports$: Observable<ISport[]> = this.sportsService.getAllSports(OfferType.live);
}
