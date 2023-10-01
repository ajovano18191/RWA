import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { LogoutComponent } from '../Login/logout.component';
import { selectUser } from '../store/user.selector';

@Component({
  selector: 'guest-nav-bar',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, FormsModule, LogoutComponent,],
  template: `
    <logout />
    <div class="container back-text" >
      <p class="app-title">Live Bet</p>
      <mat-button-toggle-group [(ngModel)]="navigateTo" (change)="navigate()" aria-label="Font Style" class="back-text">
        <mat-button-toggle class="border-color" value="back">Back</mat-button-toggle>
        <mat-button-toggle class="border-color" value="betting">Betting</mat-button-toggle>
        <mat-button-toggle class="border-color" value="live">Live</mat-button-toggle>
        <mat-button-toggle class="border-color" *ngIf="getRole() | async" value="worker">Worker</mat-button-toggle>
      </mat-button-toggle-group>
    <div>
  `,
  styles: [
    ":host { position: sticky; top: 0; z-index: 1000; width: 100%; }",
    ".container { display:flex; flex-flow: row wrap; padding: 12px; }",
    ".app-title { font-size: 36px; margin-top: 12px; max-width: 400px; min-width: 150px; flex: 1; }",
    "mat-button-toggle-group { display: flex; border: none; }",
    "mat-button-toggle { background-color: #172034 !important; color: white !important; }"
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
