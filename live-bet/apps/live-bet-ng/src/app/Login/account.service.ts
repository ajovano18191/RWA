import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { delay, tap } from 'rxjs';
import { baseURL } from '../const';
import { UserActions } from '../store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private httpClient: HttpClient = inject(HttpClient);

  login(email: string, password: string): void {
    this.loginOrRegister('login', email, password);
  }

  register(email: string, password: string): void {
    this.loginOrRegister('register', email, password);
  }

  private router: Router = inject(Router);

  private loginOrRegister(path: string, email: string, password: string): void {
    this.httpClient
    .post<UserDTO>(`${baseURL}/auth/${path}`, { email: email, password: password })
    .pipe(
      tap(userDTO => this.setJWTToSocket(userDTO.accessToken)),
      delay(1000),
      tap(userDTO => this.saveUserInStore(userDTO)),
    )
    .subscribe(user => {
      if(user.role === 'bookmaker') {
        this.router.navigate(['bookmaker']);
      }
      else if(user.role === 'worker') {
        this.router.navigate(['guest', 'betting']);
      }
    });
  }

  private store: Store = inject(Store);

  logout(): void {
    this.setJWTToSocket("");
    this.store.dispatch(UserActions.clearUser());
  }

  testAll() {
    return this.httpClient.get(`${baseURL}/auth/all`).subscribe(p => console.log(p));
  }

  testAuthorized() {
    return this.httpClient.get(`${baseURL}/auth/authorized`).subscribe(p => console.log(p));
  }

  private saveUserInStore(userDTO: UserDTO): void {
    this.store.dispatch(UserActions.setUser(userDTO));
  }

  private socket: Socket = inject(Socket);

  private setJWTToSocket(accessToken: string): void {
    this.socket.ioSocket._opts.extraHeaders.Authorization = `Bearer ${accessToken}`;
    this.socket.disconnect();
    this.socket.connect();
  }
}
