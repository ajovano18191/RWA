import { Route } from '@angular/router';
import { BookmakerComponent } from './Bookmaker/bookmaker.component';
import { CompleteOfferViewComponent } from './Guest/complete-offer-view.component';
import { GuestComponent } from './Guest/guest.component';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Login/register.component';
import { MatchDetailsComponent } from './MatchDetails/match-details.component';

export const appRoutes: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'bookmaker', component: BookmakerComponent },
    { 
        path: 'guest', 
        component: GuestComponent, 
        children: [
            {
                path: 'match-details',
                component: MatchDetailsComponent
            },
            {
                path: '',
                component: CompleteOfferViewComponent
            },
        ], 
    },
    { path: '', redirectTo: '/guest', pathMatch: 'full', },
];
