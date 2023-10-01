import { Route } from '@angular/router';
import { BookmakerComponent } from './Bookmaker/bookmaker.component';
import { CompleteOfferViewComponent } from './Guest/complete-offer-view.component';
import { GuestComponent } from './Guest/guest.component';
import { bookmakerAuthGuardFn, workerAuthGuardFn } from './Login/auth.guard';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Login/register.component';
import { MatchDetailsComponent } from './MatchDetails/match-details.component';
import { WorkerComponent } from './Worker/worker.component';

export const appRoutes: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'worker', component: WorkerComponent, canActivate: [workerAuthGuardFn], },
    { path: 'bookmaker', component: BookmakerComponent, canActivate: [bookmakerAuthGuardFn], }, //canActivate: [authGuardFn]
    { 
        path: 'guest', 
        component: GuestComponent, 
        children: [
            {
                path: 'live',
                component: CompleteOfferViewComponent,
            },
            {
                path: 'betting',
                component: CompleteOfferViewComponent,
            },
            {
                path: 'match-details',
                component: MatchDetailsComponent,
            },
        ], 
    },
    { path: '', redirectTo: '/guest/betting', pathMatch: 'full', },
];
