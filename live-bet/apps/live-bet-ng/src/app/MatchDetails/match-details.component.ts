import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FavoriteComponent } from '../Guest/favorite.component';
import { selectMatch } from '../store/match.selector';
import { GameComponent } from './game.component';

@Component({
  selector: 'match-details',
  standalone: true,
  imports: [CommonModule, GameComponent, FavoriteComponent,],
  template: `
    <div class="match-details back-text">
      <div class="teams back-text border-color">
        <guest-favorite [match]="(matche$ | async)!" />
        <p>
          {{ (matche$ | async)?.home }}
          <br>
          {{ (matche$ | async)?.guest }}
        </p>
      </div>
      <div class="games">
        <match-details-game *ngFor="let game of (matche$ | async)?.sport?.games" [game]="game" />
      </div>
    </div>
  `,
  styles: [
    ".match-details { padding: 10px; }",
    ".games { display: grid; grid-template-columns: repeat(3, auto); column-gap: 20px; margin-top: -20px; }",
    ".teams { margin-left: auto; margin-right: auto; width: fit-content; padding-block: 0.5em; padding-inline: 0.5em; font-size: 3em; line-height: 1.2em; display: flex; align-items: center; }",
    ".teams > p { margin: 0px; margin-left: 16px; }",
  ],
})
export class MatchDetailsComponent {
  private store = inject(Store);
  matche$ = this.store.select(selectMatch).pipe();
}
