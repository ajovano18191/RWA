import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { TicketComponent } from '../Ticket/ticket.component';
import { NavBarComponent } from './nav-bar.component';
@Component({
  selector: 'guest',
  standalone: true,
  imports: [CommonModule, RouterModule, TicketComponent, NavBarComponent, MatButtonModule, MatIconModule, MatSidenavModule,],
  template: `
    <guest-nav-bar class="back-text" />
    <mat-drawer-container class="draw-container">
      <mat-drawer #sideNav mode="side" position="end">
        <ticket class="back-text" />
      </mat-drawer>
      <mat-drawer-content>
        <div class="router back-text">
          <router-outlet></router-outlet>
        </div>
        <button mat-fab extended (click)="toggleSideNav()" class="ticket-fab">
            <mat-icon class="button-icon">{{ isSideNavOpened ? 'keyboard_arrow_right' : 'keyboard_arrow_left' }}</mat-icon>
            {{ isSideNavOpened ? '' : 'Ticket' }}
        </button>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    ".draw-container { height: 100%; padding-bottom: 78px; }",
    "mat-drawer { width: 400px; background-color: #172034; color: white; padding-bottom: 78px; }",
    ".router { overflow-y: auto; height: 100%; }",
    ".ticket-fab { position: absolute; top: 50%; right: 0; z-index: 1; background-color: white !important; color: #172034 !important; font-size: 16px; }",
    ".button-icon { margin-right: -4px !important; }",
  ],
})
export class GuestComponent {
  @ViewChild('sideNav') sideNav: MatDrawer | undefined;

  isSideNavOpened: boolean = false;

  async toggleSideNav() {
    this.isSideNavOpened = await this.sideNav!.toggle() as string === 'open';
  }
}