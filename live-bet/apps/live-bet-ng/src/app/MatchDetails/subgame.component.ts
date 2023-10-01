import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { IMatch, ISubgame, OddsKey, newIMatch, newISubgame } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OddsComponent } from '../Guest/odds.component';
import { OfferService } from '../offer.service';
import { selectMatch } from '../store/match.selector';
import { setOrDeleteEvent } from '../store/ticket.actions';

@Component({
  selector: 'match-details-subgame',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="container border-color" [ngStyle]="{'background-color': backgroundColor$ | async}" [ngClass]="subgame.isPlayable ? 'back-text-hover' : ''">
      <div class="subgame-name">{{ subgame.name }}</div>
      <guest-odds [oddsKey]="{ sportId: subgame.game.sport.id, matchId: (matche$ | async)!.id, subgameId: subgame.id }" class="back-text" />
    </div>
  `,
  styles: [
    ".container { display: flex; justify-content: space-between; font-size: 24px; padding: 10px; } ",
  ],
})
export class SubgameComponent implements OnInit {
  @Input() subgame: ISubgame = newISubgame();

  private store = inject(Store);
  matche$ = this.store.select(selectMatch);

  private match: IMatch = newIMatch();

  private offerService: OfferService = inject(OfferService);
  backgroundColor$ = new Observable<string>();

  ngOnInit(): void {
    this.matche$.subscribe(match => this.match = match);
    this.backgroundColor$ = this.offerService.backgroundColor$(this.oddsKey);
  }

  get oddsKey() {
    return {
      sportId: this.match.sport.id,
      matchId: this.match.id,
      subgameId: this.subgame.id,
    } as OddsKey;
  }

  @HostListener('click')
  add2Ticket() {
    if(this.subgame.isPlayable) {
      this.store.dispatch(setOrDeleteEvent({ match: this.match, subgame: this.subgame, }));
    }
  }
}