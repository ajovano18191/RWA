import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OddsKey } from './sport.component';
import { Store } from '@ngrx/store';
import { selectOddses } from './state/oddses.selector';
import { Observable, Subscription, filter, map, pairwise, tap } from 'rxjs';

@Component({
  selector: 'guest-odds',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="odds-value" [ngStyle]="{'background-color': textColor, 'grid-column-start': odds.subgameId + 6,}">{{ oddse$ | async | number:'1.2-2' }}</div>`,
  styles: [
    ":host { display: contents; }",
    ".odds-value { display: flex; justify-content: flex-end; align-items: center; transition: background-color 1s; }",
  ],
})
export class OddsComponent implements OnInit, OnDestroy {
  @Input() odds: OddsKey = {
    id: 0,
    sportId: 0,
    matchId: 0,
    subgameId: 0,
  }

  
  store = inject(Store);
  oddse$ = new Observable<number>();
  textColor: string = "white";
  colorSubscription: Subscription = new Subscription();
  
  ngOnInit(): void {
    this.oddse$ = this.store.select(selectOddses(this.odds))
    .pipe(
      filter(p => p !== undefined),
      map(p => p!),
    );

    this.colorSubscription = this.oddse$
    .pipe(
      pairwise(),
    )
    .subscribe(p => {
      if(p[1] !== p[0]) {
        if(p[1] > p[0]) {
          this.textColor = "green";
        }
        else  {
          this.textColor = "red";
        }
        setTimeout(() => this.textColor = "white", 1000);
      }
    });
  }

  ngOnDestroy(): void {
    this.colorSubscription.unsubscribe();
  }
}
