import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserDTO } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Observable, delay, tap } from 'rxjs';
import { UserActions } from '../store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly baseURL = "http://localhost:3000/api";
  
  private httpClient: HttpClient = inject(HttpClient);
  private store: Store = inject(Store);
  private socket: Socket = inject(Socket);

  constructor() { }

  login(email: string, password: string): Observable<UserDTO> {
    return this.httpClient
    .post<UserDTO>(`${this.baseURL}/auth/login`, { email: email, password: password })
    .pipe(
      tap(userDTO => this.setJWTToSocket(userDTO.accessToken)),
      delay(1000),
      tap(userDTO => this.saveUserInStore(userDTO)),
    );
  }

  register(email: string, password: string): Observable<UserDTO> {
    return this.httpClient
    .post<UserDTO>(`${this.baseURL}/auth/register`, { email: email, password: password })
    .pipe(
      tap(userDTO => this.setJWTToSocket(userDTO.accessToken)),
      delay(1000),
      tap(userDTO => this.saveUserInStore(userDTO)),
    );
  }

  logout(): void {
    this.setJWTToSocket("");
    this.store.dispatch(UserActions.clearUser());
  }

  testAll() {
    return this.httpClient.get(`${this.baseURL}/auth/all`).subscribe(p => console.log(p));
  }

  testAuthorized() {
    return this.httpClient.get(`${this.baseURL}/auth/authorized`).subscribe(p => console.log(p));
  }

  private saveUserInStore(userDTO: UserDTO): void {
    this.store.dispatch(UserActions.setUser(userDTO));
  }

  private setJWTToSocket(accessToken: string): void {
    this.socket.ioSocket._opts.extraHeaders.Authorization = `Bearer ${accessToken}`;
    this.socket.disconnect();
    this.socket.connect();
  }
}
