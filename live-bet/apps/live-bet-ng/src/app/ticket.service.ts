import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ITicket, TicketDTO } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, map, take } from 'rxjs';
import { baseURL } from './const';
import { selectUser } from './store/user.selector';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
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
        return this.httpClient.post<ITicket>(`${baseURL}/tickets/${pathAddition}`, ticketDTO);
      }),
    );
  }

  payIn(ticketId: number, stake: number): Observable<boolean> {
    return this.httpClient
    .put<boolean>(`${baseURL}/tickets/${ticketId}/pay-in`, {
      stake: stake,
    })
  }

  payOut(ticketId: number): Observable<number> {
    return this.httpClient
    .get<number>(`${baseURL}/tickets/${ticketId}/pay-out`);
  }
}
