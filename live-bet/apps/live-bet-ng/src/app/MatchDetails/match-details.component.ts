import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMatch } from '../store/match.selector';

@Component({
  selector: 'match-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div (click)="goBack()">Back</div>
    <p>{{ (matche$ | async)?.league }} {{ (matche$ | async)?.home }} - {{ (matche$ | async)?.guest }}</p>
  `,
  styles: [],
})
export class MatchDetailsComponent {
  private store = inject(Store);
  matche$ = this.store.select(selectMatch);

  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
