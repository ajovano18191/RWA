import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ISport } from '@live-bet/dto';
import { OfferType } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { SportsService } from '../sports.service';
import { selectAllFavorites } from '../store/favorite.selectors';
import { OddsActions } from '../store/odds.actions';
import { SportComponent } from './sport.component';

@Component({
  selector: 'guest-complete-offer-view',
  standalone: true,
  imports: [CommonModule, SportComponent, MatTabsModule,],
  template: `
    <mat-tab-group>
      <mat-tab label="All sports">
        <ng-template mat-tab-label>
          <span class="mat-tab-label">All sports</span>
        </ng-template>
        <guest-sport *ngFor="let sport of sports$ | async" [sport]="sport" class="white-grey" />
      </mat-tab>
      <mat-tab *ngFor="let sport of sports$ | async" [label]="sport.name">
        <ng-template mat-tab-label>
          <span class="mat-tab-label">{{ sport.name }}</span>
        </ng-template>
        <guest-sport [sport]="sport" class="white-grey" />
      </mat-tab>
      <mat-tab label="Favorites">
        <ng-template mat-tab-label>
          <span class="mat-tab-label">Favorites</span>
        </ng-template>
        <guest-sport *ngFor="let sport of favoriteSport$ | async" [sport]="sport" class="white-grey" />
      </mat-tab>
    </mat-tab-group>
    <button (click)="onClick()">Dodaj kvotu</button>
  `,
  styles: [
    ":host > * { text-align: center; font-size: 30px; }",
    ".mat-tab-label { color: white; font-size: 20px; }"
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

  private sportsService: SportsService = inject(SportsService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private offerType$ = this.route.url
  .pipe(
    map(p => p[0].path),
    map(p => {
      if(p === 'live') {
        return OfferType.live;
      }
      else if(p === 'betting') {
        return OfferType.noLive;
      }
      else {
        return OfferType.all;
      }
    })
  );

  sports$: Observable<ISport[]> = this.offerType$.pipe(
      switchMap(offerType => this.sportsService.getAllSports(offerType)),
  );

  favoriteSport$ = this.store.select(selectAllFavorites)
  .pipe(
    map(matches =>  {
      const sportsMap = new Map<number, ISport>();
      matches.forEach(match => {
        sportsMap.set(match.sport.id, {...match.sport, matches: [], });
      });
      matches.forEach(match => {
        sportsMap.get(match.sport.id)?.matches.push(match);
      })
      return Array.from(sportsMap.values());
    }),
  );
}
