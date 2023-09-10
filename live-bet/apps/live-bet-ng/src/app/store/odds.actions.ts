import { createActionGroup, props } from '@ngrx/store';
import { Odds } from '../odds.model';
 
export const OddsActions = createActionGroup({
  source: 'odds',
  events: {
    'Set Odds': props<Odds>(),
    'Load Odds': props<any>(),
  },
});