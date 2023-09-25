import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ITicket, TicketDTO } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, map, take, tap } from 'rxjs';
import { selectUser } from './store/user.selector';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly baseURL = "http://localhost:3000/api";
  private httpClient: HttpClient = inject(HttpClient);
  private store: Store = inject(Store);

  constructor() { }

  placeBet(ticketDTO: TicketDTO): Observable<ITicket> {
    return this.store.select(selectUser)
    .pipe(
      take(1),
      map(userDTO => userDTO.role),
      exhaustMap(userRole => {
        const pathAddition: string = userRole === 'worker' ? 'worker' : "";
        return this.httpClient.post<ITicket>(`${this.baseURL}/tickets/${pathAddition}`, ticketDTO);
      }),
    );
  }

  payIn(ticketId: number, stake: number) {
    return this.httpClient
    .put<boolean>(`${this.baseURL}/tickets/${ticketId}/pay-in`, {
      stake: stake,
    })
  }

  payOut(ticketId: number) {
    return this.httpClient
    .get<number>(`${this.baseURL}/tickets/${ticketId}/pay-out`);
  }
}
