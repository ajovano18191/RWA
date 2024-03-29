import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { TicketComponent } from './Ticket/ticket.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TicketComponent],
  selector: 'live-bet-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'live-bet-ng';
}
