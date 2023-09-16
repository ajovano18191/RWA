import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';

@Component({
  selector: 'ticket',
  standalone: true,
  imports: [CommonModule, EventComponent],
  template: `
    <div class="row">
      <div class="title">Ticket</div>
        <div class="clear">Clear</div>
    </div>
    <ticket-event />
    <ticket-event />
    <ticket-event />
    <div class="summary">
      <div class="row">
        <div class="events-number">Events: 3</div>
        <div class="odds">Odds: 2.54</div>
      </div>
      <div class="row">
        <div class="stake-label">Stake (RSD):</div>
        <div class="stake-value">2.54$</div>
      </div>
    </div>
  `,
  styles: [
    ":host { display: flex; flex-direction: column; padding: 12px; }",
    ".row { display: flex; justify-content: space-between; }",
  ],
})
export class TicketComponent {}
