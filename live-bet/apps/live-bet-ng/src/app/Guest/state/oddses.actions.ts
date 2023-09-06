import { createActionGroup, props } from '@ngrx/store';
import { OddsKey } from '../sport.component';
 
export const OdssesActions = createActionGroup({
  source: 'Odsses',
  events: {
    'Set Odds': props<{ oddsKey: OddsKey, value: number, }>(),
  },
});