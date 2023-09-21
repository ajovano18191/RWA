import { inject } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, map, of, switchMap } from "rxjs";
import { OfferService } from "../offer.service";
import { OddsActions } from "./odds.actions";
import { UserActions } from "./user.actions";

export const offerEffect = createEffect(
    (actions$ = inject(Actions), oddsService = inject(OfferService)) => 
    actions$.pipe(
        ofType(ROOT_EFFECTS_INIT, UserActions.setUser, UserActions.clearUser),
        switchMap(() =>
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