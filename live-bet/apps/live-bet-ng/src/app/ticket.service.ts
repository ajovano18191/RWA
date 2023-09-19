import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ITicket, TicketDTO } from '@live-bet/dto';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly baseURL = "http://localhost:3000/api";
  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  placeBet(ticketDTO: TicketDTO): Observable<ITicket> {
    return this.httpClient.post(`${this.baseURL}/tickets`, ticketDTO)
    .pipe(
      tap(p => console.log(p)),
      map(p => p as ITicket),
    );
  }
}
