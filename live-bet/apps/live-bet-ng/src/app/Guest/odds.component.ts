import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { Odds, OddsKey, newOddsKey } from '@live-bet/dto';
import { Observable, delay, filter, map, merge, pairwise, share, tap } from 'rxjs';
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
    ":host { background-color: transparent; }",
    ".odds-value { transition: color 1s; }",
  ],
})
export class OddsComponent implements OnInit, OnDestroy {
  // display: flex; justify-content: flex-end; align-items: center; 
  @Input() oddsKey: OddsKey = newOddsKey();

  @Output() oddChangeEvent = new EventEmitter<Odds>();

  private offerService: OfferService = inject(OfferService);
  oddse$ = new Observable<number>();
  textColor$: Observable<string> = new Observable<string>();

  ngOnInit(): void {
    this.oddse$ = this.offerService.oddsSelector(this.oddsKey)
    .pipe(
      tap(p => 
        this.oddChangeEvent.emit({
          oddsKey: this.oddsKey,
          value: p,
        })
      ),
    );
    this.textColor$ = this.sub2TextColors(this.oddse$);
  }

  private sub2TextColors(oddse$: Observable<number>): Observable<string> {
    const changeColor$ = oddse$
    .pipe(
      pairwise(),
      filter(p => p[1] !== p[0]),
      map((p) => {
        if(p[1] > p[0]) {
          return "lime";
        }
        else  {
          return "red";
        }
      }),
      share(),
    );

    const restoreColor$ = changeColor$.pipe(
      delay(1000),
      map(p => ""),
    );

    return merge(changeColor$, restoreColor$);
  }

  ngOnDestroy(): void {
    this.oddChangeEvent.emit({
      oddsKey: this.oddsKey,
      value: 1,
    })
  }
}
