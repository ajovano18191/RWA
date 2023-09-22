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
    ".container { display: flex; flex-flow: row wrap; justify-content: space-between; }",
    ".router { flex: 1; min-width: 850px; }",
    ".ticket { flex: 1; min-width: 270px; max-width: 400px; }",
  ],
})
export class GuestComponent {}
