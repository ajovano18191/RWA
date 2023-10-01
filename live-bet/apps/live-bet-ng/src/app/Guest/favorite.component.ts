import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IMatch, newIMatch } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { setOrDeleteFavorite } from '../store/favorite.actions';
import { selectFavoriteIds } from '../store/favorite.selectors';

@Component({
  selector: 'guest-favorite',
  standalone: true,
  imports: [CommonModule, MatIconModule,],
  template: `
    <mat-icon (click)="setOrDeleteFavorite()" [ngStyle]="{'color': textColor$ | async}">star</mat-icon>
  `,
  styles: [
    ".mat-icon { width: 36px; height: 36px; font-size: 36px; }"
  ],
})
export class FavoriteComponent implements OnInit {
  @Input() match: IMatch = newIMatch();

  private store = inject(Store);
  textColor$ = new Observable<string>();

  ngOnInit(): void {
    this.textColor$ = this.store.select(selectFavoriteIds)
    .pipe(
      map(ids => ids as number[]),
      map(ids => ids.includes(this.match.id) ? '#ffbf00' : ''),
    );
  }

  setOrDeleteFavorite() {
    this.store.dispatch(setOrDeleteFavorite(this.match));
  }
}
