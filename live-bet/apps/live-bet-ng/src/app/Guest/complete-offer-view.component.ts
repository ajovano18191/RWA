import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportComponent } from './sport.component';
import { Store } from '@ngrx/store';
import { OddsActions } from '../store/odds.actions';
import { ISport } from '@live-bet/dto';
import { SportsService } from '../sports.service';
import { Observable, tap } from 'rxjs';
import { OfferType } from '@live-bet/enums';

@Component({
  selector: 'guest-complete-offer-view',
  standalone: true,
  imports: [CommonModule, SportComponent,],
  template: `
    <div class="sports">
      <guest-sport *ngFor="let sport of sports$ | async" [sport]="sport" />
    </div>
    <button (click)="onClick()">Dodaj kvotu</button>
  `,
  styles: [
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; }",
  ],
})
export class CompleteOfferViewComponent implements OnInit {
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
  sports$: Observable<ISport[]> = 
    this.sportsService.getAllSports(OfferType.live)
    .pipe(
      tap(p => p.forEach(q => {
        q.games = q.games.slice(0, 3);
      })),
    );
  
  ngOnInit(): void {
      // this.store.dispatch({
      //   type: 'Load Odds',
      // });
  }
}
