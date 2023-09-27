import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ISport } from '@live-bet/dto';
import { OfferType } from '@live-bet/enums';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { SportsService } from '../sports.service';
import { selectAllFavorites, selectFavoriteTotal } from '../store/favorite.selectors';
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
          <span class="mat-tab-label">Favorites {{ numOfFavoriteMatche$ | async }}</span>
        </ng-template>
        <guest-sport *ngFor="let sport of favoriteSport$ | async" [sport]="sport" class="white-grey" />
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [
    ":host > * { text-align: center; font-size: 30px; }",
    ".mat-tab-label { color: white; font-size: 20px; }"
  ],
})
export class CompleteOfferViewComponent {

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

  private sportsService: SportsService = inject(SportsService);

  sports$: Observable<ISport[]> = this.offerType$.pipe(
      switchMap(offerType => this.sportsService.getAllSports(offerType)),
  );

  private store = inject(Store);
  
  favoriteSport$ = this.store.select(selectAllFavorites)
  .pipe(
    map(matches =>  {
      const sportsMap = new Map<number, ISport>();
      matches.forEach(match => {
        sportsMap.set(match.sport.id, {...match.sport, matches: [], });
      });
      matches.forEach(match => {
        sportsMap.get(match.sport.id)?.matches.push(match);
      });
      return Array.from(sportsMap.values());
    }),
  );

  numOfFavoriteMatche$ = this.store.select(selectFavoriteTotal);
}
