import { inject } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { OfferService } from "../offer.service";
import { catchError, exhaustMap, filter, map, of, tap } from "rxjs";
import { OddsActions } from "./odds.actions";

export const offerEffect = createEffect(
    (actions$ = inject(Actions), oddsService = inject(OfferService)) => 
    actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        exhaustMap(() =>
            oddsService.getOdds().pipe(
                map((odds) => OddsActions.setOdds(odds)),
                catchError((error: { message: string }) =>
                    of(OddsActions.setOdds({
                        oddsKey: {
                            sportId: 0,
                            matchId: 0,
                            subgameId: 0,
                        },
                        value: 0,
                    }))
                )
            )
        )
    ),
    { functional: true }
);

export const displayErrorAlert = createEffect(
    () => {
      return inject(Actions).pipe(
        filter(() => false)
      );
    },
    { functional: true, dispatch: false }
  );