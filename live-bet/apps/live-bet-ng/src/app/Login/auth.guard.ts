import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs";
import { selectUser } from "../store/user.selector";

export const bookmakerAuthGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => authGuardFn('bookmaker');

export const workerAuthGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => authGuardFn('worker');

function authGuardFn(role: string) {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(selectUser)
    .pipe(
        take(1),
        map(userDTO => userDTO.role),
        map(r => {
            if(r === role) {
                return true;
            }
            else {
                return router.parseUrl('/login');
            }
        }),
    );
}