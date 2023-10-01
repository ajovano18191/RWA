import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectUser } from '../store/user.selector';
import { AccountService } from './account.service';

@Component({
  selector: 'logout',
  standalone: true,
  imports: [CommonModule, MatButtonModule,],
  template: `
    <ng-container *ngIf="isUserLoggedIn$ | async">
      <button mat-raised-button color="primary" class="logout-button" (click)="logout()">Log out</button>
    <ng-container>
  `,
  styles: [
    ":host { position: fixed; top: 0; right: 0; margin-top: 12px; margin-right: 12px; }",
  ],
})
export class LogoutComponent {
  private store: Store = inject(Store);
  isUserLoggedIn$: Observable<boolean> = 
    this.store.select(selectUser)
    .pipe(
      map(userDTO => userDTO.accessToken !== "")
    );
  
  private accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);  

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['guest', 'betting']);
  }
}
