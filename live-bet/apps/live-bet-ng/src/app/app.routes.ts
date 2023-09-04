import { Route } from '@angular/router';
import { BookmakerComponent } from './Bookmaker/bookmaker.component';
import { SportComponent } from './Guest/sport.component';

export const appRoutes: Route[] = [
    { path: 'bookmaker', component: BookmakerComponent },
    { path: 'guest', component: SportComponent },
];
