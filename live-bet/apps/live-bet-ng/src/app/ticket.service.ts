import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TicketDTO } from '@live-bet/dto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly baseURL = "http://localhost:3000/api";
  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  placeBet(ticketDTO: TicketDTO) {
    this.httpClient.post(`${this.baseURL}/tickets`, ticketDTO).subscribe(p => console.log(p));
  }
}
