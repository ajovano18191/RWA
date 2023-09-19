import { MatchOfferDTO, Odds } from '@live-bet/dto';
import { createActionGroup, props } from '@ngrx/store';
 
export const OddsActions = createActionGroup({
  source: 'odds',
  events: {
    'Set Odds': props<Odds>(),
    'Load Odds': props<any>(),
    'Remove Match': props<MatchOfferDTO>(),
  },
});