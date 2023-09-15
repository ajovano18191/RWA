import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ISubgame } from '@live-bet/dto';
import { Subscription } from 'rxjs';
import OddsKey from '../odds-key.model';
import { OfferService } from '../offer.service';
import { OddsActions } from '../store/odds.actions';
import Offer from './offer';

@Component({
  selector: 'bookmaker-subgame',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ],
  template: `
    <mat-form-field class="subgame">
      <mat-label>{{ subgame.name }}</mat-label>
        <input matInput type="number" [(ngModel)]="odd" (change)="changeOdd()">
    </mat-form-field>
  `,
  styles: [
    "* { width: 5em; margin: 0px 0.5em 0px 0.5em; }",
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }",
    "input[type=number] { -moz-appearance: textfield; }",
  ],
})
export class SubgameComponent implements OnInit, OnDestroy {
  @Input() subgame: ISubgame = {
    id: 0,
    name: '',
    game: {
      id: 0,
      name: '',
      subgames: [],
      sport: {
        id: 0,
        name: '',
        games: [],
        matches: [],
      },
    },
  };

  @Input() matchId: number = 0;

  @Output() oddChangeEvent = new EventEmitter<Offer>();
  odd: number = 1;

  private offerService: OfferService = inject(OfferService);
  private oddsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.oddsSubscription = this.offerService.oddsSelector(this.getOddsKey())
      .subscribe(p => {
        this.odd = p;
        this.oddChangeEvent.emit({
          subgameId: this.subgame.id,
          odd: this.odd,
        });
      });
  }

  changeOdd() {
    OddsActions.setOdds({
      oddsKey: this.getOddsKey(),
      value: this.odd,
    })

    this.oddChangeEvent.emit({
      subgameId: this.subgame?.id ? this.subgame!.id : 0,
      odd: this.odd,
    });
  }

  private getOddsKey(): OddsKey {
    return {
      sportId: this.subgame.game.sport.id,
      matchId: this.matchId,
      subgameId: this.subgame.id,
    }
  }

  ngOnDestroy(): void {
      this.oddsSubscription.unsubscribe();
  }
}
