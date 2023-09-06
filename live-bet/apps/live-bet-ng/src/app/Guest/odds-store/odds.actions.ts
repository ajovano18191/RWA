import { createActionGroup, props } from '@ngrx/store';
import OddsKey from '../odds-key.model';
 
export const OdssActions = createActionGroup({
  source: 'odss',
  events: {
    'Set Odds': props<{ oddsKey: OddsKey, value: number, }>(),
  },
});