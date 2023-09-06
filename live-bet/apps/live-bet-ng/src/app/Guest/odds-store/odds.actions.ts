import { createActionGroup, props } from '@ngrx/store';
import OddsKey from '../odds-key.model';
 
export const OddsActions = createActionGroup({
  source: 'odds',
  events: {
    'Set Odds': props<{ oddsKey: OddsKey, value: number, }>(),
  },
});