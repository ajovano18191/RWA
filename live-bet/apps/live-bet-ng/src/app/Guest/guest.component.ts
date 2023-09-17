import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketComponent } from '../Ticket/ticket.component';

@Component({
  selector: 'guest',
  standalone: true,
  imports: [CommonModule, RouterModule, TicketComponent,],
  template: `
    <div class="container">
      <div class="router">
        <router-outlet></router-outlet>
      </div>
      <div class="ticket">
        <ticket />
      </div>
    </div>
  `,
  styles: [
    ".container { display: flex; flex-direction: row; justify-content: space-between; }",
    ".router { flex: 1; }",
    ".ticket { width: 300px; }",
  ],
})
export class GuestComponent {}
