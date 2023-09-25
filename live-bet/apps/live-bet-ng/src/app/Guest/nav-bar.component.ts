import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectUser } from '../store/user.selector';

@Component({
  selector: 'guest-nav-bar',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, FormsModule],
  template: `
    <div class="container grey-white" >
      <p class="app-title">Live Bet</p>
      <mat-button-toggle-group [(ngModel)]="navigateTo" (change)="navigate()" aria-label="Font Style" class="grey-white">
        <mat-button-toggle value="back">Back</mat-button-toggle>
        <mat-button-toggle value="betting">Betting</mat-button-toggle>
        <mat-button-toggle value="live">Live</mat-button-toggle>
        <mat-button-toggle *ngIf="getRole() | async" value="worker">Worker</mat-button-toggle>
      </mat-button-toggle-group>
    <div>
  `,
  styles: [
    ":host { position: sticky; top: 0; }",
    ".container { display:flex; flex-flow: row wrap; padding: 12px; }",
    ".app-title { font-size: 36px; margin-top: 12px; max-width: 400px; min-width: 150px; flex: 1; }",
    "mat-button-toggle-group { display: flex; }",
    "mat-button-toggle { background-color: rgb(100, 100, 100) !important; color: white !important; border: 2px solid white; }"
  ],
})
export class NavBarComponent {
  navigateTo: string = "";

  private router: Router = inject(Router);
  private location: Location = inject(Location);

  navigate() {
    switch(this.navigateTo) {
      case "back":
        this.location.back();
        break;
      case "betting":
        this.router.navigate(["guest", "betting"]);
        break;
      case "live":
        this.router.navigate(["guest", "live"]);
        break;
      case "worker":
        this.router.navigate(["worker"]);
        break;
    }
  }

  private store: Store = inject(Store);

  getRole(): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map(userDTO => userDTO.role === 'worker'),
    );
  }
}
