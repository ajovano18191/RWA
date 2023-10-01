import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { NavBarComponent } from '../Guest/nav-bar.component';
import { InComponent } from './in.component';
import { OutComponent } from './out.component';

@Component({
  selector: 'worker',
  standalone: true,
  imports: [CommonModule, InComponent, OutComponent, MatDividerModule, NavBarComponent,],
  template: `
    <guest-nav-bar />
    <div class="container">
      <worker-in />
      <mat-divider [vertical]="true"></mat-divider>
      <worker-out />
    </div>
  `,
  styles: [
    ".container { display: flex; flex-flow: row wrap; justify-content: center; align-items: center; position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); }",
    "mat-divider { width: 16px; }",
  ],
})
export class WorkerComponent {}
