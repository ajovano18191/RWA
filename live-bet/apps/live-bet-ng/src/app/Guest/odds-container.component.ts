import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener, Input, OnInit, inject } from '@angular/core';
import { IMatch, ISubgame, OddsKey, newIMatch, newISubgame } from '@live-bet/dto';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OfferService } from '../offer.service';
import { setOrDeleteEvent } from '../store/ticket.actions';
import { OddsComponent } from './odds.component';

@Component({
  selector: 'guest-odds-container',
  standalone: true,
  imports: [CommonModule, OddsComponent,],
  template: `
    <div class="container back-text" [ngStyle]="{'background-color': backgroundColor$ | async}" [ngClass]="subgame.isPlayable ? 'back-text-hover' : ''">
      <guest-odds [oddsKey]="oddsKey" class="back-text" />
    </div>
  `,
  styles: [
    ":host { display: contents; }",
    ".container { display: flex; justify-content: flex-end; align-items: center; font-size: 30px; height: 100%; padding: 0px 16px;  } ",
  ],
})
export class OddsContainerComponent implements OnInit {
  @Input() match: IMatch = newIMatch();

  @Input() subgame: ISubgame = newISubgame();

  get oddsKey() {
    return {
      sportId: this.match.sport.id,
      matchId: this.match.id,
      subgameId: this.subgame.id,
    } as OddsKey;
  }

  @HostBinding('class') hoverClass = '';

  private store = inject(Store);
  private offerService: OfferService = inject(OfferService);
  backgroundColor$ = new Observable<string>();

  ngOnInit(): void {
    this.hoverClass = this.subgame.isPlayable ? 'back-text-hover' : '';
    this.backgroundColor$ = this.offerService.backgroundColor$(this.oddsKey);
  }

  @HostListener('click')
  add2Ticket() {
    if(this.subgame.isPlayable) {
      this.store.dispatch(setOrDeleteEvent({ match: this.match, subgame: this.subgame, }));
    }
  }
}