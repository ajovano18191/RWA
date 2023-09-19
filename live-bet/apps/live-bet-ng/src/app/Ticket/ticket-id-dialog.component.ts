import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ITicket } from '@live-bet/dto';

@Component({
  selector: 'ticket-id-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  providers: [MatDialog],
  template: `<div class="grey-white dialog-body">Ticket with ID: {{ ticket.id }} was successfully created.</div>`,
  styles: [
    ".dialog-body { padding: 1em; font-size: 3em; line-height: 1em; }",
  ],
})
export class TicketIdDialogComponent {
  public ticket: ITicket = inject(MAT_DIALOG_DATA);
}
