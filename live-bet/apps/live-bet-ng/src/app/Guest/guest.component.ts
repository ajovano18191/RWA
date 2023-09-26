import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketComponent } from '../Ticket/ticket.component';
import { NavBarComponent } from './nav-bar.component';

@Component({
  selector: 'guest',
  standalone: true,
  imports: [CommonModule, RouterModule, TicketComponent, NavBarComponent,],
  template: `
    <guest-nav-bar class="grey-white" />
    <div class="container grey-white">
      <div class="router">
        <router-outlet></router-outlet>
      </div>
      <div class="ticket">
        <ticket class="grey-white" />
      </div>
    </div>
  `,
  styles: [
    ".container { display: flex; flex-flow: row wrap; }",
    ".router { flex: 1; max-width: calc(100% - 400px); }",
    ".ticket { width: 400px; }",
    "@media (max-width: 1332px){ .container { flex-direction: column; } .router { max-width: 100%; } }",
  ],
})
export class GuestComponent {}