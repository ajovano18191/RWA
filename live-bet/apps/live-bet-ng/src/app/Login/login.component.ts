import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '../store/user.actions';
import { AccountService } from './account.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>LOGIN</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div>
          <mat-form-field>
            <mat-label>Enter your email</mat-label>
            <input matInput [type]="'email'" [(ngModel)]="email" />
          </mat-form-field>
        </div>
        <div>
          <mat-form-field>
            <mat-label>Enter your password</mat-label>
            <input matInput [type]="hide ? 'password' : 'text'" [(ngModel)]="password">
            <button mat-icon-button matSuffix color="primary" (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
            <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
          </mat-form-field>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary" (click)="go2Register()">Register</button>
        <button mat-raised-button color="primary" (click)="login()">Log in</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    ":host { width: fit-content; position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); }",
    "mat-card-header { display: flex; justify-content: center; }",
    "mat-form-field { width: 100%; }",
    "mat-card-actions { display: flex; justify-content: space-between; }",
  ],
})
export class LoginComponent {
  hide = true;
  email: string = "";
  password: string = "";

  private accountService: AccountService = inject(AccountService);
  private store: Store = inject(Store);
  private router: Router = inject(Router);

  login() {
    this.accountService.login(this.email, this.password).subscribe(user => {
      this.store.dispatch(UserActions.setUser(user));
      if(user.role === 'bookmaker') {
        //this.router.navigate(['bookmaker']);
      }
      this.router.navigate(['bookmaker']);
    });
  }

  go2Register() {
    this.router.navigate(['register']);
  }
}
