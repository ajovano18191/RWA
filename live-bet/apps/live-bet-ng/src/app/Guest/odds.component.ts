import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, delay, filter, map, merge, pairwise, share } from 'rxjs';
import OddsKey from '../odds-key.model';
import { OfferService } from '../offer.service';

@Component({
  selector: 'guest-odds',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="odds-value" [ngStyle]="{'color': textColor$ | async}">
      {{ oddse$ | async | number:'1.2-2' }}
    </div>
  `,
  styles: [
    ":host { display: contents; }",
    ".odds-value { display: flex; justify-content: flex-end; align-items: center; transition: color 1s; }",
  ],
})
export class OddsComponent implements OnInit {
  @Input() odds: OddsKey = {
    sportId: 0,
    matchId: 0,
    subgameId: 0,
  }

  private store = inject(Store);
  oddse$ = new Observable<number>();
  textColor$: Observable<string> = new Observable<string>();
  private offerService: OfferService = inject(OfferService);

  ngOnInit(): void {
    this.oddse$ = this.offerService.oddsSelector(this.odds);

    this.textColor$ = this.sub2TextColors(this.oddse$);
  }


  private sub2TextColors(oddse$: Observable<number>): Observable<string> {
    const changeColor$ = oddse$
    .pipe(
      pairwise(),
      filter(p => p[1] !== p[0]),
      map((p) => {
        if(p[1] > p[0]) {
          return "green";
        }
        else  {
          return "red";
        }
      }),
      share(),
    );

    const restoreColor$ = changeColor$.pipe(
      delay(1000),
      map(p => "black"),
    );

    return merge(changeColor$, restoreColor$);
  }
}
