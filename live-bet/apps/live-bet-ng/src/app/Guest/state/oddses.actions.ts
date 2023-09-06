import { createActionGroup, props } from '@ngrx/store';
import { Odds } from '../sport.component';
 
export const OdssesActions = createActionGroup({
  source: 'Odsses',
  events: {
    'Set Odds': props<{ odds: Odds }>(),
  },
});