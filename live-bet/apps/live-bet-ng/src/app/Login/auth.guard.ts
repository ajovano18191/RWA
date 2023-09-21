import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs";
import { selectUser } from "../store/user.selector";

export const authGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
      const store = inject(Store);
      const router = inject(Router);

      return store.select(selectUser)
      .pipe(
        take(1),
        map(userDTO => userDTO.accessToken),
        map(accessToken => {
            if(accessToken) {
                return true;
            }
            else {
                return router.parseUrl('/login');
            }
        }),
      );
  }