import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from './sport.component';

@Component({
  selector: 'guest-match',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="match-id">{{ match.id }}</div>
    <div class="league">{{ match.league }}</div>
    <div class="home-guest-match">
      {{ match.home }} <br> {{ match.guest }}
    </div>
    <ng-container>
      <div class="tip" *ngFor="let tip of match.tips">{{ tip | number:'1.2-2' }}</div>
    </ng-container>
  `,
  styles: [
    ":host { display: contents; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
    ".home-guest-match { grid-column: span 3; }",
    ".tip { display: flex; justify-content: flex-end; align-items: center; }",
  ],
})
export class MatchComponent {
  @Input() match: Match = {
    id: 0,
    home: '',
    guest: '',
    league: '',
    tips: [],
  }
}
