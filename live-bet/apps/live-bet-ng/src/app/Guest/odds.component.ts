import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Odds } from './sport.component';
import { Store } from '@ngrx/store';
import { selectOddses } from './state/oddses.selector';
import { Observable, Subscription, filter, map, pairwise, tap } from 'rxjs';

@Component({
  selector: 'guest-odds',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="odds-value" [ngStyle]="{'background-color': textColor}">{{ (oddse$ | async)?.value | number:'1.2-2' }}</div>`,
  styles: [
    ":host { display: contents; }",
    ".odds-value { display: flex; justify-content: flex-end; align-items: center; transition: background-color 1s; }",
  ],
})
export class OddsComponent implements OnInit, OnDestroy {
  @Input() odds: Odds = {
    id: 0,
    value: 0,
    sportId: 0,
    matchId: 0,
    subgameId: 0,
  }

  store = inject(Store);
  oddse$ = this.store.select(selectOddses).pipe(
    map(p => p.get(this.odds.sportId)?.get(this.odds.matchId)?.get(this.odds.subgameId)),
    filter(p => p !== undefined),
    map(p => p!),
  );

  textColor: string = "white";

  colorSubscription: Subscription = new Subscription();
  
  ngOnInit(): void {
    this.colorSubscription = this.oddse$
    .pipe(
      pairwise(),
    )
    .subscribe(p => {
      if(p[1].value !== p[0].value) {
        if(p[1].value > p[0].value) {
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
