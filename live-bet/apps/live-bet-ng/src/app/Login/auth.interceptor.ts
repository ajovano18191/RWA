import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, switchMap, take } from "rxjs";
import { selectUser } from "../store/user.selector";

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
    const store = inject(Store);

    return store
    .select(selectUser)
    .pipe(
        take(1),
        map(userDTO => userDTO.accessToken),
        map(accessToken => req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`), })),
        switchMap(authReq => next(authReq)),
    );
}