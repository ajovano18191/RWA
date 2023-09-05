import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subgame } from './sport.component';

@Component({
  selector: 'guest-subgame',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="subgame-name">{{ subgame.name }}</div>`,
  styles: [
    ":host { display: contents; }",
    ":host > *:hover {background-color: red; }",
    ":host > * { background-color: rgba(255, 255, 255, 0.8); text-align: center; padding: 20px 0; font-size: 30px; border: 1px solid black; } ",
  ],
})
export class SubgameComponent {
  @Input() subgame: Subgame = {
    id: 0,
    name: '',
  }
}
