import { Route } from '@angular/router';
import { BookmakerComponent } from './Bookmaker/bookmaker.component';
import { CompleteOfferViewComponent } from './Guest/complete-offer-view.component';
import { GuestComponent } from './Guest/guest.component';
import { MatchDetailsComponent } from './MatchDetails/match-details.component';

export const appRoutes: Route[] = [
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
