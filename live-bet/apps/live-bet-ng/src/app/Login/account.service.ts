import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserDTO } from '@live-bet/dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly baseURL = "http://localhost:3000/api";
  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  login(email: string, password: string) {
    return this.httpClient
    .post<UserDTO>(`${this.baseURL}/auth/login`, { username: email, password: password });
  }
}
