import { Route } from '@angular/router';
import { BookmakerComponent } from './Bookmaker/bookmaker.component';
import { CompleteOfferViewComponent } from './Guest/complete-offer-view.component';
import { MatchDetailsComponent } from './MatchDetails/match-details.component';

export const appRoutes: Route[] = [
    { path: 'bookmaker', component: BookmakerComponent },
    { path: 'match-details', component: MatchDetailsComponent },
    { path: 'guest', component: CompleteOfferViewComponent },
];
