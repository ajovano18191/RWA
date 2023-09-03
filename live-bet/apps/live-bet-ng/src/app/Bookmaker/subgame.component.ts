import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import Subgame from './subgame';

@Component({
  selector: 'bookmaker-subgame',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ],
  template: `
    <mat-form-field class="subgame">
      <mat-label>{{ subgame.name }}</mat-label>
        <input matInput type="number">
    </mat-form-field>
  `,
  styles: [
    "* { width: 5em; margin: 0px 0.5em 0px 0.5em; }",
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }",
    "input[type=number] { -moz-appearance: textfield; }",
  ],
})
export class SubgameComponent {
  @Input() subgame: Subgame = {
    id: 0,
    name: '',
  }
}
